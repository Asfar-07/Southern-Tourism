var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const userHelper = require('../control-user/user-helper');
var path = require('path');
const fs = require('fs');

router.get('/', function(req, res, next) {
    const Checkuser_data= req.session.UserData
    console.log(Checkuser_data)
  res.render('GuerdForm',{Checkuser_data});
    });


router.post('/', bodyParser.urlencoded({ extended: false }),async function(req, res, next) {
    console.log(req.body)
   await userHelper.SUPPORT_REGISTER(req.body,req.session.UserData).then((response)=>{
    if(response.status){
        fs.readFile(path.join(__dirname, 'done.html'), 'utf8', (err, data) => {
            if (err) {
              res.status(500).send('Internal Server Error');
              return;
            }
            // Set the response content type to HTML
            res.set('Content-Type', 'text/html');
            // Send the HTML file content as the response
            res.send(data);
          });
        
    }else{
        res.send('Exited');
    }
   })
    
    })
    
    module.exports = router;