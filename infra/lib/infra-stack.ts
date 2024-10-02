import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { KeyPair } from 'cdk-ec2-key-pair';
import * as cdk from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

     // Create new VPC with 2 Subnets
     const vpc = new ec2.Vpc(this, 'VPC', {
      cidr: '10.0.0.0/16',
      natGateways: 1,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: 'private-subnet-1',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
          cidrMask: 24,
        },
        {
          name: 'public-subnet-1',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        }]
    });


    const keyPairName: string = 'paper-thesis-key'
     // Create a Key Pair to be used with this EC2 Instance
    // Temporarily disabled since `cdk-ec2-key-pair` is not yet CDK v2 compatible
    const key = new KeyPair(this, 'KeyPair', {
      keyPairName: keyPairName,
      description: 'Key Pair created with CDK Deployment',
    });
    key.grantReadOnPublicKey


    const role = new iam.Role(this, 'ec2Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    })

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'))


    // Allow SSH (TCP Port 22) access from anywhere
    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      description: 'Allow SSH (TCP port 22) in',
      allowAllOutbound: true
    });
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH Access')
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(26655), 'cosmos port')
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(26656), 'cosmos port')
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(26657), 'rpc port')
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(9090), 'grpc port')

    // ec2 instance
    const instance = new ec2.Instance(this, 'Instance', {
      instanceName: "paper-thesis-app",
      vpc,
      vpcSubnets: vpc.selectSubnets({ subnetType: ec2.SubnetType.PUBLIC }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.M5, ec2.InstanceSize.LARGE),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      securityGroup: securityGroup,
      keyName: key.keyPairName,
      detailedMonitoring: true,
      role: role,
    });

    
    // Create outputs for connecting
    new cdk.CfnOutput(this, 'IP Address', { value: instance.instancePublicIp });
    new cdk.CfnOutput(this, 'Key Name', { value: key.keyPairName });
    new cdk.CfnOutput(this, 'Download Key Command', { value: `aws secretsmanager get-secret-value --secret-id ec2-ssh-key/${keyPairName}/private --query SecretString --output text > ${keyPairName}.pem && chmod 400 ${keyPairName}.pem` })
    new cdk.CfnOutput(this, 'ssh command', { value: `ssh -i ${keyPairName}.pem -o IdentitiesOnly=yes ec2-user@${instance.instancePublicIp}` })
  }
}
