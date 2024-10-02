// Individually selected transaction information
'use client';
export default function TransactionDetail (
    { params }: {
        params: {
            id: string
        }
    }
) {

    return <h1>Transaction Detail for Transaction {params.id}</h1>;

}