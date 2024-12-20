var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const userHelper = require('../control-user/user-helper');

/* GET home page. */
router.get('/', function(req, res, next) {
const CheckLogin=  req.session.checking_Login
  res.render('LoginPage',{CheckLogin});
  req.session.checking_Login=false
});
router.post('/', bodyParser.urlencoded({ extended: false }),async function(req, res, next) {
  console.log(req.body)
  userHelper.SUPPORT_LOGIN(req.body).then((response)=>{
    if(response.status){
      req.session.UserData=response.data
      req.session.Membership=response.Membershipstatus
      res.redirect("/")
    }else{
      req.session.checking_Login=true
      res.redirect("/login")
      
    }
  })
})

module.exports = router;