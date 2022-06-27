const { text } = require('express');
const mongoose = require('mongoose');
const ListSchema = new mongoose.Schema({
    description :{
        type: String,
        required: true
    },
    date:{
        type:Date,
        required : true
    },
    category :{
        type :String,
        required : true
    }
})

const task = mongoose.model('task',ListSchema);
module.exports = task;