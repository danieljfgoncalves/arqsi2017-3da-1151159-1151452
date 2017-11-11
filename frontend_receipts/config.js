// ./config.js


// App Configurations
module.exports = {

    'secret': 'arqsi2017',
    'token_duration': '1day', // expires in 24 hours
    'medicines_backend': {
        "url": "http://arqsi2017-medicines-backend-api.azurewebsites.net/api",
        "email": "arqsi17@isep.ipp.pt",
        "secret": "Arqsi-2017"
    },
    'mongoURI': { // FIXME: deploy on Azure
        'development': 'mongodb://localhost:27017/arqsi-dev',
        'test': 'mongodb://localhost:27017/arqsi-test'
    },
    'email': {
        'host': 'mail.smtp2go.com',
        'port': 2525,
        'secure': false, // true for 465, false for other ports
        'auth': {
            'user': 'arqsi2017-1151452-1151159', // smtp2go user
            'pass': 'dHhudGMwNm5qbzkw' // smtp2go password
        }
    },
    'sms': {
        'username': 'danielgoncalves',
        'api_key': 'NKNZETIoIuKyFkqU0rSnkXyaBqanMO'
    }
};