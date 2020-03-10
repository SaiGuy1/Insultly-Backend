const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  time: {
    type: Number
  },
  location: {
    type: String
  }
})

module.exports = mongoose.model('Todo', Todo);
