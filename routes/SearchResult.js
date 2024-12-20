var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const userHelper = require('../control-user/user-helper');
var connectiondb=require('../DataBase/mongoosdb')
const Schema=require("../DataBase/dbShema")
var Imagesplit=require('../getfunctions/sepearateimage')

router.get('/:key', bodyParser.urlencoded({ extended: true }), async (req, res) => {
    console.log(req.params.key)
    var PackDatalist=[]
    const connection= connectiondb()
    collectionName='tempacks';
    collectionName2='collectionofplaces';
    const ForpackData = connection.model.collectionName || connection.model(collectionName,Schema) 
    const ForplaceData = connection.model.collectionName2 || connection.model(collectionName2,Schema) 
    const PackData=await ForpackData.find(  { packplacename: { $regex: new RegExp(req.params.key,"i")}}).exec();
    const PlaceData=await ForplaceData.find(  { locatonpath: { $regex: new RegExp(req.params.key,"i")}}).exec();
  await Imagesplit.CompressText(PlaceData)
    // console.log(PlaceData)
    if(PackData){
    await Imagesplit.MainUpdateSpliteImageloop(PackData)
    // console.log(PackData)
   PackDatalist=PackData
    }
    res.render('SearchResult',{PackDatalist,PlaceData});
  })
module.exports = router;