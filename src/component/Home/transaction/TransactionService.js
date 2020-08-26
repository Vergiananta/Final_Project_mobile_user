import axios from 'axios';

const client = axios.create({ baseURL: 'https://de332089ab3c.ngrok.io' })

export async function saveTransaction(trx) {
    const { data } = await client.post('/transaction', trx)
    console.log('DATA SERVICE', data);

    return data;
} 
