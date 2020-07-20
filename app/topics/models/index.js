const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  topicName: { type: String, required: true },
  topicImage: { type: String, default: '' }
});

const TopicModel = mongoose.model('Topic', TopicSchema);

module.exports = TopicModel;
