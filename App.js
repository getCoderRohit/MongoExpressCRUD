<<<<<<< HEAD
const http = require('http')
const hostname = '127.0.0.1';
const port = '5000'

const server = http.createServer((req, res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    res.end('Hello World, I\'m Batman')
})

const consoleMsg = () => {
    console.log(`Server running at ${hostname}:${port}`);
}

=======
const http = require('http')
const hostname = '127.0.0.1';
const port = '5000'

const server = http.createServer((req, res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    res.end('Hello World, I\'m Batman')
})

const consoleMsg = () => {
    console.log(`Server running at ${hostname}:${port}`);
}

>>>>>>> 7f20b11aa146142a5a051164fff81ee1c43685ab
server.listen(port, hostname, consoleMsg)