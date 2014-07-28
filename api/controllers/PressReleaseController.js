
//var humanize = require('humanize');
var slug = require('slug');
//var print = console.log.bind(console,'>');
var url = require('url');
//var fsx = require('fs-extra');


//var UUIDGenerator = require('node-uuid');
//var AWS = require('aws-sdk');
var fs = require('fs');
//var moment = require('moment');
var Uploader = require('s3-streaming-upload').Uploader,
    upload = null,
    stream = require('fs').createReadStream('/etc/resolv.conf');
//var AWS = require('aws-sdk');

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
      PressRelease.find({ published: true }).sort({ createdAt: 'desc' }).exec(function(err, posts1){
        if(err) return res.direct('/');
        numTruePosts = posts1.length;
      });
      PressRelease.find({ published: true }).sort({ createdAt: 'desc' }).paginate({page: pageNumber, limit: 3}).exec(function(err, posts){
        if(err) return res.redirect('/');
          res.view({posts: posts}, { numTruePosts: numTruePosts});
        });
    },

    showOne: function(req, res){
      var slug = req.param('slug');
      PressRelease.findOne({ slug: slug }, function(err, post){
        if(err) return res.redirect('/');
        res.view({ post: post });
      });
    },

    recent: function(req,res){
      PressRelease.find({ published: true }).sort({ createdAt: 'desc' }).limit(10).exec(function(err,posts){
        if(err) return res.redirect('/');
        res.send(posts);
      });
    },

    newPost: function(req, res){
      res.view();
    },

    createPost: function(req, res){
      var b = req.body;
      var isPublished = boolify(b.published);
      /////AWS UPLOAD
      /*upload = new Uploader({
        accessKey:  'AKIAIPCUDSE5TKUQFEEA',
        secretKey:  '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',
        bucket:     'procurPressMedia',
        objectName: req.files.zip.path,
        stream:     stream,
        objectParams: {
          ACL: 'public-read'
        }
      });
      upload.on('completed', function (err, S3_response) {
        console.log('upload completed');
      upload.on('failed', function (err) {
        console.log('upload failed with error', err);
      });*/
      /////CREATE NEW DB ENTRY
    PressRelease.create({ title: b.title, content: b.content, abstract: b.abstract,  published: isPublished, slug: slug(b.title).toLowerCase(), category: 'pressrelease', date: b.date/*, zip: S3_response.location, pdf: S3_response.location*/ }, function(err,post){
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
      //});
    },

    edit: function(req, res){
      var slug = req.param('slug');
      PressRelease.findOne({ slug: slug }, function(err, post){
        res.view({ post: post });
      });
    },

    update: function(req, res){
      var b = req.body;
      var id = req.param('id');
      var isPublished = boolify(b.published);
      PressRelease.findOne({ id: id  }, function(err, post){
        if(err) return err;
        if(post==undefined) return;
        PressRelease.update(post, { title: b.title, content: b.content, abstract: b.abstract, published: isPublished, slug: slug(b.title).toLowerCase(), category: 'pressrelease', date: b.date /*, timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')*/ }, function(err, post){
          var slug = post[0].slug;
          if(err) return res.redirect('/');
            req.flash("Post updated.");
          if (isPublished == true){
            res.redirect('/pressreleases/' + slug);
          }
          else {
            res.redirect('/admin/drafts');
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
    }
}
