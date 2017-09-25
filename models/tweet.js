const createModel = require('./createModel');

const tweets = createModel('tweet',{text:String, userId: String, timeStamp:String});

module.exports = {
    createNew: (data)=>{
        return tweets.save(data)
    },
    retrieve: (filters)=>{
        return tweets.retrieve(filters)
    },
    delete: (filters)=>{
        return tweets.delete(filters)
    },
    update: (filter, update)=>{
        console.log(update)
        return tweets.update(filter, update)
    }
}

// module.exports = (data)=> {
//     const tweetModel = createModel('tweet'),
//           newDataObj = Object.assign({}, data)
//           newTweet = new tweetModel(newDataObj);

//     return newTweet.save()
// }

