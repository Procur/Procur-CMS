/**
 * Global adapter config
 *
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports = {

  adapters: {

    'default': 'mongo',

    mongo: {
      module: 'sails-mongo',
      url: process.env.DB_URL || 'mongodb://localhost:27017',
      replSet: {
        servers: [
          {
            host: process.env.DB_REPL_HOST || 'localhost',
            port: process.env.DB_REPL_PORT || 27017
          }
        ]
      }
    }
  }
};
