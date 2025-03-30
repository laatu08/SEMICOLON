const express= require('express')
const {createUser}=require('../controllers/user.controller.js')
const {createCase}=require("../controllers/case.controller.js")
const { upload } = require("../controllers/fileupload.controller.js")


router=express.Router()

router.post("/user",createUser)
router.post("/case", upload.single("case_file_link"), createCase);

module.exports=router