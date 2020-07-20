const userModel = require('./index');
const authManager = require('./../../auth/auth');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const errorModel = require(ROOT_DIR + '/lib/error');
const errorObj = new errorModel();
const bcrypt = require('bcryptjs');
const moment = require("moment-timezone");

class UsersManager {

  constructor() {
    moment.tz.link("Asia/Calcutta|Asia/Kolkata");
  }

  async signup(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqData = reqObj.body;
        const password = await bcrypt.hashSync(reqData.password, 5);
        reqData.password = password;
        const userData = new userModel(reqData);
        const user = await userData.save();
        resolve({
          status: "success",
          userData: user
        })
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async login(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqData = reqObj.body;
        const userData = await userModel.findOne({ email: reqData.email }).orFail(new Error('User not found!'));
        const passwordsMatch = await bcrypt.compareSync(reqData.password, userData.password);
        if (passwordsMatch) {
          const token = await authManager.generateToken({ userId: userData._id, userRole: userData.role }, {});
          resolve({
            status: "success",
            data: userData,
            token: token
          })
        } else {
          const errResp = await errorObj.errorHander(400, new Error('Password is incorrect'));
          reject(errResp)
        }
      } catch (error) {
        const errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }

  async getUser(reqObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const reqParams = reqObj.params
        const userData = await userModel.findOne({
          _id: ObjectId(reqParams.userId)
        }, { password: 0 });
        if (!userData) {
          let errResp = await errorObj.errorHander(400, new Error('User does not exist, please sign-up.'));
          reject(errResp)
        } else
          resolve(userData);

      } catch (error) {
        let errResp = await errorObj.errorHander('', error);
        reject(errResp);
      }
    });
  }
}

module.exports = UsersManager