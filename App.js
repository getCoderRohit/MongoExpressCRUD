const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1';
const port = '5000'

let indexHtml = '/index.html'

const server = http.createServer((req, res)=>{
    res.statusCode = 200
    console.log('REQ',req.url)
    if(req.url.toString() == indexHtml){
        fs.readFile('./index.html',(err,html)=>{
            res.write(html)
            res.end()
        })
    }
    else{
        fs.readFile('./server.html',(err,html)=>{
            res.write(html)
            res.end()
        })
    }
})

const consoleMsg = () => {
    console.log(`Server running at ${hostname}:${port}`);
}

server.listen(port, hostname, consoleMsg)