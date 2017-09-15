const dbConnect = require('../dbConnect');

module.exports = function (modelName){
    return class Model{
        constructor(params){
            this.params = params;
            this.displayName = modelName
        }
        save(){
           return dbConnect()
            .then((dbHandle)=>{
                dbHandle.collection(modelName).insertOne(this.params, (result)=>{console.log('got to collection')});
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    }
}