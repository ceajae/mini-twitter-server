const http = require('http');
const {URL} = require('url');
const dbConnect = require('./dbConnect');
const tweetMaker = require('./models/tweet');

const app= http.createServer((request, response)=> {
    // do stuffs
    const{ header,url, method } = request;

    let requestedURL = new URL(url, 'http://localhost:3030').pathname;
    
        requestedURL= requestedURL.split('');
        requestedURL.shift();
    
        const parsedURL = requestedURL.join('');
    
        console.log(parsedURL);

    let data =[];

    request.on('data', (chunk)=>{
        //console.log(data);
        data.push(chunk);
    })

    request.on('end', ()=>{
        data = Buffer.concat(data).toString();
        console.log(data);

        switch(parsedURL){
            
            case 'tweets':
            //do something
                if(method==='POST'){
                    //post tweet to database
                }else if(method ==='GET'){
                    //get post from database
                    response.statusCode = '200';
                    response.setHeader('Content-type', 'text/html');
                    // response.write('<div>My new App</div>');
                    // response.write('<a href="#">It has a link</a>');
                    response.write('<head><title>My new App</title></head>')
                    response.end('<body><div>My new Tweets</div><a href="#">It has a link</a></body>')
                }
            break;
            case 'addTweet':
                dbConnect(tweetMaker, {tweet: data})
                .then(()=>{
                    response.statusCode='200';
                    response.setHeader('Content-Type', 'text/plain');
                    response.end('Tweet Added')
                })
                .catch((error)=>{
                    console.log(error);
                })
               
            break;
    
    
            default:
            //do default
            // response.statusCode = '404';
            // response.setHeader('Content-type', 'application/json');
            // response.end(JSON
            response.write('<div>My new App</div>');
            response.write('<a href="#">It has a link</a>');
            response.write('<head><title>Not Found</title></head>')
            response.end('<body><div>My new App</div><a href="#">Back to Home</a></body>')
        
        }
    })

    

    
    
  
})

app.listen(3030, ()=>{
    console.log('Now listening')
    dbConnect()
    });