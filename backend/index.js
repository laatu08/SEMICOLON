const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const {pool}=require("./db.js")

dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())


const PORT=process.env.PORT || 8000
app.listen(PORT,async()=>{
    console.log(`Server is running on PORT ${PORT}`);
})