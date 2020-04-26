const express = require("express")
const MongoDB = require("mongodb")

const app = express()
let fs = require("fs")

const hostname = '127.0.0.1';
const port = '5001'
let getUrl = '/getHeroes'
let postUrl = '/addHeroes'
let getHeroByName = `${getUrl}/:name`

let postData = {
    "Kacchan" : {
        "name" : "Katski Bakugo",
        "Quirk": "Explosion",
        "profession": "Student"
    }
}

app.get(getUrl,(req, res)=>{
    fs.readFile(
        './heroes.json',
        'utf8',
        (err,data)=>{
            // console.log('data in fs',data)
            res.end(data)
        }
    )
})

app.get(getHeroByName,(req, res)=>{
    fs.readFile(
        './heroes.json',
        'utf8',
        (err,data)=>{
            let heroes = JSON.parse(data)
            let hero = heroes[req.params.name]
            // console.log('param',req.params)
            res.end(JSON.stringify(hero))
        }
    )
})

app.post(postUrl,(req, res)=>{
    fs.readFile(
        './heroes.json',
        'utf8',
        (err,data)=>{
            let x = JSON.parse(data)
            x["Kacchan"] = postData["Kacchan"]
            res.end(JSON.stringify(x))
        }
    )
})

app.listen(port,hostname,()=>{
    console.log("Server listening at http://%s:%s", hostname, port)
})