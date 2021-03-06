/**
 * BlogPost
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	title: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'string',
      required: false,
      unique: true
    },
    content: {
      type: 'text',
      required: 'true'
    },
    images: {
      type: 'string'
    },
    published: {
      type: 'boolean',
      required: 'true'
    },
    category: {
      type: 'string'
    },
    awake: {
      type: 'boolean'
    },
    tagArray: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    shortContent: {
      type: 'string'
    },
    generalCategory: {
      type: 'string'
    },
    shortDate: {
      type: 'string'
    },
    longDate: {
      type: 'string'
    },
    daysLeft: {
      type: 'string'
    },
    isoDate: {
      type: 'string'
    }

    /*
    shortContent: function(){
      var wordLimit = 10;
      var textToLimit = this.content;
      var finalText = "";
      var text2 = textToLimit.replace(/\s+/g, ' ');
      var text3 = text2.split(' ');
      var numberOfWords = text3.length;
      var i=0;
      if(numberOfWords > wordLimit) {
        for(i=0; i< wordLimit; i++)
          finalText = finalText+" "+ text3[i]+" ";
          return finalText+"...";
        }
      else return textToLimit;
      }*/

  }

};
