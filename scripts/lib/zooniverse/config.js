// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty;

  define(function(require, exports, module) {
    var config;
    config = {};
    config.set = function(options) {
      var key, value, _results;
      _results = [];
      for (key in options) {
        if (!__hasProp.call(options, key)) continue;
        value = options[key];
        if (key === 'set') {
          throw new Error('Don\'t overwrite "set" in config.');
        }
        _results.push(config[key] = value);
      }
      return _results;
    };
    config.set({
      dev: +location.port > 1023 || !!~location.hostname.indexOf('.dev'),
      demo: !!~location.hostname.indexOf('demo')
    });
    config.set({
      apiHost: 'https://api.zooniverse.org',
      proxyPath: '/proxy.html'
    });
    if (config.demo) {
      config.set({
        apiHost: "https://dev.zooniverse.org"
      });
    }
    if (config.dev) {
      config.set({
        apiHost: "http://" + location.hostname + ":3000"
      });
    }
    return module.exports = config;
  });

}).call(this);
