const express = require('express');
const fileUpload = require('express-fileupload');
const hbs = require('hbs');
const app = express();
// default options
app.use(fileUpload());
app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/upload', function(req, res) {
  let archivo;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Sin archivo enviado');
  }

  archivo = req.files.archivo;
  uploadPath = __dirname + '/archivos/' + archivo.name;

  archivo.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
      
    res.send('Archivo Enviado');
  });
});

app.listen(3000);