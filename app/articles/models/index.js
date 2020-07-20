const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  topic: { type: mongoose.Schema.Types.ObjectId, default: null },
  title: { type: String, default: '' },
  articleImage: { type: String, default: '' },
  content: { type: String, default: '' },
  isFeatured: { type: Boolean },
  count: { type: Number, default: 0 },
  sequence: { type: Number, default: 1 }
});

const ArticleModel = mongoose.model('Article', ArticleSchema);

module.exports = ArticleModel;
