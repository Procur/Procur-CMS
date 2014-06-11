
var humanize = require('humanize');
var slug = require('slug');
var print = console.log.bind(console,'>');
var url = require('url');
var fsx = require('fs-extra');
var MultiPartUpload = require('knox-mpu');
var knox = require('knox');
var UUIDGenerator = require('node-uuid');

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

      //////////S3 RECEIVER///////////
      function newReceiverStream(options) {

        // These credentials can be fetched from options:
        var S3_API_KEY = 'AKIAIPCUDSE5TKUQFEEA';
        var S3_API_SECRET = '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';
        var S3_BUCKET = 'procurPressMedia';

        var log = console.log;

        var Writable = require('stream').Writable;
        var receiver__ = Writable({
          objectMode: true
        });
        var client = knox.createClient({
          key: S3_API_KEY,
          secret: S3_API_SECRET,
          bucket: S3_BUCKET
        });

        receiver__._write = function onFile(__newFile, encoding, next) {

          // Create a unique(?) filename
          var fsName = UUIDGenerator.v1();
          log(('Receiver: Received file `' + __newFile.filename + '` from an Upstream.').grey);

          var mpu = new MultiPartUpload({
            client: client,
            objectName: fsName,
            stream: __newFile,
            maxUploadSize: options.maxBytes
          }, function(err, body) {
            if (err) {
              log(('Receiver: Error writing `' + __newFile.filename + '`:: ' + require('util').inspect(err) + ' :: Cancelling upload and cleaning up already-written bytes...').red);
              receiver__.emit('error', err);
              return;
            }
            __newFile.extra = body;
            __newFile.extra.fsName = fsName;

            log(('Receiver: Finished writing `' + __newFile.filename + '`').grey);
            next();
          });

          mpu.on('progress', function(data) {
            receiver__.emit('progress', {
              name: __newFile.filename,
              written: data.written,
              total: data.total,
              percent: data.percent
            });
          });

        };

        return receiver__;
      };

      ///////FIRE UPLOAD/////
      var exampleZip = '/Users/treyschneider/Downloads/jquery-validation-1.12.0.zip'
      var b = req.body;
      var isPublished = boolify(b.published);

      req.file('zip').upload( newReceiverStream(exampleZip), function (result) {
        PressRelease.create({ title: b.title, content: b.content, abstract: b.abstract,  published: isPublished, slug: slug(b.title).toLowerCase(), zip: b.zip }, function(err,post){
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
