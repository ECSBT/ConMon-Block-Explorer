const http = require('http')
const { getLastBlockData, getBlockData, getMeasurements } = require('./controllers/influxController')

const server = http.createServer((req, res) => {
     res.setHeader('Access-Control-Allow-Origin', '*')
     
    if(req.url === '/api/block/last' && req.method === 'GET') {
        getLastBlockData(req, res)
    } else if(req.url === '/api/m' && req.method === 'GET') {
        getMeasurements(req, res)
    } else if(req.url.match(/\/api\/block\/([a-z0-9]+)/) && req.method === 'GET') {
        const num = req.url.split('/')[3]
        console.log(num)
        getBlockData(req, res, num)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

const PORT = process.env.PORT || 9001

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))