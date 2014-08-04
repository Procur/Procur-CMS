

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      unique: true
    },
    slug: {
      type: 'string',
      required: false,
      unique: true
    },
    abstract: {
      type: 'text',
      required: true,
      unique: false
    },
    content: {
      type: 'text',
      required: 'true'
    },
    published: {
      type: 'boolean',
      required: 'true'
    },
    zip: {
      type: 'string'
    },
    pdf: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    timestamp: {
      type: 'string'
    },
    date: {
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


  }

};
