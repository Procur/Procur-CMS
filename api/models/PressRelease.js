

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
    }

  }

};
