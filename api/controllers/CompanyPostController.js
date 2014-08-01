

var cloudinary = require('cloudinary');
var url = require('url');


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
    var query = url.parse(req.url, true).query;
    var pageNumber = query['page'];
    companyPost.find().where({ published: true }).where({ awake: true }).exec(function(err, posts){
      if(err) return res.redirect('/');
      if(posts !== undefined){
        numTruePosts = posts.length;
        companyPost.find().where({ published: true }).where({ awake: true }).sort({ createdAt: 'desc' }).paginate({page: pageNumber, limit: 3}).exec(function(err, posts){
          if(err) return res.redirect('https://procur.com');
          res.view({ posts: posts }, { numTruePosts: numTruePosts});
        });
      }
    });
  },

  showOne: function(req, res){
    var id = req.param('id');
    companyPost.findOne({ id: id }, function(err, post){
      if(err) return res.redirect('/companyblog');
      res.view({ post: post });
    });
  },

  newPost: function(req, res){
    res.view();
  },

  createPost: function(req, res){
    var b = req.body;
    var isPublished = boolify(b.published);
    var isPostAwake = status.isAwake(b.date);
    var dateFormatLong = dateFormatter.long(b.date);
    var dateFormatShort = dateFormatter.short(b.date);
    var daysRemaining = daysLeft.run(b.date);
    cloudinary.uploader.upload(req.files.image.path, function(result){
    companyPost.create({ title: b.title, content: b.content, published: isPublished, images: result.url, category: b.category, date: b.date , tagArray: [b.tagSender], generalCategory: 'companypost', awake: isPostAwake, shortDate: dateFormatShort, longDate: dateFormatLong, daysLeft: daysRemaining}, function(err, post){
        if(err){ return res.send(err); }
        if (post !== undefined){
          var finalText = shortenContent.shortenMe(post.content); //SHORTEN CONTENT FOR VIEW
          companyPost.findOne({ title: b.title }, function(err, post){
            if(err) return res.redirect('/');
            companyPost.update(post, { shortContent: finalText }, function(err,post){
              console.log(post);
              if (err){
                req.flash("There was a problem. Try again.");
                res.redirect('/companyPost/new');
              }
              else {
                req.flash("Post successfully created.");
                if ( isPostAwake === false) {
                  res.redirect('/admin/drafts');
                }
                else if (isPublished === false){
                  res.redirect('/admin/drafts');
                }
                else {
                  res.redirect('/companyblog');
                }

              }
            });
          });
        }
      else {
        return res.redirect('/companyblog');
      }
      });
    });
  },

  edit: function(req, res){
    var id = req.param('id');
    companyPost.findOne({ id: id }, function(err, post){
      res.view({ post: post });
    });
  },

  update: function(req, res){
    var query = url.parse(req.url, true).query;
    var id = query['id'];
    var b = req.body;
    var isPublished = boolify(b.published);
    var isPostAwake = status.isAwake(b.date);
    var dateFormatLong = dateFormatter.long(b.date);
    var dateFormatShort = dateFormatter.short(b.date);
    var daysRemaining = daysLeft.run(b.date);
    cloudinary.uploader.upload(req.files.image.path, function(result){
      companyPost.findOne({ id: id }, function(err, post){
        if(err) return res.send(err);
        companyPost.update(post, { title: b.title, content: b.content, published: isPublished, images: result.url, category: b.category, date: b.date, tagArray: [b.tagSender], generalCategory: 'companypost', awake: isPostAwake, shortDate: dateFormatShort, longDate: dateFormatLong, daysLeft: daysRemaining }, function(err, post){
          if(err) { return res.send(err); }
          if(post !== undefined){
            var id = post[0].id;
            req.flash("Post updated.");
            if ( isPostAwake === true && isPublished === true ){
              res.redirect('/companyblog/' + id);
            }
            else {
              res.redirect('/admin/drafts');
            }
          }
        else {
          res.redirect('/companyblog');
        }
      });
    });
  });
  },

  unpublish: function(req, res){
    var id = req.param('id');
    companyPost.findOne({ id: id }, function(err, post){
      if(err) return res.redirect('/companyPost/edit/' + id);
      companyPost.update(post, { published: false }, function(err, post){
        if(err) return res.redirect('/companyPost/edit/' + id);
        req.flash('Post unpublished.');
        res.redirect('/companyblog');
      });
    });
  },

  search: function(req, res){
    var query = url.parse(req.url, true).query;
    var searchWord = query['word'];
    var pageNumber = query['page'];

    //for category searches...
    if ((searchWord.indexOf('Platform') != -1)||(searchWord.indexOf('Company') != -1)|| (searchWord.indexOf('Affiliates') != -1)||(searchWord.indexOf('Philanthropy') != -1)) {
      companyPost.find().where({ category: { contains: searchWord} }).where({ published: true }).where({ awake: true }).exec(function(err, posts1){
        if(err) return res.redirect('/');
        numTruePosts = posts1.length;
        if(numTruePosts === 0) return res.redirect('/companyPost/nosearch');
      });
      return companyPost.find().where({ category: { contains: searchWord} }).where({ published: true }).where({ awake: true }).sort({ createdAt: 'desc' }).paginate({page: pageNumber, limit: 3}).exec(function(err, searchResults){
        if(err) return res.redirect('/');
        if(searchResults) {
          res.view({ posts: searchResults }, { numTruePosts: numTruePosts });
        }
      });
    }

    //for date searches...
    else if (searchWord.indexOf('201') != -1) {
      var numberIndex = searchWord.indexOf('2');
      searchWord = searchWord.substr(0,numberIndex) + ' ' + searchWord.substr(numberIndex,searchWord.length-1);
      companyPost.find().where({ date: { contains: searchWord} }).where({ published: true }).where({ awake: true }).exec(function(err, posts1){
        if(err) return res.redirect('/');
        numTruePosts = posts1.length;
        if(numTruePosts === 0) return res.redirect('/companyPost/nosearch');
      });
      return companyPost.find().where({ date: { contains: searchWord} }).where({ published: true }).where({ awake: true }).sort({ createdAt: 'desc' }).paginate({page: pageNumber, limit: 3}).exec(function(err, searchResults){
        if(err) return res.redirect('/');
        if(searchResults) {
          res.view({ posts: searchResults }, { numTruePosts: numTruePosts });
        }
      });
    }

    //for tag searches...
    else {
    companyPost.find().where({ tagArray: { contains: searchWord} }).where({ published: true }).where({ awake: true }).exec(function(err, posts1){
      if(err) return res.redirect('/');
      numTruePosts = posts1.length;
      if(numTruePosts === 0) return res.redirect('/companyPost/nosearch');
    });
    return companyPost.find().where({ tagArray: { contains: searchWord} }).where({ published: true }).where({ awake: true }).sort({ createdAt: 'desc' }).paginate({page: pageNumber, limit: 3}).exec(function(err, searchResults){
      if(err) return res.redirect('/');
      if(searchResults) {
        res.view({ posts: searchResults }, { numTruePosts: numTruePosts });
      }
    });
    }
  },

  nosearch: function(req,res){
    companyPost.find().where({ published: true }).where({ awake: true }).sort({ createdAt: 'desc' }).limit(3).exec(function(err, posts){
      if(err) return res.redirect('/');
      if(posts !== undefined){
        res.view({ posts: posts })
      }
    });
  },

  topTags: function(req,res){
    companyPost.find().where({ published: true }).where({ awake: true }).exec(function(err, posts){
      if(err) return res.redirect('/');
      if(posts !== undefined){
        var topFiveTags = topTag.topTagHelper(posts);
        res.send({ posts: topFiveTags });
      }
    });
  },

  dateFetch: function(req,res){
    companyPost.find().where({ published: true }).where({ awake: true }).exec(function(err,posts){
      if(err) return res.redirect('/');
      if(posts !== undefined){
        var uniqueDates = dateRake.run(posts);
        uniqueDates = monthInject.run(uniqueDates);
        res.send({ posts: uniqueDates });
      }
    });
  }

};
