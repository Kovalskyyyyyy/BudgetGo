const mongoose = require('mongoose');


const IncomeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 50
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    type: {
        type: String,
        default:"income"
    },

}, {timestamps: true})

module.exports = mongoose.model('Income', IncomeSchema)