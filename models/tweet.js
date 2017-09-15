const createModel = require('./createModel');


module.exports = (data)=> {
    const tweetModel = createModel('tweet'),
          newTweet = new tweetModel(data);

    return newTweet.save()
}

