module.exports = (dbHandle, args, resolve)=> {
    const newTweet = new Tweet(args.tweet);
    dbHandle.collection('tweets').insert(newTweet, (result)=>{
        resolve(result);
        dbHandle.close();
    })
}

class Tweet{
    constructor(tweet){
       this.text = tweet.text,
       this.userId = tweet.user,
       this.timeStamp = tweet.timeStamp

    }
}