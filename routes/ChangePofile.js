var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var connectiondb=require('../DataBase/mongoosdb')
const Schema=require("../DataBase/dbShema")

router.post('/', bodyParser.urlencoded({ extended: false }),async function(req, res, next) {
    // console.log(req.body)
    var frondenddata=req.body
    var userdata=req.session.UserData
    const pickemailname=userdata.email.split("@")
    const connection=await connectiondb()
    collectionName1="emailchecks"
    collectionName2="membership-"+pickemailname[0]
    const checkData= connection.model.collectionName1 || connection.model(collectionName1,Schema)
    const CHECKMainData= connection.model.collectionName2 || connection.model(collectionName2,Schema)
    const Data=await checkData.findOne({email:userdata.email});
    const MainData=await CHECKMainData.findOne({email:userdata.email});
    Data.profiledb=frondenddata.Imgdata
    Data.discription=frondenddata.discription
    Data.full_name=frondenddata.username
    MainData.profiledb=frondenddata.Imgdata
    MainData.discription=frondenddata.discription
    MainData.full_name=frondenddata.username
    Data.save()
    MainData.save()
    // console.log(MainData)
    res.send("okk")
})
module.exports=router