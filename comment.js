//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentData = require('./commentData.json');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get all comments
app.get('/api/comments', (req, res) => {
  res.json(commentData);
});

//add new comment
app.post('/api/comments', (req, res) => {
  const newComment = {
    id: commentData.length + 1,
    name: req.body.name,
    comment: req.body.comment,
    };
    commentData.push(newComment);
    fs.writeFileSync(path.join(__dirname, 'commentData.json'), JSON.stringify(commentData));
    res.json(commentData);
});
