const express = require('express')
// taking express and running it
const app = express()
// package to connect to the database
const MongoClient = require('mongodb').MongoClient
const PORT = 2122
require('dotenv').config()
// connect to the database and ensure it's working

// connect to mongo atlas
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

// a promise that's going to return. unifiedtopology is so that we don't get any errors. 
MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Hey, connected to ${dbName} database`)
// grab the connection to the database and store it in the db variable
        db = client.db(dbName)
    })

    app.set('view engine', 'ejs')
// all of the things the app is going to use to do what it needs to
// any static files in the public folder can be served up 
    app.use(express.static('public'))

//enables me to look at the application and the requests being sent - pull information from the form out of the request

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/', async (req, res)=>{
        const todoItems = await db.collection('todos').find().toArray()
        const itemsLeft = await db.collection('todos').countDocuments(
            {completed: false})
            res.render('index.ejs', {zebra:todoItems, left: itemsLeft})
        
    })

    app.post('/createTodo', (req, res)=>{
/// takes what the user has entered and placed it into an object in the database
        db.collection('todos').insertOne({todo: req.body.todoItem, completed: false})
        .then(result =>{
            console.log('Todo has been added')
            res.redirect('/')
        })
    })

    app.put('/markComplete', (req,res)=>{
        db.collection('todos').updateOne({todo: req.body.rainbowUnicorn}, {
            $set: {
                completed: true
            }
        })
        .then(result =>{
            console.log('Marked complete')
            res.json('Marked complete')
        })
    })

    app.put('/undo', (req,res)=>{
        db.collection('todos').updateOne({todo: req.body.rainbowUnicorn}, {
            $set: {
                completed: false
            }
        })
        .then(result =>{
            console.log('Marked complete')
            res.json('Marked complete')
        })
    })

    app.delete('/deleteTodo', (req, res) =>{
        db.collection('todos').deleteOne({todo: req.body.rainbowUnicorn})
        .then(result =>{
            console.log('deleted todo')
            res.json('deleted it')
        })
        .catch( err => console.log(err))
    })
// start the server
    app.listen(process.env.PORT || PORT, ()=>{
        console.log('The server is now running')
    })