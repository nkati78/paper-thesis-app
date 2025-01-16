#!/bin/bash

yum install golang -y
mazon-linux-extras install postgresql10 vim epel
sudo yum install -y postgresql-server postgresql-devel

# initialize database and create log file for postgres
/usr/bin/postgresql-setup --initdb

# enable postgres on system start
systemctl enable postgresql

# start postgres sql
systemctl start postgresql