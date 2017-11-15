const http = require('http');
const {URL} = require('url');
const dbConnect = require('./dbConnect');
const tweets = require('./models/tweet');
const users = require('./models/users');

const express = require('express');
const app = express();
const mongodb = require('mongodb')
//const functions = require('./functions/firebase-functions');


app.use((request, response, next)=>{
    let body=[]
    request.on('data', (chunk)=>{
        body.push(chunk)
    })
    request.on('end',()=>{
       if (request.method == 'POST' || request.method == 'PUT'){
            body = JSON.parse( Buffer.concat(body).toString() )
            request.body = body
       }

       next();    
    })
})


app.route('/tweet')
    .get((req, res) =>{
        console.log(req.query.UserId)
        console.log('mens')
        reqQuery = JSON.parse(req.query.UserId)
        tweets.retrieve(reqQuery)
        .then((result) =>{
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.json(result)
            console.log(result)
        })
    })
    .post((req, res)=>{
        if(req.body.hasOwnProperty('text')){
            tweets.createNew(req.body)
            .then((result)=>{
               res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
               res.json(result.ops[0]);
            }) 
        }else{
            const reqBody ={
                likedBy: req.body.likedBy,
                liked: req.body.liked
             }; 
             tweets.update({"_id": generateObjectID(req.body.postId)}, {$set:reqBody})
             .then((result)=>{
                 res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
                 console.log('result!!!!')
                 res.json(result);
                 console.log(result)         
            })  
       }
      
    })
    .delete((req, res)=>{
        tweets.delete( {} )
        .then((result)=>{
            res.json(result);
        })
    })
    .put((req, res)=>{
       
        tweets.update( {"_id": generateObjectID(req.body._id)}, {$set:{age:"99"}})
        .then((result)=>{
            res.json(result);
        })
    })




app.route('/users')
   .post((req,res) => {
       if(req.body.hasOwnProperty('_id')){
           console.log(req.body)
           const userId = req.body.userId;
           const reqBody ={
                         firstname: req.body.firstname,
                         lastname: req.body.lastname,
                         email: req.body.email,
                         username: req.body.username,
                         password: req.body.password,
                         userId: req.body.userId,
                         photoUrl:req.body.photoUrl
                      };

            users.update({"userId": reqBody.userId}, {$set:reqBody})
            .then((result)=>{
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
                console.log('result!!!!')
                res.json(result);
                console.log(result)
            })
       }else{

        users.createNew(req.body)
        .then((result) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.json(result.ops[0]);
        })
       }
      
    })

       

   .get((req, res) =>{
       console.log('oh my')
       reqQuery = JSON.parse(req.query.UserId)
       users.retrieve(reqQuery)
       .then((result) =>{
           res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
           res.json(result)
           console.log(result)
       })
   })

   .delete((req, res)=>{
    users.delete( {} )
    .then((result)=>{
        res.json(result);
    })
})

   function generateObjectID(id){
       const objectId = mongodb.ObjectID(id)
       return objectId
   }

//    .put((req, res)=>{
//     console.log(req.body)
//     tweets.update({"_id": mongodb.ObjectID("59c42f8fbafc2e32f09c7d21")}, {$set:req.body})
//     .then((result)=>{
//         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
//         res.json(result);
//     })
// })


// app.get('/tweets', (req, res)=>{
//     console.log('save')
//     tweets.retrieve({})
//         .then((result)=>{
//             res.json(result);
//             console.log(result)
//         })
// });
    


// app.post('/addtweet',(req, res)=>{
//     // res.json(req.body);
//     tweets.createNew(req.body)
//        .then((result)=>{
//         res.json(result);
//         console.log(result)
//        })
    
// })

app.listen(3030, ()=>{
    console.log('listening on port 3030');
    // dbConnect();
})




// const app= http.createServer((request, response)=> {
//     // do stuffs
//     const{ header,url, method } = request;

//     let requestedURL = new URL(url, 'http://localhost:3030').pathname;
    
//         requestedURL= requestedURL.split('');
//         requestedURL.shift();
    
//         const parsedURL = requestedURL.join('');
    
//         console.log(parsedURL);

//     let data =[];

//     request.on('data', (chunk)=>{
//         //console.log(data);
//         data.push(chunk);
//     })

//     request.on('end', ()=>{
//         data = JSON.parse( Buffer.concat(data).toString() );
//         console.log(data);

//         switch(parsedURL){
            
//             case 'tweets':
//             //do something
//                 if(method==='POST'){
//                     //post tweet to database
//                 }else if(method ==='GET'){
//                     //get post from database
//                     response.statusCode = '200';
//                     response.setHeader('Content-type', 'text/html');
//                     // response.write('<div>My new App</div>');
//                     // response.write('<a href="#">It has a link</a>');
//                     response.write('<head><title>My new App</title></head>')
//                     response.end('<body><div>My new Tweets</div><a href="#">It has a link</a></body>')
//                 }
//             break;
//             case 'addTweet':
//                  tweetMaker(data)
//                  .then((result)=>{
//                      response.statusCode='200';
//                      response.setHeader('Content-Type', 'text/plain');
//                      response.end('Tweet Added')
//                  })
//                  .catch((error)=>{
//                      console.log(error);
//                  });
//                 // dbConnect(tweetMaker, {tweet: data})
//                 // .then(()=>{
//                 //     response.statusCode='200';
//                 //     response.setHeader('Content-Type', 'text/plain');
//                 //     response.end('Tweet Added')
//                 // })
//                 // .catch((error)=>{
//                 //     console.log(error);
//                 // })
               
//             break;
    
    
//             default:
//             //do default
//             // response.statusCode = '404';
//             // response.setHeader('Content-type', 'application/json');
//             // response.end(JSON
//             response.write('<div>My new App</div>');
//             response.write('<a href="#">It has a link</a>');
//             response.write('<head><title>Not Found</title></head>')
//             response.end('<body><div>My new App</div><a href="#">Back to Home</a></body>')
        
//         }
//     })

    

    
    
  
// })

// app.listen(3030, ()=>{
//     console.log('Now listening')
//     dbConnect()
//     });