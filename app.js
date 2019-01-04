var retrievers = require('./retrievers.js');

var express = require('express');
var app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/romanian', function(req, res) {
    retrievers.romanian_post_retriever( function(docs) {
        res.json(docs);
    })
});

app.get('/russian', function(req, res) {
    retrievers.russian_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/polish', function(req, res) {
    retrievers.polish_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/italian', function(req, res) {
    retrievers.italian_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/southslavic', function(req, res) {
    retrievers.southslavic_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/french', function(req, res) {
    retrievers.french_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/easteurope', function(req, res) {
    retrievers.easterneurope_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.listen(3001, function() {
    console.log('Example app listening on port 3001!')
})
