import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema(
    {
    message: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    timestamp: {
        type:String,
        required: true
    },
    // createdAt: {
    //     type:Date,
    //     default: Date.now
    // },
    received: {
        type:Boolean,
        required: true
    },
})

export default mongoose.model('Message',MessageSchema)
// module.exports = mongoose.model('Message',MessageSchema)