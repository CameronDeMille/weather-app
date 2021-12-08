import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.openweathermap.org',
    headers: {
        // Timestamp header is added to every request here, but it does not pass Chrome's preflight check. 
        // Timestamp is not listed under the preflight response header 'access-control-allow-headers' so the api request will not work
        // Would work normally if this were a ReactNative application
        // 'Timestamp': new Date().toISOString()
    }
});