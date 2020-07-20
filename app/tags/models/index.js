const mongoose = require('mongoose');

const TagsSchema = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, default: null },
  tagName: { type: String, default: '' }
});

const TagModel = mongoose.model('Tag', TagsSchema);

module.exports = TagModel;
