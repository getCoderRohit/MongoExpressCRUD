const express = require("express")
const MongoDB = require("mongodb")
const bodyParser = require("body-parser")

const app = express()
const MongoClient = MongoDB.MongoClient

const hostname = '127.0.0.1';
const port = '5002'

let sendFile = `/listHeroes`

const mongoUrl = 'mongodb://127.0.0.1:27017'

app.use(bodyParser.urlencoded({ extended: true}))
app.set('view engine','ejs')
app.use(express.static('public'))

MongoClient.connect(mongoUrl,{useUnifiedTopology: true})
.then(client => {
    const db = client.db('GothamDB')
    let myCollection = db.collection('batCollection')
    
    //READ DATA
    app.get(sendFile,(req,res) => {
        myCollection.find().toArray()
        .then(data => {
            res.render('index.ejs',{heroData: data,update:false})
        })
    })

    //ADD DATA
    app.post(sendFile,(req,res) => {
        console.log('req post',req.body)
        if(req.body.isUpdate == false){
            myCollection.insertOne(req.body)
            .then(() => res.redirect(sendFile))
            .catch(err => console.log('ERROR post',err))
        }
        else{
            myCollection.updateOne(
                {"name": req.body.isUpdate},
                { $set: {name: req.body.name, alias: req.body.alias} }
            )
            .then(()=>res.redirect(sendFile))
            .catch(err => console.log('ERROR post upd',err))
        }
        
    })

    // DELETE DATA
    app.post(sendFile + '/:index', (req,res)=>{
        console.log('delete record index',req.params)
        myCollection.deleteOne({name: req.params.index})
        .then(()=>res.redirect(sendFile))
        .catch(err => console.log('ERROR post delete',err))
    })

    //UPDATE DATA
    app.get(sendFile + '/:name',(req,res)=>{
        myCollection.find({name: req.params.name}).toArray()
        .then(data=>{ 
            res.render('index.ejs',{heroData: [],update: data[0]})
        })
        .catch(err => console.log('ERROR post delete',err))
    })

})
.catch(err => console.log('Error client',err))

app.listen(port,hostname,()=>{
    console.log("Server Mongo listening at http://%s:%s", hostname, port)
})