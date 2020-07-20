const mongoose = require('mongoose');
const dbjson = require('config');
module.exports.mongo_init = () => {
	try {
		mongoose.set('useFindAndModify', false);
		mongoose.set('useUnifiedTopology', true);
		mongoose.set('useNewUrlParser', true);
		mongoose.set('useCreateIndex', true);
		try {
			return mongoose.connect(dbjson.get("database.mongo"));
		} catch (e) {
			console.log("Error! Connection Failed", e);
		}
	} catch (e) {
		console.log(e);
	}
};
