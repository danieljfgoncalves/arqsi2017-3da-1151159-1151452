// ./config.js


// App Configurations
module.exports = {

    'secret': 'arqsi2017',
    'database': 'mongodb://127.0.0.1:27017', // FIXME: deploy on Azure
    'token_duration': '86400', // expires in 24 hours

    'medicines_backend': {
        "url":"http://localhost:64298/api",
        "email":"arqsi17@isep.ipp.pt",
        "secret":"Arqsi-2017"
    }
};