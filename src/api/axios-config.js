import axios from 'axios';

const AXIOS = axios.create({
    baseURL: 'https://f1fd-2405-201-e033-609e-e4ea-27e8-86a5-b3cd.ngrok-free.app',
    timeout: 5000, // request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default AXIOS;
