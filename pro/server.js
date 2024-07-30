require('dotenv').config();
const { application } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

//connect to mongo db
connectDB();

app.use(logger);
app.use(credentials);
//custom middleware
// app.use((req, res, next) => {
//     logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
//     console.log(`${req.method} ${req.path} `);
//     next();
// });  coming from middleware/logEvents.js so just need to call logger

app.use(cors(corsOptions));

// built in middleware to handle urlencoded DataTransferin other words,form data:
// 'content-type': application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// built in middleware for json
app.use(express.json());


//middleware for cookies
app.use(cookieParser())

//serve static files
// app.use('/', express.static(path.join(__dirname, '/public')));
// app.use('/subdir', express.static(path.join(__dirname, '/public')));


// app.use('/subdir', require('./routes/subdir'));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

//serving statc files

// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to load hello.html');
//     next();
// }, (req, res) => {
//     res.send('hello!!');
// })

//chain routes
// const one = (req, res, next) => {
//     console.log('one');
//     next();
// }

// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }

// const three = (req, res, next) => {
//     console.log('one');
//     res.send('Finished!');
// }
// app.get('/chain(.html)?', [one, two, three]);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));

    }

    if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });

    } else {
        res.type('txt').send("404 Not Found");
    }
});
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });
//app.use most likely to be used for middleware whereas app.get is for routing
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to  Mongo Db');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})