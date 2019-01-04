var retrievers = require('./retrievers.js');
const fs = require('fs');
var semaphore = 0

test_semaphore = function(semaphore) {
    if (semaphore >= 7) {
        console.log('Finished generating files')
        process.exit(0)
    }
}

retrievers.romanian_post_retriever( function(docs) {
    fs.writeFile('json/romanian.json', JSON.stringify(docs), (err) => {
        if (err) throw err;
        console.log('The file json/romanian.json has been saved');
        semaphore += 1
        test_semaphore(semaphore)
    });

})

retrievers.russian_post_retriever( function(docs) {
    fs.writeFile('json/russian.json', JSON.stringify(docs), (err) => {
        if (err) throw err;
        console.log('The file json/russian.json has been saved');
        semaphore += 1
        test_semaphore(semaphore)
    });

})

retrievers.french_post_retriever( function(docs) {
    fs.writeFile('json/french.json', JSON.stringify(docs), (err) => {
        if (err) throw err;
        console.log('The file json/french.json has been saved');
        semaphore += 1
        test_semaphore(semaphore)
    });
})

retrievers.polish_post_retriever( function(docs) {
    fs.writeFile('json/polish.json', JSON.stringify(docs), (err) => {
        if (err) throw err;
        console.log('The file json/polish.json has been saved');
        semaphore += 1
        test_semaphore(semaphore)
    });
})

retrievers.southslavic_post_retriever( function(docs) {
    fs.writeFile('json/southslavic.json', JSON.stringify(docs), (err) => {
        if (err) throw err;
        console.log('The file json/southslavic.json has been saved');
        semaphore += 1
        test_semaphore(semaphore)
    });
})

retrievers.easterneurope_post_retriever( function(docs) {
    fs.writeFile('json/easterneurope.json', JSON.stringify(docs), (err) => {
        if (err) throw err;
        console.log('The file json/easterneurope.json has been saved');
        semaphore += 1
        test_semaphore(semaphore)
    });
})

retrievers.italian_post_retriever( function(docs) {
    fs.writeFile('json/italian.json', JSON.stringify(docs), (err) => {
        if (err) throw err;
        console.log('The file json/italian.json has been saved');
        semaphore += 1
        test_semaphore(semaphore)
    });
})
