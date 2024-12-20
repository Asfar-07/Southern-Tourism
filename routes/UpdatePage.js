var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const userHelper = require('../control-user/user-helper');

 // Files will be uploaded to the 'uploads' directory
 const multer = require('multer');

 const filestorage=multer.diskStorage({
     destination:(req,file,callback)=>{
       callback(null,"uploads");
     },
     filename:(req,file,callback)=>{
       const ramdomName=Date.now()+"_"+Math.round(Math.random()*1000)
       callback(null,file.originalname)
     }
   })
   
   
   const upload = multer({ dest: 'uploads/',storage:filestorage});
  // Define your upload route
  router.post('/',upload.array('images',6 ), bodyParser.urlencoded({ extended: false }), async (req, res) => {
      // console.log(req.body);
    //   console.log(req.files); // Check if files are being received
     await userHelper.SUPPORT_UPDATEPAGE({Textdata:req.body,Imagedata:req.files,PackId:req.session.packid,logindata:req.session.UserData}).then((response)=>{
        console.log(response)
        req.session.packid=response.Packid
        res.send('Images uploaded successfully.')
        console.log("okkkkkkkkk")
     })
      
      // res.redirect("/")
  });
module.exports = router;