const mongoose = require('mongoose');
function connectiondb2() {
    const connectionString = 'mongodb://localhost/project2';
    db1=mongoose.createConnection(connectionString, { useNewUrlParser: true, useUnifiedTopology: true},function(err,client){
        if (err) throw err
        console.log('db1 connection ' )
      } );
      return db1
}
module.exports=connectiondb2