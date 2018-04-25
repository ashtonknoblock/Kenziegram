const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'public/uploads' });
const port = 3000;
const app = express();
const uploadsPath = './public/uploads/';
const uploadedFiles = [];



app.set('view engine', 'pug')
// app.set('views', './public/views')
app.use(express.static('./public/'));
app.use(express.static('./public/uploads/'));
app.use(express.json());



app.get('/', (req, res) => {
    fs.readdir(uploadsPath, function (err, items) {
        res.render('index', { images: items }) //aray of images
    });
});

function sortImages(items) {
    if (items.length >= 1) {
        items.sort(function (a, b) {
            return (fs.statSync(uploadsPath + a).mtimeMs - fs.statSync(uploadsPath + b).mtimeMs)
            console.log('sorting worked');
        })
    }
};

app.post('/latest', function (req, res, next) {
    let latestImages = [];
    var responseData;
    fs.readdir(uploadsPath, function (err, items) {
        for (let pic in items) {
            let newPic = items[pic];
            let updatedTime = fs.statSync(uploadsPath + newPic).mtimeMs;
            if (updatedTime > req.body.latest) {
                latestImages.push(newPic)
            }
            sortImages(items);
        }

        responseData = {
            images: latestImages,
            timestamp: fs.statSync(uploadsPath).mtimeMs,
        }
        console.log(responseData);
        res.send(responseData);
    })

});

app.post('/upload', upload.single('file'), function (req, res, next) {
    uploadedFiles.push(req.file.filename);
    res.render('main', { image: req.file.filename });
});

app.listen(port);

