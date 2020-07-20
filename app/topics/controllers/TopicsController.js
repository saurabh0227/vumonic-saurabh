const topic = require('../models/topics');
const topicManager = new topic();

exports.createTopic = async (req, res) => {
  const topicData = await topicManager.createTopic(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(topicData);
};

exports.fetchTopics = async (req, res) => {
  const topicData = await topicManager.fetchTopics(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(topicData);
};

exports.fetchTopic = async (req, res) => {
  const topicData = await topicManager.fetchTopic(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(topicData);
};