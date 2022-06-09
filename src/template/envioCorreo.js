'use strict'
const nodemailer = require('nodemailer');
const path_ = require('path');

require('dotenv').config();
this.enviar_mail = (dato) => {
    console.log('envio correo:',dato);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: dato.envioEmail.emailEnvio,
            pass: dato.envioEmail.password
        }
    });
    let mail_options = {
        from: 'Pabs',
        to: dato.correoEnvioCliente, //'lisandrovillarroell@gmail.com'
        subject: dato.envioEmail.asunto,
        html: `
            <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">${dato.envioEmail.tituloCuerpo}</h1>
                        <p  style="color: #fff; text-align:center">
                            <span style="color: #e84393">${dato.nombreExamen}</span> 
                            ${dato.envioEmail.tituloCuerpoMedio}
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000">${dato.envioEmail.tituloCuerpoPie}</p>
                    </td>
                </tr>
            </table>
     `,
     attachments: [
        { // Use a URL as an attachment
          filename: 'hemograma-'+dato.numFicha+'.pdf',
          path:  path_.join(__dirname,'../../public/pdfs/'+dato.rutEmpresa.slice(0, -2)+'/'+ dato.numFicha+'.pdf')
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