const dbConnect = require('../dbConnect');

module.exports = function createModel (modelName, params){
   class Model{

        constructor(_modelName, _params){
            this.params = _params;
            this.displayName = _modelName
        }
        save(data){
           const newDataObj = Object.assign({}, data)
           return new Promise( (resolve, reject)=>{
               dbConnect()
               .then((dbHandle)=>{
                    dbHandle.collection(modelName).insertOne(newDataObj, (err, result)=>{
                        if(err){
                          resolve(err);
                        }else{
                            resolve(result)
                        }
                        console.log(result)
                    })
                })
                .catch((error)=>{
                    reject(error)
                })
            })

        }

        retrieve(filters){
            return new Promise((resolve, reject)=>{
                dbConnect()
                .then( dbHandle=>{
                    dbHandle.collection(modelName)
                    .find(filters, {} )
                    .toArray((err, result)=>{
                        if(err){
                            reject(error)
                        }else{
                            resolve(result)

                        }
                    })
                })
                .catch((error)=>{
                    reject(error)
                })
            })
        }
        update(filter, update){
            console.log('pls update')
            console.log(update)
            console.log(filter)
            return new Promise((resolve, reject)=>{
                dbConnect()
                .then( dbHandle=>{
                    dbHandle.collection(modelName)
                    .updateMany(filter, update ,(err, result)=>{
                        if(err){
                            reject(error)
                        }else{
                            resolve(result)
                        }
                    })
                })
                .catch((error)=>{
                    reject(error)
                })
            })
        }
        delete(filters){
            return new Promise((resolve, reject)=>{
                dbConnect()
                .then( dbHandle=>{
                    dbHandle.collection(modelName)
                    .remove(filters ,(err, result)=>{
                        if(err){
                            reject(error)
                        }else{
                            console.log(filters)
                            resolve(result)
                        }
                    })
                })
                .catch((error)=>{
                    reject(error)
                })
            })
        }
    }
    return new Model(modelName, params);
}
