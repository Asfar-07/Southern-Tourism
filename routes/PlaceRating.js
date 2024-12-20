var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Schema=require("../DataBase/dbShema")
var connectiondb=require('../DataBase/mongoosdb')

/* GET users listing. */
router.post('/', bodyParser.urlencoded({ extended: false }),async function(req, res, next) {
  const connection=await connectiondb()
  console.log(req.body)
  const Updatedetail=req.body
  collectionName="collectionofplaces"
  const AllDataPackage = connection.model.collectionName || connection.model(collectionName,Schema)
  const PlaceData=await AllDataPackage.findOne({placename:Updatedetail.placename});
  PlaceData.totalRating=Updatedetail.totalRating
  PlaceData.totaluserRating=Updatedetail.numUsers
  PlaceData.Ratinguserid +=Updatedetail.useremail+"||"
  console.log(PlaceData)
 PlaceData.save()
})

module.exports = router;
