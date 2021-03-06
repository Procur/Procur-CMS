/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  // By default, your root route (aka home page) points to a view
  // located at `views/home/index.ejs`
  //
  // (This would also work if you had a file at: `/views/home.ejs`)


// PRESS RELEASE & MEDIA

  //external routes

  //'get /pressreleases' : {
  //  controller: "PressReleaseController",
  //  action: "index"
  //},
  'get /': {
    controller: 'BlogPostController',
    action: 'index'
  },

  'get /greetUser': {
    controller: 'AdminController',
    action: 'greetUser'
  },

  //AUTH ROUTES

  'get /login': {
    controller: 'AuthController',
    action: 'login'
  },

  'post /login': {
    controller: 'AuthController',
    action: 'processLogin'
  },

  '/logout': {
    controller: 'AuthController',
    action: 'logout'
  },

  //PRESS RELEASE ROUTES

  'get /pressreleases?:querystring': {
    controller: "PressReleaseController",
    action: "index"
  },

  'get /pressreleases/:slug': {
    controller: "PressReleaseController",
    action: "showOne"
  },

  //internal routes

  'get /pressRelease/new': {
    controller: "PressReleaseController",
    action: "newPost"
  },

  'post /pressRelease/new': {
    controller: "PressReleaseController",
    action: "createPost"
  },

  'get /pressRelease/edit/:slug': {
    controller: "PressReleaseController",
    action: "edit"
  },

  "post /pressRelease/editpost?:querystring": {
    controller: "PressReleaseController",
    action: "update"
  },

  "get /pressRelease/unpublish/:slug": {
    controller: "PressReleaseController",
    action: "unpublish"
  },

  "get /pressRelease/recent": {
    controller: "PressReleaseController",
    action: "recent"
  },

  //////////////// Blog Blog ROUTES

  // SEARCH ROUTES
    'post /Blogsearch?:querystring': {
      controller: 'BlogPostController',
      action: 'search'
    },

    'get /Blogsearch?:querystring': {
      controller: 'BlogPostController',
      action: 'search'
    },

    // external routes
    'get /Blog?:querystring': {
      controller: "BlogPostController",
      action: 'index'
    },

    'get /Blog/:slug': {
      controller: 'BlogPostController',
      action: 'showOne'
    },

    // internal routes
    'get /BlogPost/TopTags': {
      controller: 'BlogPostController',
      action: 'topTags'
    },

    'get /BlogPost/dateFetch': {
      controller: 'BlogPostController',
      action: 'dateFetch'
    },

    'get /BlogPost/nosearch': {
      controller: 'BlogPostController',
      action: 'nosearch'
    },

    'get /BlogPost/new': {
      controller: "BlogPostController",
      action: 'newPost'
    },

    'post /BlogPost/new': {
      controller: "BlogPostController",
      action: 'createPost'
    },

    'get /BlogPost/edit/:slug': {
      controller: "BlogPostController",
      action: 'edit'
    },

    'post /BlogPost/editpost?:querystring': {
      controller: "BlogPostController",
      action: 'update'
    },

    'get /BlogPost/unpublish/:slug': {
      controller: "BlogPostController",
      action: 'unpublish'
    }

//  "get /pressRelease/download/:slug": {
//    controller: "PressReleaseController",
//    action: "download"
//  },

//INDUSTRY NEWS ROUTES
  // external routes
  /*'get /industrynews': {
    controller: "IndustryNewsPostController",
    action: 'index'
  },

  'get /industrynews/:id': {
    controller: "IndustryNewsPostController",
    action: 'showOne'
  },

  // internal routes

  'get /industrynewsPost/new': {
    controller: "IndustryNewsPostController",
    action: 'newPost'
  },

  'post /industrynewsPost/new': {
    controller: "IndustryNewsPostController",
    action: 'createPost'
  },

  'get /industrynewsPost/edit/:id': {
    controller: "IndustryNewsPostController",
    action: 'edit'
  },

  'post /industrynewsPost/editpost': {
    controller: "IndustryNewsPostController",
    action: 'update'
  },

  'get /industrynewsPost/unpublish/:id': {
    controller: "IndustryNewsPostController",
    action: 'unpublish'
  },*/



