
const mongoose = require('mongoose');

const helpArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [String],
});

const HelpArticle = mongoose.model('HelpArticle', helpArticleSchema);

module.exports = HelpArticle;

