const fs = require('fs');

const rs = fs.createReadStream('./js-notes/new.txt', { encoding: 'utf-8' });
const ws = fs.createWriteStream('./js-notes/newWrite.txt');

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })

rs.pipe(ws);