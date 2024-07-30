const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async() => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'js-notes', 'new.txt'), 'utf-8')
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'js-notes', 'newReply.txt'))
        await fsPromises.writeFile(path.join(__dirname, 'js-notes', 'newLatest.txt'), data)
        await fsPromises.appendFile(path.join(__dirname, 'js-notes', 'newLatest.txt'), ' Nice to meet you')
        await fsPromises.rename(path.join(__dirname, 'js-notes', 'newLatest.txt'), path.join(__dirname, 'js-notes', 'promiseWrite.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname, 'js-notes', 'promiseWrite.txt'), 'utf-8')
        console.log(newData);
    } catch (err) {
        console.error(err)
    }

}

fileOps();

// fs.readFile(path.join(__dirname, 'js-notes', 'new.txt'), 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//     // console.log(data.toString());
// })
// console.log('hello');

// fs.writeFile(path.join(__dirname, 'js-notes', 'notes.txt'), 'write to notes.txt file ', (err) => {
//     if (err) throw err;
//     console.log('operation complete');

//     fs.appendFile(path.join(__dirname, 'js-notes', 'notes.txt'), 'appending data to the file', (err) => {
//         if (err) throw err;
//         console.log('Append complete');

//         fs.rename(path.join(__dirname, 'js-notes', 'notes.txt'), path.join(__dirname, 'js-notes', 'newReply.txt'), (err) => {
//             if (err) throw err;
//             console.log('Rename complete');

//         })

//     })


// })


process.on('uncaughtException', err => {
    console.error('There was an uncaught error: ' + err);
    process.exit(1);
})