const mongoose=require('mongoose')
const connection=async(username, password)=>{
    const url=`mongodb+srv://${username}:${password}@cluster0.r3y7hs7.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(url),{useNewUrlParser:true,  useUnifiedTopology: true},
        console.log('database is  connected successfully')
    }catch(error){
        console.log('error while connecting database',error);
    }
};

module.exports=connection;