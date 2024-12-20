var express = require('express');
var router = express.Router();
var connectiondb=require('../DataBase/mongoosdb')
const Schema=require("../DataBase/dbShema")

/* GET users listing. */
router.get('/',async function(req, res, next) {
    const connection=await connectiondb()
    const placedetail=req.session.placedetails
    let UserData=req.session.UserData
    console.log(UserData)
    collectionName="collectionofplaces"
  const AllDataPackage = connection.model.collectionName || connection.model(collectionName,Schema)
  const PlaceData=await AllDataPackage.findOne({placename:placedetail.placename});
  console.log(PlaceData)
  res.render("Viewplace",{PlaceData,UserData})
});
router.post('/', function(req, res, next) {
    console.log(req.body)
    req.session.placedetails=req.body
    res.redirect('/Viewofplace')
});

module.exports = router;