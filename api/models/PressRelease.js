

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
      type: 'string',
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
    }

  }
};
