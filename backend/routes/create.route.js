const express= require('express')
const {createUser}=require('../controllers/user.controller.js')
const {createCase}=require("../controllers/view.controller.js")

router=express.Router()

router.post("/user",createUser)
router.post("/case",createCase)


module.exports=router