const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'public/uploads' });
const port = 3000;
const app = express();
const uploaded_files = [];
const uploadsPath = './public/uploads';

app.set('view engine', 'pug')
app.use(express.static('public'));
app.listen(port);

app.get('/', (req, res) => {
    res.statusCode = 200;
    fs.readdir(uploadsPath, function (err, items) {
    res.render('index', { images: items })
        });
    });

app.post('/', upload.single('file'), function (req, res, next) {
    // req.file is the `file` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);
    res.redirect("/");
});

