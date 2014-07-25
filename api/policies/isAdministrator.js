/**
 * isAdministrator
 *
 * @module      :: Policy
**/
var home = 'http://procur.com';

module.exports = function(req, res, next) {
  User.findOne({ id: req.session.passport.user }, function(err, user){
    if(err){ return res.redirect(home); }
    if(user !== undefined){
      if (user.administrator === true){
        return next();
      }
      else {
        return res.redirect(home);
      }
    }
  });
};
