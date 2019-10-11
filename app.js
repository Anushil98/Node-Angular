const express= require('express');
const bodyparser= require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();
app.use(bodyparser.json());

mongoose.connect("")
.then(() => {
    console.log('Connected To database');
})
.catch(() => {
    console.log('Connection Failed');
});

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
});

app.post("/api/posts",(req,res,next)=>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save();

    console.log(post);
    res.status(201).json({
        message:'Post added succesfully'
    });
});

app.get('/api/posts',(req,res,next)=> {
    Post.find()
    .then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Post fetched Succesfully',
            posts: documents
        });
    }); 

});

app.delete("/api/posts/:id",(req,res,next)=> {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Post Deleted"});
    });
});

module.exports = app;