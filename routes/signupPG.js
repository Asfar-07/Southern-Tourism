var express = require('express');
const bodyParser = require('body-parser');
const userHelper = require('../control-user/user-helper');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const checkdata=req.session.checking_Signup
  res.render('signupPage',{checkdata});
  req.session.checking_Signup=false
});

router.post('/', bodyParser.urlencoded({ extended: false }),async function(req, res, next) {

userHelper.SUPPORT_SIGNUP(req.body).then((response)=>{
  // console.log(response);

  if(response.status){
    req.session.UserData=response.data
    res.redirect("/")
  }else{
    req.session.checking_Signup=true
    res.redirect("/signup")
    
  }
 })

});

module.exports = router;
