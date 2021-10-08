import axios from 'axios'

export default class apiService {
    var url = 'http://172.20.0.11:8080';
    getData: () =>
    axios({
        'method':'GET',
        'url': url,
        'headers': {
            'content-type':'application/octet-stream',
            'x-rapidapi-host':'example.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY
        },
        'params': {
            'search':'parameter',
        },
    })
}