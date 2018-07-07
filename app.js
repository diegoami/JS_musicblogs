const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
var _ = require('underscore')


var convert_subtitles = function(subtitles_srt) {
    let subtitles_lines = subtitles_srt.split('\r\n')
    let subtitles_objs = []
    var line_status = 0;
    for (i = 0; i < subtitles_lines.length; i += 4) {
        if (i + 2 < subtitles_lines.length) {
            subtitle_obj = {};
            let time_span = subtitles_lines[i+1];
            let timespans = time_span.split('-->')
            subtitle_obj["px_start"] = timespans[0].trim().substr(6).replace(",","") / 1000;
            subtitle_obj["px_end"] = timespans[1].trim().substr(6).replace(",","") / 1000;

            subtitle_obj["text"] = subtitles_lines[i+2];
            subtitles_objs.push(subtitle_obj);
        }
    }
    return subtitles_objs;
}

var posts_retriever = function(dbName, postsCollectionName, subtitlesCollectionName, add_label_flag) {

    return function(callback) {
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            const postsCollection = db.collection( postsCollectionName );
            const subtitlesCollection = db.collection( subtitlesCollectionName );

            postsCollection.find().sort({title : 1}).toArray(function (posts_err, docs) {
                subtitlesCollection.find().toArray(function (subtitles_err, subtitles) {
                    var all_label_map = new Map()
                    _.each(docs, function (doc) {
                        doc["subtitled"] = false
                        doc["content"] = doc["content"].replace(/\n\s*\n/g, '\n')
                        let rows = doc["content"].split('\n')
                        rows = _.filter(rows, (row) => {
                            return row.length > 0
                        })
                        doc["content"] = rows.join('\n')
                        if (doc["content"].trim().length == 0) {
                            doc["content"] = "No lyrics..."
                        }
                        let labels = doc["labels"]
                        _.each(labels, function (label) {
                            all_label_map.set(label, (all_label_map.get(label) || 0) + 1)
                            if (label != 'subtitled' && label != 'SUBTITLED') {
                                if (add_label_flag) {
                                    let spl_label = label.split('/')
                                    if (spl_label.length > 1) {
                                        doc["title"] = doc["title"] + ' - ' + spl_label[1]
                                    }
                                }
                            } else {
                                doc["subtitled"] = true
                                let arama_info = _.where(subtitles, {"video_url" : doc['videoId']})
                                if (arama_info.length > 0) {
                                    doc["arama_info"] = arama_info[0]
                                    let subtitles_srt = doc["arama_info"]["subtitles"]
                                    let subtitles_objs = convert_subtitles(subtitles_srt)
                                    doc["subtitles_objs"] = subtitles_objs
                                }

                            }
                        })
                    })
                    var labels = []
                    all_label_map.forEach(function (value, key, map) {
                        labels.push([key, value])
                    })
                    labels.sort(function compare(a, b) {
                        return a[0] < b[0];
                    })


                    let result = {"posts": docs, "labels": labels}
                    callback(result);
                });
            });
        });
    }
}




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
