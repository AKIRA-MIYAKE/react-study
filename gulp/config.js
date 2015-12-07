/**
 * config.js - Configuration of gulp tasks
 */

// Development directory
var src  = './src';

// Testing code directory
var test = './test';

// Distributed code directory
var dest = './dist';


module.exports = {

  server: {
    clean: {
      target: [`${dest}/*`, `!${dest}/public`]
    },
    javascripts: {
      src: [`${src}/**/*.js`, `!${src}/public/**/*.js`],
      dest: dest
    },
    views: {
      src: [`${src}/views/**/*`],
      dest: `${dest}/views`
    },
    test: {
      src: [`${test}/**/*.js`, `!${test}/public/**/*.js`]
    }
  },

  public: {
    clean: {
      target: [`${dest}/public`]
    },
    htdocs: {
      src: [`${src}/public/htdocs/**/*.html`],
      dest: `${dest}/public`
    },
    javascripts: {
      src: [`${src}/public/javascripts/bundle.js`,],
      dest: `${dest}/public/javascripts`
    },
    stylesheets: {
      src: [`${src}/public/sass/**/*.{scss,sass}`],
      dest: `${dest}/public/stylesheets`
    },
    images: {
      src: [`${src}/public/images/**/*`],
      dest: `${dest}/public/images`
    },
    fonts: {
      src: [`${src}/public/fonts/**/*`],
      dest: `${dest}/public/fonts`
    },
    test: {
      src: [`${test}/public/**/*.js`]
    }
  },

  _browserify: {
    options: {
      debug: true,
      transform: ["babelify"]
    }
  },

  _watchify: {
    options: {
      cache: {},
      packageCache: {},
      fullPaths: true
    }
  },

  _sass: {
    options: {
      indentedSyntax: true, // Enable .sass syntax!
    }
  },

  _cssnext: {
    options: {
      browsers: 'last 2 versions',
      compress: false,
      sourcemap: true
    }
  },

  _browserSync: {
    options: {
      server: `${dest}/public`
    }
  },

  _mocha: {
    options: {
      reporter: 'nyan'
    }
  }

};