/*
// NEWS Blog
  // external routes
  'get /newsBlog': {
    controller: 'NewsPostController',
    action: 'index'
  },

  'get /newsBlog/:id': {
    controller: 'NewsPostController',
    action: 'showOne'
  },

  //internal routes
  'get /newsPost/new': {
    controller: 'NewsPostController',
    action: 'newPost'
  },

  'post /newsPost/new': {
    controller: 'NewsPostController',
    action: 'createPost'
  },

  'get /newsPost/edit/:id': {
    controller: 'NewsPostController',
    action: 'edit'
  },

  'post /newsPost/editpost': {
    controller: 'NewsPostController',
    action: 'update'
  },

  'get /newsPost/unpublish/:id': {
    controller: 'NewsPostController',
    action: 'unpublish'
  },

// TRADESHOW LISTING ROUTES
  // external routes
  'get /tradeshows': {
    controller: "TradeShowPostController",
    action: 'index'
  },

  'get /tradeshows/:id': {
    controller: "TradeShowPostController",
    action: 'showOne'
  },

  // internal routes
  'get /tradeshowPost/new': {
    controller: "TradeShowPostController",
    action: 'newPost'
  },

  'post /tradeshowPost/new': {
    controller: "TradeShowPostController",
    action: 'createPost'
  },

  'get /tradeshowPost/edit/:id': {
    controller: "TradeShowPostController",
    action: 'edit'
  },

  'post /tradeshowPost/editpost': {
    controller: "TradeShowPostController",
    action: 'update'
  },

  'get /tradeshowPost/unpublish/:id': {
    controller: "TradeShowPostController",
    action: 'unpublish'
  },

// ADMIN ROUTES

  'get /admin/drafts': {
    controller: 'AdminController',
    action: 'drafts'
  },

  'get /admin/index': {
    controller: 'AdminController',
    action: 'index'
  }

*/



  /*
  // But what if you want your home page to display
  // a signup form located at `views/user/signup.ejs`?
  '/': {
    view: 'user/signup'
  }


  // Let's say you're building an email client, like Gmail
  // You might want your home route to serve an interface using custom logic.
  // In this scenario, you have a custom controller `MessageController`
  // with an `inbox` action.
  '/': 'MessageController.inbox'


  // Alternatively, you can use the more verbose syntax:
  '/': {
    controller: 'MessageController',
    action: 'inbox'
  }


  // If you decided to call your action `index` instead of `inbox`,
  // since the `index` action is the default, you can shortcut even further to:
  '/': 'MessageController'


  // Up until now, we haven't specified a specific HTTP method/verb
  // The routes above will apply to ALL verbs!
  // If you want to set up a route only for one in particular
  // (GET, POST, PUT, DELETE, etc.), just specify the verb before the path.
  // For example, if you have a `UserController` with a `signup` action,
  // and somewhere else, you're serving a signup form looks like:
  //
  //		<form action="/signup">
  //			<input name="username" type="text"/>
  //			<input name="password" type="password"/>
  //			<input type="submit"/>
  //		</form>

  // You would want to define the following route to handle your form:
  'post /signup': 'UserController.signup'


  // What about the ever-popular "vanity URLs" aka URLs?
  // (you might remember doing this with `mod_rewrite` in Apache)
  //
  // This is where you want to set up root-relative dynamic routes like:
  // http://yourwebsite.com/twinkletoez
  //
  // NOTE:
  // You'll still want to allow requests through to the static assets,
  // so we need to set up this route to ignore URLs that have a trailing ".":
  // (e.g. your javascript, CSS, and image files)
  'get /*(^.*)': 'UserController.profile'

  */
};



/**
 * (3) Action blueprints
 * These routes can be disabled by setting (in `config/controllers.js`):
 * `module.exports.controllers.blueprints.actions = false`
 *
 * All of your controllers ' actions are automatically bound to a route.  For example:
 *   + If you have a controller, `FooController`:
 *     + its action `bar` is accessible at `/foo/bar`
 *     + its action `index` is accessible at `/foo/index`, and also `/foo`
 */


/**
 * (4) Shortcut CRUD blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *			`module.exports.controllers.blueprints.shortcuts = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *		/foo/find/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		/foo/create		->	create a lampshade using specified values
 *
 *		/foo/update/:id	->	update the lampshade with id=:id
 *
 *		/foo/destroy/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (5) REST blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *		`module.exports.controllers.blueprints.rest = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *
 *		get /foo/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		post /foo		-> create a lampshade using specified values
 *
 *		put /foo/:id	->	update the lampshade with id=:id
 *
 *		delete /foo/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (6) Static assets
 *
 * Flat files in your `assets` directory- (these are sometimes referred to as 'public')
 * If you have an image file at `/assets/images/foo.jpg`, it will be made available
 * automatically via the route:  `/images/foo.jpg`
 *
 */



/**
 * (7) 404 (not found) handler
 *
 * Finally, if nothing else matched, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 */
