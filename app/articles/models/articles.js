const moment = require("moment-timezone");
const _ = require('underscore');
const articleModel = require('./index');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const errorModel = require(ROOT_DIR + '/lib/error');
const errorObj = new errorModel();
const tagModel = require('./../../tags/models/index');

class ArticlesManager {

  constructor() {
    moment.tz.link("Asia/Calcutta|Asia/Kolkata");
  }

  async createArticle(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqData = reqObj.body;
        if (reqObj.role === 'Admin') {
          const articleData = new articleModel(reqData);
          const article = await articleData.save();
          resolve({
            status: "success",
            data: article
          })
        } else {
          const errResp = await errorObj.errorHander(400, new Error(`Only admin can create articles.`));
          reject(errResp)
        }
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async updateArticle(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqData = reqObj.body;
        if (reqObj.role === 'Admin') {
          const articleData = await articleModel.findOneAndUpdate(
            { _id: reqObj.params.articleId }, reqData, { new: true }
          ).orFail(new Error('Error in updating article.'))
          resolve({
            status: "success",
            data: articleData
          })
        } else {
          const errResp = await errorObj.errorHander(400, new Error(`Only admin can create articles.`));
          reject(errResp)
        }
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async fetchArticleByTopicFeatured(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqParams = reqObj.params;
        const articles = await articleModel.find(
          { topic: ObjectId(reqParams.topicId), isFeatured: true })
          .sort({ sequence: 1 })
          .orFail(new Error('No featured article found for this topic.'));
        resolve({
          status: 'success',
          message: 'Featured articles fetched.',
          data: articles
        });
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async fetchArticleByTopicNonFeatured(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqParams = reqObj.params;
        const articles = await articleModel.find(
          { topic: ObjectId(reqParams.topicId), isFeatured: false })
          .sort({ sequence: 1 })
          .orFail(new Error('No article found for this topic.'));
        resolve({
          status: 'success',
          message: 'Non-Featured articles fetched.',
          data: articles
        });
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async fetchArticleByTags(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqParams = reqObj.params;
        const article = await articleModel.findOne({ _id: reqParams.articleId }).orFail(new Error('No article found.'));
        const tag = await tagModel.find({ article: article._id }).orFail(new Error('No tags found.'));
        const articleIds = _.pluck(tag, 'article');
        const articles = await articleModel.find({ _id: { $in: articleIds } })
          .sort({ sequence: 1 })
          .orFail(new Error('No article found for this tag.'));
        resolve({
          status: 'success',
          message: 'Articles fetched WRT tag.',
          data: articles
        });
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async fetchArticle(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqParams = reqObj.params;
        await articleModel.updateOne({ _id: reqParams.articleId }, { $inc: { count: 1 } });
        const article = await articleModel.findOne({ _id: ObjectId(reqParams.articleId) })
          .orFail(new Error('No article found.'));
        resolve({
          status: 'success',
          data: article
        });
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async articleBinaryRepresentation(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const binaryData = [{}];
        const finalArr = [];
        const index = 0, child1 = 1, child2 = 2;
        const articles = await articleModel.find().orFail(new Error('No artilce found for binary representation.'));
        const roots = await this.arrangeTree(articles, binaryData, index, child1, child2, finalArr);
        resolve({
          status: 'success',
          message: 'Binary representation of articles.',
          data: roots
        })
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    })
  }

  async arrangeTree(articles, binaryData, index, child1, child2, finalArr) {
    return new Promise(async (resolve, reject) => {
      try {
        if (child2 <= articles.length) {
          if (articles[child1] && articles[child2] && !index)
            binaryData = [{ ...articles[index].toObject(), ...{ child: [articles[child1], articles[child2]] } }]
          if (articles[child1] && articles[child2] && index)
            binaryData = [{ ...articles[index].toObject(), ...{ child: [articles[child1], articles[child2]] } }]
          if (articles[child1] && !articles[child2])
            binaryData = [{ ...articles[index].toObject(), ...{ child: [articles[child1]] } }]
          finalArr.push(binaryData[0]);
          if (articles[child1])
            await this.arrangeTree(articles, binaryData, index + 1, child1 + 2, child2 + 2, finalArr);
          resolve(finalArr);
        } else {
          resolve(finalArr);
        }
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }
}

module.exports = ArticlesManager