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
    var payload = [];
    MarketingPost.find({ published: false }, function(err, marketingPosts){
      if(err) return res.redirect('/admin/drafts');
      for (i=0; i < marketingPosts.length; i++){
        payload.push(marketingPosts[i]);
      }
      console.log(payload.length);
      /*NewsPost.find({ published: false }, function(err, newsPosts){
        if(err) return res.redirect('/admin/drafts');
        for (i=0; i < newsPosts.length; i++){
          payload.push(newsPosts[i]);
        }
        console.log(payload.length);
        //console.log(payload);*/
        PressRelease.find({ published: false }, function(err, pressRelease){
          if(err) return res.redirect('/admin/drafts');
          for (i=0; i < pressRelease.length; i++){
            payload.push(pressRelease[i]);
          }
          console.log(payload.length);
          //console.log(payload);
          res.view({ drafts: payload});
        });
      //});
    });


  }


};
