const express = require('express');
const config = require('config');
const app = express();
const jsonRoute = require('json-routing');
const _ = require('underscore');
const modules = _.where(config.app.modules, { enable: true });

module.exports = () => {
	for (let model of modules) {
		const routeInfo = {
			routesPath: './app/' + model.name + "/routes/",
			controllersPath: './app/' + model.name + "/controllers/",
			policyPath: './app/auth/',
			cors: true
		}
		new jsonRoute.JsonRoute(app, routeInfo).start();
	}
	const domains = {
		'domains': [
			{ 'domain_name': config.get('app.issuer'), 'object': app }
		]
	};
	return domains;
}
