/**
 * TradeShowListingController
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
//var humanize = require('humanize');
var cloudinary = require('cloudinary');

///////BEGIN UTILITY FUNCTIONS
var boolify = function(obj){
  if(obj == "true"){
    obj = true;
  }
  else {
    obj = false;
  }
  return obj;
};
///////END UTILITY FUNCTIONS


module.exports = {

  index: function(req, res){
    console.log("in the controller");
    TradeShowPost.find({ published: true }, function(err, posts){
      if(err) return res.redirect('/');
      res.view({ posts: posts });
    });
  },

  showOne: function(req, res){
    var id = req.param('id');
    TradeShowPost.findOne({ id: id }, function(err, post){
      if(err) return res.redirect('/');
      res.view({ post: post });
    });
  },

  newPost: function(req, res){
    res.view();
  },

  createPost: function(req, res){
    var b = req.body;
    var isPublished = boolify(b.published);

    cloudinary.uploader.upload(req.files.image.path, function(result){
      console.log(result.url);

    TradeShowPost.create({ title: b.title, content: b.content, date: b.date, location: b.location, website: b.website, published: isPublished, images: result.url }, function(err, post){
      if (err){
        req.flash("There was a problem. Try again.");
        res.redirect('/tradeshowPost/new');
      }
      else {
        req.flash("Post successfully created.");
        if (isPublished === false){
          res.redirect('/tradeshowPost/drafts');
        }
        else {
          res.redirect('/tradeshows');
        }
      }
    });
  },{ width: 150, height: 150 });
  },

  edit: function(req, res){
    var id = req.param('id');
    TradeShowPost.findOne({ id: id }, function(err, post){
      console.log(post);
      res.view({ post: post });
    });
  },

  update: function(req, res){
    var b = req.body;
    var isPublished = boolify(b.published);

    cloudinary.uploader.upload(req.files.image.path, function(result){
      console.log(result.url);

    TradeShowPost.findOne({ title: b.title }, function(err, post){
      if(err) return res.redirect('/');
      TradeShowPost.update(post, { title: b.title, content: b.content, published: isPublished, images: result.url }, function(err, post){
        var id = post[0].id;
        if(err) return res.redirect('/');
        req.flash("Post updated.");
        if (isPublished === true){
          res.redirect('/tradeshows/' + id);
        }
        else {
          res.redirect('/tradeshowPosts/drafts');
        }
      });
    });
  },{ width: 150, height: 150 });
  },

  unpublish: function(req, res){
    var id = req.param('id');
    TradeShowPost.findOne({ id: id }, function(err, post){
      if(err) return res.redirect('/tradeshowPost/edit/' + id);
      TradeShowPost.update(post, { published: false }, function(err, post){
        if(err) return res.redirect('/tradeshowPost/edit/' + id);
        req.flash('Post unpublished.');
        res.redirect('/tradeshows');
      });
    });
  },

  debug: function(req, res){
    console.log('works');
  }

};
