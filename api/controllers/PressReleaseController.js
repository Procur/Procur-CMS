
var humanize = require('humanize');
var slug = require('slug');
var print = console.log.bind(console,'>');
var url = require('url');
var fsx = require('fs-extra');
var MultiPartUpload = require('knox-mpu');
var knox = require('knox');
var UUIDGenerator = require('node-uuid');
var AWS = require('aws-sdk');
var fs = require('fs');
var moment = require('moment');

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

      PressRelease.find({ published: true }).exec(function(err, posts1){
        if(err) return res.direct('/');
        numTruePosts = posts1.length;
      });

      PressRelease.find({ published: true }).paginate({page: pageNumber, limit: 3}).exec(function(err, posts){
        if(err) return res.redirect('/');
          res.view({posts: posts}, { numTruePosts: numTruePosts});
        });
    },

    showOne: function(req, res){
      var slug = req.param('slug');

      PressRelease.findOne({ slug: slug }, function(err, post){
        if(err) return res.redirect('/');
        res.view({ post: post });

      })
    },

    recent: function(req,res){
      PressRelease.find().limit(10).exec(function(err,posts){
        if(err) return res.redirect('/');
        res.send(posts);
      });
    },

    newPost: function(req, res){
      res.view();
    },

    createPost: function(req, res){

      //////////S3 RECEIVER///////////
      /*function newReceiverStream(options) {
        console.log('1');
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
          console.log('2');
          // Create a unique(?) filename
          var fsName = UUIDGenerator.v1();
          log(('Receiver: Received file `' + __newFile.filename + '` from an Upstream.').grey);
          console.log('3');
          var mpu = new MultiPartUpload({
            client: client,
            objectName: fsName,
            stream: __newFile,
            maxUploadSize: options.maxBytes

          }, function(err, body) {
            console.log('4');
            if (err) {
              log(('Receiver: Error writing `' + __newFile.filename + '`:: ' + require('util').inspect(err) + ' :: Cancelling upload and cleaning up already-written bytes...').red);
              receiver__.emit('error', err);
              return;
            }
          console.log('5');
            __newFile.extra = body;
            __newFile.extra.fsName = fsName;
          console.log('6');
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
*/
      ///////FIRE UPLOAD/////
      console.log("here1");
    //  var exampleZip = '/Users/treyschneider/Downloads/jquery-validation-1.12.0.zip';
      var b = req.body;
      var isPublished = boolify(b.published);

    //      req.file('zip').upload( newReceiverStream(exampleZip), function (err, result1) {
    //    if (err) return res.serverError(err);
    //    console.log(result1);
    //      req.file('pdf').upload( newReceiverStream(exampleZip), function (err, result2){
    //        if (err) return res.serverError(err);
    //        console.log(result2);
  PressRelease.create({ title: b.title, content: b.content, abstract: b.abstract,  published: isPublished, slug: slug(b.title).toLowerCase(), category: 'pressrelease', date: b.date /*timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')*//*, zip: result1[0].extra.Location, pdf: result2[0].extra.Location*/ }, function(err,post){
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
              console.log(post);
              });
    //      });
    //    });
    },




    edit: function(req, res){
      var slug = req.param('slug');
      PressRelease.findOne({ slug: slug }, function(err, post){
        res.view({ post: post });
      });
    },

    update: function(req, res){
      var b = req.body;
      var isPublished = boolify(b.published);

      PressRelease.findOne({ title: b.title }, function(err, post){
        if(err) return res.redirect('/');
      PressRelease.update(post, { title: b.title, content: b.content, abstract: b.abstract, slug: slug(b.title).toLowerCase(), published: isPublished, timestamp: moment().format('MMMM Do YYYY, h:mm:ss a') }, function(err, post){
        console.log("HERE");
        console.log(post);
        var slug = post[0].slug;
        if(err) return res.redirect('/');
        req.flash("Post updated.");
        if (isPublished == true){
          res.redirect('/pressreleases/' + slug);
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
    }


//////////FIX S3 DOWNLOAD PERMISSIONS///////
   /* download: function(req,res){
        console.log("DOWNLOADING...")
        var slug = req.param('slug');
        PressRelease.findOne({ slug: slug }, function(err,post){
          if (err) return res.redirect('/');
          res.redirect('https://s3.amazonaws.com/procurPressMedia/6378ddd0-f239-11e3-b4fe-5584631e5daf');
        });
    }*/

};
