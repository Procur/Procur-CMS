/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var crypto = require('crypto'),
		bcrypt = require('bcrypt');

module.exports = {

	login: function(req, res){
		res.view();
	},

	processLogin: function(req, res){
		var b = req.body;

		User.findOne({ email: b.email}, function(err, user){
			if(err){ return res.send(err); }
			if(user !== undefined){
				bcrypt.compare(b.password, user.password, function(err, response){
					if(!response){
						req.flash('Invalid password');
						return res.redirect('/login');
					}
					req.session.authenticated = true;
					return res.redirect('/admin/drafts');
				});
			}
			else{
				req.flash('invalid email address');
			}
		});
	},

	logout: function(req, res){
		req.session.authenticated = false;
    req.logout();
		return res.redirect('http://procur.com');
	}

};
