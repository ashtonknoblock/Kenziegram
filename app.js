const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'public/uploads' });
const port = 3000;
const app = express();
const uploaded_files = [];
const uploadsPath = './public/uploads';

const html = {
    opening: ` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

    
        <title>Kenziegram</title>
    </head>
    <body>
    `,
    
    header: `<h1>Welcome to Kenziegram!</h1>`,

    uploadForm: `<form action="http://localhost:3000/" method="post" enctype="multipart/form-data">
    <fieldset>
        <legend>Choose a Picture:</legend>
        <div>
                <label for="file">File</label>
                <input type="file" id="user_file" name="file" autofocus>
                <input type="submit">
        </div>
    </fieldset>
</form>`,

    images: ``,
    ending: `
    </body>
    </html>`,
};

app.use(express.static('./public'));
app.listen(port);

app.get('/', (req, res) => {
    res.statusCode = 200;
    html.images = "";
    fs.readdir(uploadsPath, function (err, items) {
        for (let imagePath of items) {
            html.images += `<img src="uploads/${ imagePath }">`
        }
        res.send(generateHTML());
    });
});

app.post('/', upload.single('file'), function (req, res, next) {
    // req.file is the `file` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);
    res.redirect("/");
});

const generateHTML = () => html.opening + html.header + html.uploadForm + html.images + html.ending;