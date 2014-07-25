/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
 var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    firstName: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 100
    },
    lastName: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 100
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 100
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 100
    },
    emailVerified: {
      type: 'boolean',
      required: true
    },
    profileComplete: {
      type: 'boolean',
      required: true
    },
    activeMode: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    image: {
      type: 'string',
      unique: true,
      minLength: 1,
      maxLength: 300
    },
    jobTitle: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },

    //UTILITY

    active: {
      type: 'boolean',
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }

}
