let user = require('../models/users');
let userManager = new user();

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

exports.getUser = async (req, res) => {
  const userData = await userManager.getUser(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(userData);
};