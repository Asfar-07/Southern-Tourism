var express = require('express');
var router = express.Router();
var connectiondb=require('../DataBase/mongoosdb')
const Schema=require("../DataBase/dbShema")
var Imagesplit=require('../getfunctions/sepearateimage')

/* GET home page. */
router.get('/',async function(req, res, next) {
    const connection=await connectiondb()
    const useremail=req.session.UserData.email
    var splituseremail=useremail.split("@")
    if(req.session.searchdata){
      collectionName1='emailcheck';
      const Checkmembership = connection.model.collectionName1 || connection.model(collectionName1,Schema)
      const MemberShipData=await Checkmembership.findOne({Idcheck:req.session.searchdata});
     const memberemail= MemberShipData.email.split('@')
      collectionName2="membership-"+memberemail[0]
      const AllDataPackage = connection.model.collectionName2 || connection.model(collectionName2,Schema)
      const PackageData=await AllDataPackage.find({focus:"packages"});
      await Imagesplit.ProfileImage(PackageData)
      var CheckLeader=false
      if(MemberShipData.email==useremail){
        CheckLeader=true
      }else{
        CheckLeader=false
      }
      res.render("MemberProfile",{MemberShipData,PackageData,CheckLeader});
    }
      else{
    collectionName1='emailcheck';
    collectionName2="membership-"+splituseremail[0]
    const Checkmembership = connection.model.collectionName1 || connection.model(collectionName1,Schema)
    const AllDataPackage = connection.model.collectionName2 || connection.model(collectionName2,Schema)
    const MemberShipData=await Checkmembership.findOne({email:useremail});
    const PackageData=await AllDataPackage.find({focus:"packages"});
    await Imagesplit.ProfileImage(PackageData)
    var CheckLeader=false
    if(MemberShipData.email==useremail){
      CheckLeader=true
    }else{
      CheckLeader=false
    }
  // console.log(splitMainimage);
    console.log(MemberShipData)
    console.log(PackageData)
  res.render("MemberProfile",{MemberShipData,PackageData,CheckLeader});
    }
});

module.exports = router;