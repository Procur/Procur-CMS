
var humanize = require('humanize');
var slug = require('slug');
var print = console.log.bind(console,'>');
var url = require('url');


//UTILITY
var boolify = function(obj){
  if(obj == "true"){
    obj = true;
  }
  else {
    obj = false;
  };
  return obj;
};
//END UTILITY

module.exports = {

    index: function(req, res){
      var query = url.parse(req.url, true).query;
      var pageNumber = query['page'];


      PressRelease.find({ published: true }).paginate({page: pageNumber, limit: 3}).exec(function(err, posts){
        if(err) return res.redirect('/');
          res.view({posts: posts});
        });
    },

    showOne: function(req, res){
      var slug = req.param('slug');
      console.log(slug);
      PressRelease.findOne({ slug: slug }, function(err, post){
        if(err) return res.redirect('/');
        res.view({ post: post });
      })
    },

    newPost: function(req, res){
      res.view();
    },

    createPost: function(req, res){
      var b = req.body;
      var isPublished = boolify(b.published);
      console.log("in CREATEPOST controller");
      console.log(req.files);
        req.files.upload(function (err, files){
          if (err) return res.serverError(err);
          return res.json({
            message: files.length + 'file(s) uploaded successfully!',
            files: files
          });
        });
        PressRelease.create({ title: b.title, content: b.content, abstract: b.abstract,  published: isPublished, slug: slug(b.title).toLowerCase() }, function(err,post){
          if (err){
            req.flash("There was a problem. Try again.");
            res.redirect("/pressRelease/new");
          }
          else {
            req.flash("Post successfully created.")
            if(isPublished == false){
              res.redirect("/pressRelease/drafts");
            }
            else {
              res.redirect("/pressreleases");
            }
          }
        });
    },

    edit: function(req, res){
      var id = req.param('id');
      PressRelease.findOne({ id: id }, function(err, post){
        res.view({ post: post });
      });
    },

    update: function(req, res){
      var b = req.body;
      var isPublished = boolify(b.published);

      PressRelease.findOne({ title: b.title }, function(err, post){
        if(err) return res.redirect('/');
      PressRelease.update(post, { title: b.title, content: b.content, published: isPublished }, function(err, post){
        var id = post[0].id;
        if(err) return res.redirect('/');
        req.flash("Post updated.");
        if (isPublished == true){
          res.redirect('/pressreleases/' + id);
        }
        else {
          res.redirect('/pressRelease/drafts');
        }
      });
      });
    },

    unpublish: function(req, res){
      var slug = req.param('slug');
      PressRelease.findOne({ slug: slug }, function(err, post){
        if(err) return res.redirect('/pressRelease/edit/' + slug);
        PressRelease.update(post, { published: false}, function(err, post){
          if(err) return res.redirect('/pressRelease/edit/' + slug);
          req.flash('Post unpublished.');
          res.redirect('/pressreleases')
        });
      });
    },

};
