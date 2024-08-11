const { Schema, model, default: mongoose } = require('mongoose')
const Customer = require('./Customer');
const Series = require('./Series');
const Comic = require('./Comic');

const pullListSchema = new Schema ({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    comics: [{
        type: Schema.Types.ObjectId,
        ref: "Comic"
    }],
    series: [{
        type: Schema.Types.ObjectId,
        ref: "Series"
    }],
})

const PullList = mongoose.model('PullList', pullListSchema)
module.exports = PullList;