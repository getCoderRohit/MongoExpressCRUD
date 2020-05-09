const express = require("express")
const MongoDB = require("mongodb")
const bodyParser = require("body-parser")
const os = require("os")

const app = express()
const MongoClient = MongoDB.MongoClient

// const hostname = '127.0.0.1';
const hostname = '0.0.0.0';
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

    app.get('/',(req,res) => {
        res.redirect(sendFile)
    })
    
    //READ DATA
    app.get(sendFile,(req,res) => {
        myCollection.find().toArray()
        .then(data => {
            res.render('index.ejs',{heroData: data,update:false})
        })
    })

    //ADD DATA
    app.post(sendFile,(req,res) => {
        console.log('req post',req.body,typeof req.body.isUpdate)
        if(req.body.isUpdate == 'false'){    
            console.log('in create');
                    
            myCollection.insertOne({name: req.body.name, alias: req.body.alias})
            .then((r) => {console.log('res create',r);;res.redirect(sendFile)})
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
    let ipObject = os.networkInterfaces()
    let ipAddrObject = ipObject[Object.keys(ipObject).find(key => ipObject[key].find(item => item.family == 'IPv4'))]

    console.log("Server Mongo listening at http://%s:%s", ipAddrObject.find(item => item.family == 'IPv4').address, port)
})