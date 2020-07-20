const tagModel = require('./index');
const errorModel = require(ROOT_DIR + '/lib/error');
const errorObj = new errorModel();
const moment = require("moment-timezone");

class TagsManager {

  constructor() {
    moment.tz.link("Asia/Calcutta|Asia/Kolkata");
  }

  async createTag(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqData = reqObj.body;
        const tagData = new tagModel(reqData);
        const tag = await tagData.save();
        resolve({
          status: "success",
          data: tag
        })
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }
}

module.exports = TagsManager