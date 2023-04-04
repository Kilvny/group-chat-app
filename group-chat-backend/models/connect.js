import mongoose from "mongoose"

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        })

        console.log(`MongoDB connected on ${connect.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
} 


// module.exports = connectDB
export default connectDB // because I'm using the type "module" in the setting I should stick to ES6 syntax