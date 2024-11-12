import mongoose from "mongoose";

const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://bikashtechno12:XoUmdUiEUlsa1j0n@cluster0.2kl6c.mongodb.net/food-del').then(()=>{
        console.log("DB connected")
    })
}

export default connectDB;