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
//var humanize = require('humanize');
var cloudinary = require('cloudinary');
var url = require('url');
var moment = require('moment');

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
    console.log('index action hit');
    var query = url.parse(req.url, true).query;
    var pageNumber = query['page'];
    MarketingPost.find({ published: true }).exec(function(err, posts1){
      if(err) return res.redirect('/');
      numTruePosts = posts1.length;
    });
    MarketingPost.find({ published: true }).paginate({page: pageNumber, limit: 3}).exec(function(err, posts){
      if(err) return res.redirect('/');

      res.view({ posts: posts }, { numTruePosts: numTruePosts});
      //console.log(numTruePosts);
    });
  },

  showOne: function(req, res){
    var id = req.param('id');
    MarketingPost.findOne({ id: id }, function(err, post){
      if(err) return res.redirect('/');
      res.view({ post: post });
    });
  },
//console.log(JSON.stringify(post,null,' '));
  newPost: function(req, res){
    res.view();
  },

  createPost: function(req, res){
    console.log('hit createPost action');
    var b = req.body;
    var isPublished = boolify(b.published);
    cloudinary.uploader.upload(req.files.image.path, function(result){
    MarketingPost.create({ title: b.title, content: b.content, published: isPublished, images: result.url, category: b.category, date: b.date , tagArray: [b.tagSender]}, function(err, post){
        //---Clean Array---//
        /*if (post){
          var tags = post.tagArray.toString();
          var newTags = tags.split(",");
          post.tagArray = newTags;
          MarketingPost.update( post, { tagArray:post.tagArray });
        }*/
        console.log(post);
        if (err){
          req.flash("There was a problem. Try again.");
          res.redirect('/marketingPost/new');
        }
        else {
          req.flash("Post successfully created.");
          if (isPublished === false){
            res.redirect('/marketingPost/drafts');
          }
          else {

            res.redirect('/marketingblog');
          }

        }
      });
    },{ width: 150, height: 150 });
  },

  edit: function(req, res){
    var id = req.param('id');
    MarketingPost.findOne({ id: id }, function(err, post){
      res.view({ post: post });
    });
  },

  update: function(req, res){
    var b = req.body;
    var isPublished = boolify(b.published);
    var id = req.param('id');
    cloudinary.uploader.upload(req.files.image.path, function(result){
      MarketingPost.findOne({ id: id }, function(err, post){
        if(err) return res.redirect('/');
      MarketingPost.update(post, { title: b.title, content: b.content, published: isPublished, images: result.url, category: b.category, date: b.date, tagArray: [b.tagSender] }, function(err, post){
        var id = post[0].id;
        if(err) return res.redirect('/');
        req.flash("Post updated.");
        if (isPublished == true){
          res.redirect('/marketingblog/' + id);
        }
        else {
          res.redirect('/marketingblog');
        }
      });
    });
  },{ width: 150, height: 150 });
  },

  unpublish: function(req, res){
    var id = req.param('id');
    MarketingPost.findOne({ id: id }, function(err, post){
      if(err) return res.redirect('/marketingPost/edit/' + id);
      MarketingPost.update(post, { published: false }, function(err, post){
        if(err) return res.redirect('/marketingPost/edit/' + id);
        req.flash('Post unpublished.');
        res.redirect('/marketingblog');
      });
    });
  },

  search: function(req, res){
    var query = url.parse(req.url, true).query;
    var searchWord = query['word'];
    var pageNumber = query['page'];
    //for category searches...
    if (searchWord.indexOf('category') != -1) {
      MarketingPost.find().where({ category: { contains: searchWord} }).exec(function(err, posts1){  //.where({ tagArray: { contains: searchWord} })
        if(err) return res.redirect('/');
        numTruePosts = posts1.length;
        if(numTruePosts == 0) return res.redirect('/marketingPost/nosearch');
      });
      return MarketingPost.find().where({ category: { contains: searchWord} }).paginate({page: pageNumber, limit: 3}).exec(function(err, searchResults){
        if(err) return res.redirect('/');
          console.log(searchResults);
        if(searchResults) {
          res.view({ posts: searchResults }, { numTruePosts: numTruePosts });
        }
      });
    }

    MarketingPost.find().where({ tagArray: { contains: searchWord} }).exec(function(err, posts1){  //.where({ tagArray: { contains: searchWord} })
      if(err) return res.redirect('/');
      numTruePosts = posts1.length;
      if(numTruePosts == 0) return res.redirect('/marketingPost/nosearch');
    });

    return MarketingPost.find().where({ tagArray: { contains: searchWord} }).paginate({page: pageNumber, limit: 3}).exec(function(err, searchResults){
      if(err) return res.redirect('/');
        console.log(searchResults);
      if(searchResults) {
        res.view({ posts: searchResults }, { numTruePosts: numTruePosts });
      }
    });
  },

  nosearch: function(req,res){
    res.view();
  }

};
