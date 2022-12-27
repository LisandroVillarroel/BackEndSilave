'use strict'
const sgMail= require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



this.enviar_mail = (dato) => {
    console.log('paso correo:',dato)
    const msg = {
        to: "lisandrovillarroell@gmail.com",
        from: "noreply.silave@gmail.com",
        subject: "prueba de correo",
        text: "cuerpo 1",
        html: "<strong>prueba html</strong>",
    };
    console.log('msg:',msg)
sgMail.send(msg).then(result => {
    console.log("Sent email",result);
  }, err => {
    console.error('error correo:',err);
  });
}
module.export = this;