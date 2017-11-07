// test/mock-objects.js
var MedicalReceipt = require('../models/medicalReceipt');

exports.medicalReceipt_1 = new Promise(resolve => {

    MedicalReceipt.create({
        'patient': '5a0170f4bd900e96b89a5d9c', // name : patient1
        'physician': '5a0170e5bd900e96b89a5d9a',
        'prescriptions':
        [
            {
                'expirationDate': '2018-01-30',
                'prescribedPosology': {
                    'quantity': '1000',
                    'technique': 'oral',
                    'interval': '2 n\' 2 hours',
                    'period': '36 hours'
                },
                'presentation': {
                    'form': 'xarope',
                    'concentration': 10,
                    'quantity': 2000
                },
                'drug': 'Abacavir',
                'medicine': 'Brufen',
                'fills': []
            }
        ],
        'creationDate': '2017-11-06T16:24:47.444Z'
    },
        function (err, user) { resolve(); });
})

exports.medicalReceipt_2 = new Promise(resolve => {

    var mr = MedicalReceipt.create({
        'patient': '5a0170f4bd900e96b89a5d9c', // name : patient1
        'physician': '5a0170e5bd900e96b89a5d9a',
        'prescriptions':
        [
            {
                'expirationDate': '2018-03-30',
                'prescribedPosology': {
                    'quantity': '1000',
                    'technique': 'oral',
                    'interval': '2 n\' 2 hours',
                    'period': '36 hours'
                },
                'presentation': {
                    'form': 'xarope',
                    'concentration': 10,
                    'quantity': 2000
                },
                'drug': 'Paracetamol',
                'medicine': 'Ben-u-ron',
                'fills': []
            }
        ],
        'creationDate': '2017-11-06T18:24:47.444Z'
    },
        function (err, user) { resolve(); });
})
