/**
 * NewsPost
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

     title: {
       type: 'string',
       required: true,
       unique: true
     },
     content: {
       type: 'text',
       required: 'true'
     },
     images: {
       type: 'string',
     },
     published: {
       type: 'boolean',
       required: 'true'
     },
     thumbnail: {
       type: 'json'
     }

  }

};
