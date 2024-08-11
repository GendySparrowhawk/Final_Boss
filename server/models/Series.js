const { Schema, model, default: mongoose } = require("mongoose");

const Comic = require('./Comic');
const PullList = require('./PullList');

const seriseScema = new Schema({
    name:{
        type: String,
        required: true
    },
    writer: {
        type: String
    },
    comics: [{
        type: Schema.Types.ObjectId,
        ref: "Comic"
    }]
});

const Series = mongoose.model('Series', seriseScema);
module.exports = Series;