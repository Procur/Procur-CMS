/**
 * AdminController
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

module.exports = {


  index: function(req, res){
    res.view();
  },

  drafts: function(req, res){
    var payload = [[],[]]; //Initialize Titty Array: index 0 for drafts, index 1 for posts waiting on date
    companyPost.find({ published: false }, function(err, companyPosts){
      if(err) return res.redirect('/admin/drafts');
      for (i=0; i < companyPosts.length; i++){
        payload[0].push(companyPosts[i]);
      }
      companyPost.find().where({ published: true }).where({ awake: false }).exec(function(err, companyPosts){
        if(err) return res.redirect('/admin/drafts');
        for (i=0; i < companyPosts.length; i++){
          payload[1].push(companyPosts[i]);
        }
        PressRelease.find({ published: false }, function(err, pressReleases){
          if(err) return res.redirect('/admin/drafts');
          for (i=0; i < pressReleases.length; i++){
            payload[0].push(pressReleases[i]);
          }
          PressRelease.find().where({ published: true }).where({ awake: false }).exec(function(err, pressReleases){
            if(err) return res.redirect('/admin/drafts');
            for (i=0; i < pressReleases.length; i++){
              payload[1].push(pressReleases[i]);
            }
            res.view({ payload: payload });
          });
        });
      });
    });


  },

  greetUser: function(req,res){
    console.log("IN GREET USER ACTION.....")
    User.findOne({ id: req.session.user }, function(err, user){
      if(err) return err;
      res.send({ user: user });
    });
  }


};
