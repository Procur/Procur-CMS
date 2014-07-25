/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	login: function(req, res){
		res.view();
	},

	processLogin: function(req, res){

	},

	logout: function(req, res){
		req.session.authenticated = false;
    req.logout();
		return res.redirect('http://procur.com');
	}

};
