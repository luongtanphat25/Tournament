const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tournamentSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    date: { type: Date, require: true },
    admin: { type: String, require: true },
    isDone: { type: Boolean, require: true },
    isWaiting: { type: Boolean, require: true },
    players: [String],
    groups: [String],
    finals: [String],
    winner: { type: String },
  },
  {
    timestamps: true,
  }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
