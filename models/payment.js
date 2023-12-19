const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    studname: {
        type: String,
        required: false,
        default: undefined
    },
    className: {
        type: String,
        required: false,
        default: undefined
    },
    money: {
        type: Number,
        required: false,
        default: undefined
    },
    balance: {
        type: Number,
        required: false,
        default: undefined
    },

    date: {
        type: Date,
        required: true,
        default: undefined
    },
    time: {
        type: String,
        required: true,
        default: undefined
    },
    accountantName: {
        type: String,
        required: true,
        default: undefined
    },
    number: {
        type: Number,
        required: false,
        default: undefined
    }
});


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;