const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/minitwitter';


module.exports = function dbConnect(dbFunc, args){
    return new Promise((resolve, reject)=>{
        mongo.connect(url, (err, dbHandle)=>{
            if(err){
               reject(err);
               dbHandle.close();
            }else{
               console.log('We have connected oh');
               dbFunc && dbFunc(dbHandle,args)
               .then((result)=>{
                  resolve(result);
               });
        
            }
        })
    })

   
}

