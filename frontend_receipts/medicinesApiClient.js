// ./client.js
var config = require('./config');
var nodeRestClient = require('node-rest-client');
var client = new nodeRestClient.Client();

exports.getPresentation = function(args, presentationId) {

    return new Promise((resolve, reject) => {
        
        var url = config.medicines_backend.url.concat("/Presentations/").concat(presentationId);
        client.get(url, args, (data, response) => {
            resolve(data);
        });
    })
}

exports.getDrug = function(args, drugId) {

    return new Promise((resolve, reject) => {

        var url = config.medicines_backend.url.concat("/Drugs/").concat(drugId);
        client.get(url, args, (data, response) => {
            resolve(data);
        });
    })
}

exports.getPosology = function (args, posologyId) {

    return new Promise((resolve, reject) => {

        var url = config.medicines_backend.url.concat("/Posologies/").concat(posologyId);
        client.get(url, args, (data, response) => {
            resolve(data);
        });
    })
}

exports.getMedicine = function (args, medicineId) {

    return new Promise((resolve, reject) => {

        var url = config.medicines_backend.url.concat("/Medicines/").concat(medicineId);
        client.get(url, args, (data, response) => {
            resolve(data);
        });
    })
}

// exports.getMed = new Promise((resolve, reject) => {

//         var url = config.medicines_backend.url.concat("/Medicines/").concat(1);
//         client.get(url, args, (data, response) => {
//             resolve(data);
//         });
//     })