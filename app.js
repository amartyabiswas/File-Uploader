const express = require('express');
const app = express();
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage
}).single('myImage');

app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', function (req, res) {
   res.render('index');
});

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file === undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        //console.log(req.file);
        res.render('../public/profile', {
          msg: path.extname(req.file.originalname),
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));