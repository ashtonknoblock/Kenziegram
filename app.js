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

    var itemObject = {
        picName: req.file.filename,
        timestamp: Date.now(),
    };

    uploaded_files.push(itemObject);
    res.redirect("/");
});

app.get('/latest', (req, res) => {
    const now = Date.now();
    res.render("main")
}) 

app.post('/latest', (req,res) => {
    res.statusCode = 200;
    for (let i = 0; i > uploaded_files.length; i++) {
        for(itemObject in uploaded_files) {
            console.log(timestamp)
        }
    }
});

