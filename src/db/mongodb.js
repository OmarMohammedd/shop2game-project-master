import mongoose from "mongoose";



export default async function connectTodb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (err) {
        console.log(err.message)
    }
}