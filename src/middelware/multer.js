'use strict'

 const multer = require('multer');
 const path = require("path");
 const fs = require('fs');

function  upload_(){
    try{
        
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                console.log('paso multer')
                //Verifica si Existe el directorio---Ojo también toma en cuenta el nombre archico como directorio
                if (!fs.existsSync('public/pdfs/'+req.params.rutEmpresa.slice(0, -2))){
                    fs.mkdir('public/pdfs/'+req.params.rutEmpresa.slice(0, -2), (error)=>{
                        if (error){
                            console.log('error crear archivo:',error.message);
                            return res.status(401).send({ message: error.message})
                        }
                    })
                }
                cb(null, 'public/pdfs/'+req.params.rutEmpresa.slice(0, -2))
              },           
            filename: function (req, file, cb) {

             //   var extension=file.originalname.slice(file.originalname.lastIndexOf('.'));
               // console.log('extension:', extension);
                cb(null, file.originalname); 
            }
        })
        
        const upload = multer({ storage: storage }).single('file');
        return upload
    }catch(error){
        console.log('error',error);
    }
}
module.exports = upload_