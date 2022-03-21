'use strict'
const nodemailer = require('nodemailer');
const path_ = require('path');

require('dotenv').config();
this.enviar_mail = (datoEmpresa,nombreExamen,numFicha) => {
    console.log('envio correo:',datoEmpresa[0].envioEmail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: datoEmpresa[0].envioEmail.emailEnvio,
            pass: datoEmpresa[0].envioEmail.password
        }
    });
    let mail_options = {
        from: 'Pabs',
        to: 'lisandrovillarroell@gmail.com',
        subject: 'Resultados',
        html: `
            <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">Enviamos resultados</h1>
                        <p  style="color: #fff; text-align:center">
                            <span style="color: #e84393">${nombreExamen}</span> 
                            a la aplicación
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                    </td>
                </tr>
            </table>
     `,
     attachments: [
        { // Use a URL as an attachment
          filename: 'hemograma-'+numFicha+'.pdf',
          path:  path_.join(__dirname,'../../public/pdfs/'+datoEmpresa[0].rutEmpresa.slice(0, -2)+'/'+ numFicha+'.pdf')
      }
    ]
    };
    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envío correctamente ' + info.response);
        }
    });
};
module.export = this;