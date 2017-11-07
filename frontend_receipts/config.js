// ./config.js


// App Configurations
module.exports = {

    'secret': 'arqsi2017',
    'token_duration': '1day', // expires in 24 hours

    'medicines_backend': {
        "url":"http://arqsi2017-medicines-backend-api.azurewebsites.net/api",
        "email":"arqsi17@isep.ipp.pt",
        "secret":"Arqsi-2017"
    },

    'mongoURI': { // FIXME: deploy on Azure
        'development': 'mongodb://localhost:27017',
        'test': 'mongodb://localhost:27017/arqsi-test'
    }
};