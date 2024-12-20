var express = require('express');
var router = express.Router();
var connectiondb=require('../DataBase/mongoosdb')
const Schema=require("../DataBase/dbShema")
/* GET home page. */
router.get('/',async function(req, res, next) {
  const Checkuser_data= req.session.UserData
  var ChackMembership=false;
  const connection=await connectiondb()
  collectionName2='emailchecks';
  const Membership = connection.model.collectionName2 || connection.model(collectionName2,Schema) 
  if(Checkuser_data){
  const Membershipdata=await Membership.findOne({email:Checkuser_data.email});
  if(Membershipdata){
    ChackMembership=true 
}else{
  ChackMembership=false
}
  }
  res.render('front',{Checkuser_data,ChackMembership});
});

module.exports = router;
