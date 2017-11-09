// models/user.js

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using exports
module.exports = mongoose.model('User', new Schema({
                    name: { 
                        type: String, 
                        unique: true, 
                        trim: true,
                        required: 'Name is required' },
                    password: { 
                        type: String,
                        trim: true,
                        required: 'Name is required' },
                    email: {
                        type: String,
                        trim: true,
                        lowercase: true,
                        unique: true,
                        required: 'Email address is required',
                        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
                    }, 
                    roles: [ String ] 
                }));