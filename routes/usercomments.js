var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const userHelper = require('../control-user/user-helper');
var connectiondb=require('../DataBase/mongoosdb')
const Schema=require("../DataBase/dbShema")

router.post('/', async (req, res) => {
    const packdetails=req.session.packdetails
    const useremail="asfarbismi@gmaiil.com"
    const pickemailname=useremail.split("@")
    console.log(req.body)
    const connection=await connectiondb()
  collectionName2="membership-asfarbismis"
  const AllDataPackage = connection.model.collectionName2 || connection.model(collectionName2,Schema)
  const PackageData=await AllDataPackage.findOne({focus:"packages",packid:packdetails.packid});
  PackageData.usercomments +=req.body.valuecomments+"||"
  PackageData.usercommentsemail +=pickemailname[0]+"||"
  console.log(PackageData)
  PackageData.save(function(err,dataofbase) {
    if(err){
    console.log(err)
    }else{
    console.log("save comments"+dataofbase)
    }
})
  
    res.send("okkk")
    })


module.exports = router;