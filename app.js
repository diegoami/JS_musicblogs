var posts_retriever = require('./posts_retriever.js');

romanian_post_retriever = posts_retriever('musicblogs', 'posts.8277328596134486858', 'subtitles.8277328596134486858')
italian_post_retriever = posts_retriever('musicblogs', 'posts.6377950492326759990', 'subtitles.6377950492326759990')
polish_post_retriever = posts_retriever('musicblogs', 'posts.59695003203290655', 'subtitles.59695003203290655')
southslavic_post_retriever = posts_retriever('musicblogs', 'posts.556901760723185848', 'subtitles.556901760723185848')
easterneurope_post_retriever = posts_retriever('musicblogs', 'posts.4061164319975225752', 'subtitles.4061164319975225752')
french_post_retriever = posts_retriever('musicblogs', 'posts.2775451793153626665', 'subtitles.2775451793153626665')
russian_post_retriever = posts_retriever('musicblogs', 'posts.446998987295244185','subtitles.446998987295244185', true)

var express = require('express');
var app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/romanian', function(req, res) {
    romanian_post_retriever( function(docs) {
        res.json(docs);
    })
});

app.get('/russian', function(req, res) {
    russian_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/polish', function(req, res) {
    polish_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/italian', function(req, res) {
    italian_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/southslavic', function(req, res) {
    southslavic_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/french', function(req, res) {
    french_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.get('/easteurope', function(req, res) {
    easterneurope_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.listen(3001, function() {
    console.log('Example app listening on port 3001!')
})
