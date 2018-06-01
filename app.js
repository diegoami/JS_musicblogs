const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
var _ = require('underscore')

var posts_retriever = function(dbName, collectionName) {

    return function(callback) {
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            collection.find().sort({title : 1}).toArray(function (err, docs) {
                var all_label_map = new Map()
                _.each (docs, function(doc) {
                    let labels = doc["labels"]
                    _.each(labels, function(label) {
                        all_label_map.set(label, (all_label_map.get(label) || 0) + 1 )
                    })
                })
                var labels = []
                all_label_map.forEach(function (value, key, map) {
                    labels.push([key, value])
                })
                labels.sort(function compare(a, b) {
                    return a[0] < b[0];
                })

                let result = {"posts" : docs,  "labels" : labels}
                callback(result);
            });
        });
    }
}

romanian_post_retriever = posts_retriever('musicblogs', 'posts.8277328596134486858')
italian_post_retriever = posts_retriever('musicblogs', 'posts.6377950492326759990')
polish_post_retriever = posts_retriever('musicblogs', 'posts.59695003203290655')
southslavic_post_retriever = posts_retriever('musicblogs', 'posts.556901760723185848')
easterneurope_post_retriever = posts_retriever('musicblogs', 'posts.4061164319975225752')
french_post_retriever = posts_retriever('musicblogs', 'posts.2775451793153626665')
russian_post_retriever = posts_retriever('musicblogs', 'posts.446998987295244185')


var express = require('express');
var app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/romanian', function(req, res) {
    romanian_post_retriever( function(docs) {
        res.json(docs)
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
    easteurope_post_retriever( function(docs) {
        res.json(docs)
    })
});

app.listen(3001, function() {
    console.log('Example app listening on port 3001!')
})
