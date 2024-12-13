const axios = require('axios');

this.axios = axios.create({
    baseURL: 'https://jsonplaceholder.example.com',
});

const userId = "od2bxscr5u6hossqmjs7fxouz40lzrmp.lambda-url.us-east-2.on.aws";

this.axios.get(`/${userId}`).then((response) => {
    console.log(`config.baseURL: ${response.config.baseURL}`);
    console.log(`config.method: ${response.config.method}`);
    console.log(`config.url: ${response.config.url}`);
    console.log(`response.responseURL: ${response.request.responseURL}`);
});