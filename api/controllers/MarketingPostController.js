/**
 * MarketingPostController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var humanize = require('humanize');

module.exports = {

  index: function(req, res){
    MarketingPost.find({ published: true }, function(err, posts){
      if(err) return res.redirect('/');
      res.view({ posts: posts });
    });
  },

  newPost: function(req, res){
    res.view();
  },

  createPost: function(req, res){
    var b = req.body;
    var isPublished = false;

    if(b.published == "true"){
      isPublished = true;
    };

    MarketingPost.create({ title: b.title, content: b.content, published: isPublished }, function(err, post){
      if (err){
        req.flash("There was a problem. Try again.");
        res.redirect('/marketingPost/new');
      }
      else {
        req.flash("Post successfully created.")
        if (isPublished == false){
          res.redirect('/marketingPost/drafts');
        }
        else {
          res.redirect('/marketingblog');
        }
      }
    });
  },

  edit: function(req, res){
    var title = req.param('title');
    MarketingPost.findOne({ title: title }, function(err, post){
      res.view({ post: post });
    });
  },

  update: function(req, res){

  }

};
