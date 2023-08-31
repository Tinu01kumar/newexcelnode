


const express=require('express');
const dotenv=require('dotenv');
const cors=require("cors")
const router=require('./Router/route.js')
const connection=require("./config/db.js")
dotenv.config();
const app=express();
app.use(cors());
app.use('/api',router);
const PORT=9000;
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
connection(username, password);
app.listen(PORT, ()=>console.log(`server is running successfully on port ${PORT}`));