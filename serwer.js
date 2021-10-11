const express = require('express');
const bodyParser= require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0.yxjqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
let db;
let quotesCollection;

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db = client.db('mydb')
    quotesCollection = db.collection('Studenci')
  })
  .catch(console.error)

  app.listen(3000, function() {
    console.log('listening on 3000')
  })
  
 

  app.get('/', (req, res) => {
    
    db.collection('quotes').find().toArray()
      .then(results => {
        console.log(results)
        res.sendFile(__dirname + '/index.html')
      })
      .catch(error => console.error(error))
    // ...
  })

  app.use(bodyParser.urlencoded({ extended: true }))
  
 
  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
        console.log(result)
        
      })
      .catch(error => console.error(error))
  })
