

var slug = require('slug');
var url = require('url');
var streamingS3 = require('streaming-s3');
var fs = require('fs');

//UTILITY
var boolify = function(obj){
  if(obj == "true"){
    obj = true;
  }
  else {
    obj = false;
  }
  return obj;
};
//END UTILITY

module.exports = {

    index: function(req, res){
      var query = url.parse(req.url, true).query;
      var pageNumber = query['page'];
      PressRelease.find().where({ published: true }).where({ awake: true }).exec(function(err, posts){
        if(err) return res.direct('/');
        if(posts !== undefined){
          numTruePosts = posts.length;
          PressRelease.find().where({ published: true }).where({ awake: true }).sort({ createdAt: 'desc' }).paginate({page: pageNumber, limit: 3}).exec(function(err, posts){
            if(err) return res.redirect('https://procur.com');
            res.view({ posts: posts }, { numTruePosts: numTruePosts});
          });
        }
      });
    },

    showOne: function(req, res){
      var slug = req.param('slug');
      PressRelease.findOne({ slug: slug }, function(err, post){
        if(err) return res.redirect('/pressreleases');
        res.view({ post: post });
      });
    },

    recent: function(req,res){
      PressRelease.find().where({ published: true }).where({ awake: true }).sort({ createdAt: 'desc' }).limit(10).exec(function(err,posts){
        if(err) { res.send("Sorry, Error Loading 10 Recent Posts"); }
        res.send(posts);
      });
    },

    newPost: function(req, res){
      res.view();
    },

    createPost: function(req, res){
      var b = req.body;
      var isPostAwake = status.isAwake(b.date);
      var dateFormatLong = dateFormatter.long(b.date);
      var dateFormatShort = dateFormatter.short(b.date);
      var daysRemaining = daysLeft.run(b.date);
      var filepath = req.files.zip.path;
      var filename = req.files.zip.name;
      var filetype = req.files.zip.headers['content-type'];
      var isPublished = boolify(b.published);
      /////AWS UPLOAD

      var fStream = fs.createReadStream(filepath);
      //key and secret key
      var uploader = new streamingS3(fStream, 'AKIAJJ2Y43ZH662PWFUA', 'IGrhMgy29wD++dB9H9pMzLqOhx5cll45U1qWy+uJ',
        {
          Bucket: 'procur-cms',
          Key: filename,
          ContentType: filetype,
          ACL: 'public-read'
        },  function (err, resp, stats) {
          if (err) return console.log('Upload error: ', err);
            console.log('Upload stats: ', stats);
            console.log('Upload successful: ', resp);
            PressRelease.create({ title: b.title, content: b.content, abstract: b.abstract,  published: isPublished, slug: slug(b.title).toLowerCase(), generalCategory: 'pressrelease', awake: isPostAwake, shortDate: dateFormatShort, longDate: dateFormatLong, daysLeft: daysRemaining, date: b.date, zip: resp.Location, pdf: resp.Location }, function(err,post){
              console.log(post);
              if (err){
                req.flash("There was a problem. Try again.");
                res.redirect("/pressRelease/new");
                }
              else {
                req.flash("Post successfully created.")
                if(isPublished == false) {
                  res.redirect("/admin/drafts");
                }
                else {

                  res.redirect("/pressreleases");
                }
              }
            });
        }
      );
      /////CREATE NEW DB ENTRY


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
      var isPostAwake = status.isAwake(b.date);
      var dateFormatLong = dateFormatter.long(b.date);
      var dateFormatShort = dateFormatter.short(b.date);
      var daysRemaining = daysLeft.run(b.date);
      PressRelease.findOne({ id: id  }, function(err, post){
        if(err) return err;
        PressRelease.update(post, { title: b.title, content: b.content, abstract: b.abstract, published: isPublished, slug: slug(b.title).toLowerCase(), date: b.date, awake: isPostAwake, shortDate: dateFormatShort, longDate: dateFormatLong, daysLeft: daysRemaining /*, timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')*/ }, function(err, post){
          var slug = post[0].slug;
          if(err) return res.redirect('/');
            req.flash("Post updated.");
          if (isPublished === true && isPostAwake === true ){
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
};
