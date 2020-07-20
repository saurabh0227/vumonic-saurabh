let article = require('./../models/articles');
let articleManager = new article();

exports.createArticle = async (req, res) => {
  const articleData = await articleManager.createArticle(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(articleData);
};

exports.updateArticle = async (req, res) => {
  const articleData = await articleManager.updateArticle(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(articleData);
};

exports.fetchArticleByTopicFeatured = async (req, res) => {
  const articleData = await articleManager.fetchArticleByTopicFeatured(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(articleData);
};

exports.fetchArticleByTopicNonFeatured = async (req, res) => {
  const articleData = await articleManager.fetchArticleByTopicNonFeatured(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(articleData);
};

exports.fetchArticle = async (req, res) => {
  const articleData = await articleManager.fetchArticle(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(articleData);
};

exports.fetchArticleByTags = async (req, res) => {
  const articleData = await articleManager.fetchArticleByTags(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(articleData);
};

exports.articleBinaryRepresentation = async (req, res) => {
  const articleData = await articleManager.articleBinaryRepresentation(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(articleData);
};