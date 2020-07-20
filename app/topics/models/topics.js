const titleModel = require('./index');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const errorModel = require(ROOT_DIR + '/lib/error');
const errorObj = new errorModel();
const moment = require("moment-timezone");
const topicModel = require('./index');

class TopicsManager {

  constructor() {
    moment.tz.link("Asia/Calcutta|Asia/Kolkata");
  }

  async createTopic(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqData = reqObj.body;
        if (reqObj.role === 'Admin') {
          const titleData = new titleModel(reqData);
          const title = await titleData.save();
          resolve({
            status: "success",
            data: title
          })
        } else {
          const errResp = await errorObj.errorHander(400, new Error(`Only admin can create titles.`));
          reject(errResp)
        }
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async fetchTopics(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const topics = await topicModel.find({});
        if (topics.length === 0) {
          let errResp = await errorObj.errorHander(400, new Error('No topics found.'));
          reject(errResp)
        } else
          resolve({
            status: 'success',
            data: topics
          });
      } catch (error) {
        let errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async fetchTopic(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqParams = reqObj.params;
        const topic = await topicModel.findOne({ _id: reqParams.topicId }).orFail(new Error('No topic found.'));
        resolve({
          status: 'success',
          data: topic
        });
      } catch (error) {
        let errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }
}

module.exports = TopicsManager