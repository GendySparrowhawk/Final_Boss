const { Schema, model, default: mongoose } = require('mongoose')
const PullList = require('./PullList');
const Series = require('./Series');
const Comic = require('./Comic');

const customerSchema = new Schema ({
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator(val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val)
            },
            message() {
                return 'You must enter a valid email adress'
            }
        }
    },
    phoneNumber: {
        type: String,
        validate: {
            validator(val) {
                return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/g.test(val)
            },
            message() {
                return 'Phone number is incomplete'
            }
        }
    },
    pullList: {
        type: Schema.Types.ObjectId,
        ref: 'PullList'
    }

})

const Customer = model('Customer', customerSchema);
module.exports = Customer;