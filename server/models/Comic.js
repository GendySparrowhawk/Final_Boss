const { Schema, model, default: mongoose } = require("mongoose");

const PullList = require("./PullList");
const Series = require("./Series");

const comicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  issueNumber: {
    type: Number,
    required: true,
  },
  series: {
    type: Schema.Types.ObjectId,
    ref: "Series",
  },
  releaseDate: {
    type: Date,
  },
  coverVariant: {
    type: String,
    default: "A cover",
  },
  isIncentiveCover: {
    type: Boolean,
    default: false,
  },
});

const Comic = mongoose.model("Comic", comicSchema);
module.exports = Comic;
