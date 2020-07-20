const tag = require('../models/tags');
const tagManager = new tag();

exports.createTag = async (req, res) => {
  const tagData = await tagManager.createTag(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(tagData);
};