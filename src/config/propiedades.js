module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.MONGODBURI,
    USU_ENVIA_CLIENTE_FINAL_MAIL: process.env.MAILUSER,
    PSW_ENVIA_CLIENTE_FINAL_MAIL: process.env.MAILPSSWD,
    SECRET_KEY: 'seretokysidetec',
    SECRET_KEYRESET: 'seretokysidetecreset'

}