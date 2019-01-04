var retrievers = require('./retrievers.js');
const fs = require('fs');
var semaphore = 0

test_semaphore = function(semaphore) {
    if (semaphore >= 7) {
        console.log('Finished generating files')
        process.exit(0)
    }
}

var write_function = function(file_name) {
    return function(docs) {
        fs.writeFile(file_name, JSON.stringify(docs), (err) => {
            if (err) throw err;
            console.log('The file '+file_name + ' has been saved');
            semaphore += 1
            test_semaphore(semaphore)
        });
    }
}

retrievers.romanian_post_retriever(
    write_function('json/romanian.json')
)

retrievers.russian_post_retriever(
    write_function('json/russian.json')
)

retrievers.polish_post_retriever(
    write_function('json/polish.json')
)

retrievers.french_post_retriever(
    write_function('json/french.json')
)

retrievers.southslavic_post_retriever(
    write_function('json/southslavic.json')
)

retrievers.easterneurope_post_retriever(
    write_function('json/easteurope.json')
)

retrievers.italian_post_retriever(
    write_function('json/italian.json')
)
