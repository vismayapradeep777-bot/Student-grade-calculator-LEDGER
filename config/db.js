const mongoose=require('mongoose');
async function connectDB(){if(!process.env.MONGO_URI){console.log('MONGO_URI not set: MongoDB features are disabled; JSON APIs remain available.');return false}try{await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:5000});console.log('MongoDB connected');return true}catch(err){console.error('MongoDB connection failed:',err.message);return false}}
module.exports=connectDB;
