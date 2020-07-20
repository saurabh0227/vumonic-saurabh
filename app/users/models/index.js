const mongoose = require('mongoose');
const moment = require('moment');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String, required: true,
    minlength: [4, 'Minimum character allowed is 4'],
    maxlength: [15, 'Maximum character allowed is 15']
  },
  email: { type: String, default: 'demo@mail.com' },
  password: { type: String, minlength: 6 },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    required: [true, 'Role is required'],
    default: 'Admin'
  }
});

UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const UserModel = mongoose.model('User', UserSchema);

UserModel.schema.path('email').validate((value) => {
  let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(value);
}, 'Email must be valid');

module.exports = UserModel;
