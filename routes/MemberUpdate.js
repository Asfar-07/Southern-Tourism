var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const userHelper = require('../control-user/user-helper');
var connectiondb=require('../DataBase/mongoosdb')
const Schema=require("../DataBase/dbShema")
var Imagesplit=require('../getfunctions/sepearateimage')

router.get('/',async function(req, res, next) {
  const packdetails=req.session.packdetails
  var CheckLeader=false
  
  if(req.session.UserData){
    const useremail=req.session.UserData.email
    var splituseremail=useremail.split("@")
  if(packdetails.leaderemail===useremail){
    CheckLeader=true
  }else{
    CheckLeader=false
  }
}
var leaderemailsplit=packdetails.leaderemail.split("@")
  const connection=await connectiondb()
  collectionName2="membership-"+leaderemailsplit[0]
  const AllDataPackage = connection.model.collectionName2 || connection.model(collectionName2,Schema)
  const PackageData=await AllDataPackage.find({focus:"packages",packid:packdetails.packid});
  console.log(PackageData)
  const MainPackData=PackageData[0]
  await Imagesplit.MainUpdateSpliteImage(MainPackData)
  const response1=await Imagesplit.MainUpdateSpliteLocation(MainPackData)
  const response2=await Imagesplit.MainUpdateSplitecomments(MainPackData)
  const locationdata=response1.locationname
  const locationtime=response1.time
  const commentsdata=response2
  console.log(response2)
  console.log(MainPackData)
  console.log(CheckLeader)
  res.render('GuerdUpdate',{MainPackData,CheckLeader,locationdata,locationtime,commentsdata});
    });



router.post('/', function(req, res, next) {
      console.log(req.body)
      req.session.packdetails=req.body
      res.redirect('/MemberUpdate')
  });
module.exports = router;