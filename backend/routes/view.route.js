const express= require('express')
const {getUnresolveCase}=require('../controllers/view.controller')
const {getResolveCase}=require('../controllers/resolveView.controller')


router=express.Router()

router.get("/view",getUnresolveCase)
router.get("/view-resolve",getResolveCase)


module.exports=router