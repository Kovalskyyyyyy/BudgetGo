const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    goal: {
        type: String,
        required: true
    },
    targetAmount: {
        type: Number,
        required: true
    },
    currentSavings: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);