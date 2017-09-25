const createModel = require('./createModel');

const users = createModel('users', {email: String, username:String, password:String});

module.exports = {
    createNew: (data)=>{
        return users.save(data);
    },
    retrieve: (filters)=>{
        return users.retrieve(filters);
    },
    delete: (filters)=>{
        return users.delete(filters)
    },
    update: (filter, update)=>{
       // console.log(update)
        return users.update(filter, update)
    }
}