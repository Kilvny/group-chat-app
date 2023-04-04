import express, { application } from 'express'
import dotenv from 'dotenv'
import Messages from './models/Messages.js'
import connectDB from './models/connect.js'
import morgan from 'morgan'
import pusher from 'pusher'
import mongoose from 'mongoose'
import cors from 'cors'

// app config 
const server = express()

// pusher config 
const Pusher = new pusher({
  appId: "1542483",
  key: "9f23045bbbd4eff4bd1f",
  secret: "a0cf5d07dadd2056fad8",
  cluster: "eu",
  useTLS: true
});

Pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

// PORT config & middleware
dotenv.config()
server.use(express.json())
server.use(cors())

// server.use((req,res,next) => { // we're allowing requests to come from anyone, not pretty secure but we want to test with the FE without facing the CORS error... we can add the CORS module as alternative 
//     res.setHeader("Access-Control-Allow-Origin","*")
//     res.setHeader("Access-Control-Allow-Headers","*")
//     next()
// })

// logging
if (process.env.NODE_ENV === 'development') {
    // add the morgan middleware if we're in dev mode
    server.use(morgan('dev'))
}

const PORT = process.env.PORT || 8080

server.listen(PORT,()=>console.log(`running in ${process.env.NODE_ENV} mode on localhost:${PORT}`))

// DB config 
connectDB() 

// mongo stream
const db = mongoose.connection

db.once('open',(stream) => {
    console.log("DB CONNECTED!")
    const msgCollection = db.collection('messages')
    const changeStream = msgCollection.watch()
    changeStream.on("change", (change)=> {
        // console.log(change) // how we know if a chane occured in our db || UPDATE: commented this as everthing is working perfectly! I don't want it to keep logging the change in the console
// pusher setup to trigger the change
        if (change.operationType === 'insert'){
            const msgDetails = change.fullDocument
            Pusher.trigger('messages','inserted',{
                name: msgDetails.name,
                message: msgDetails.message,
                timestamp: msgDetails.timestamp 
            })
        } else {
            console.log('Error triggering pusher');
        }

    })
})
// routes 

server.get('/',(req,res) => res.send('Hello World!')) 
// server.get('/', services.GetAllMessages)


server.post('/api/v1/messages/new', ( req , res ) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        try {
            res.status(201).send(data)
        } catch (error) {
            res.status(500).send(err)
            console.log(error)
        }
    })
})

server.get('/api/v1/messages/sync', ( req , res ) => {
    Messages.find((err, data) => {
        try {
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send(err)
            console.log(error)
        }
    })
})
