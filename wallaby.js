var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel');

module.exports = function (wallaby) {

  var babelCompiler = wallaby.compilers.babel({babel, plugins: ['rewire']});

  var webpackPostprocessor = wallabyWebpack({
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
      ]
    }
  });


  return {
    files: [
      {pattern: 'node_modules/react-tools/src/test/phantomjs-shims.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'src/**/*.js*', load: false},
      {pattern: 'src/**/*.less', load: false},
      {pattern: 'src/**/__tests__/*.js', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/__tests__/*.js', load: false}
    ],

    compilers: {
      '**/*.js*': babelCompiler
    },

    postprocessor: webpackPostprocessor,

    testFramework: "mocha@2.0.1",

    bootstrap: function () {
      if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
          enumerable: false,
          configurable: true,
          writable: true,
          value: function(target) {
            'use strict';
            if (target === undefined || target === null) {
              throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
              var nextSource = arguments[i];
              if (nextSource === undefined || nextSource === null) {
                continue;
              }
              nextSource = Object(nextSource);

              var keysArray = Object.keys(Object(nextSource));
              for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined && desc.enumerable) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
            return to;
          }
        });
      }
      window.BASE_URL = "";
      window.API_SESSION_KEY = "123456";
      window.HEADOFFICE_ID = 1;
      window.expect = chai.expect;
      window.__moduleBundler.loadTests();
    }
  };
};
