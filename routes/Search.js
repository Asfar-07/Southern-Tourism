var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const userHelper = require('../control-user/user-helper');
var connectiondb=require('../DataBase/mongoosdb')
const Schema=require("../DataBase/dbShema")
router.get('/', async (req, res) => {
    const searchTerm = req.query.q;
    console.log(searchTerm)
    if(searchTerm.length!=0){
    const connection= connectiondb()
            collectionName='collectionofplaces';
            const SearchData = connection.model.collectionName || connection.model(collectionName,Schema)  
            const data=await SearchData.find(  { locatonpath: { $regex: new RegExp(searchTerm,"i")}}).exec();
            console.log(data)
            res.send(data)
    }
    
   })
   module.exports = router;