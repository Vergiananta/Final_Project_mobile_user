import axios from 'axios';

const client = axios.create({ baseURL: 'https://de332089ab3c.ngrok.io' })

export async function getAllUnit() {
    const { data } = await client.get('/unit/list');
    return data;
}


export async function getAllType() {
    const { data } = await client.get('/type/list');
    return data;
}

export async function getAllDesign() {
    const { data } = await client.get('/design/list');
    return data;
}

export async function getAllRoom() {
    const { data } = await client.get('/room/list');
    console.log('DATA ROOM', data);

    return data;
}