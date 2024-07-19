const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});

const person = mongoose.model("person", personSchema);

module.exports = person;
