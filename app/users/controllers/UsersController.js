const user = require('../models/users');
const userManager = new user();

exports.login = async (req, res) => {
  const userData = await userManager.login(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  if (typeof (userData) !== 'undefined') {
    res.set({ 'Access-Token': userData.token });
    res.json(userData);
  }
};

exports.signup = async (req, res) => {
  const userData = await userManager.signup(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  if (typeof (userData) !== 'undefined') {
    res.set({ 'Access-Token': userData.token });
    res.json(userData);
  }
};
