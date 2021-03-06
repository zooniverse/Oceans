// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require, exports, module) {
    var $, Analytics, User, config;
    $ = require('jQuery');
    config = require('zooniverse/config');
    User = require('zooniverse/models/User');
    Analytics = (function() {

      function Analytics() {
        this.visit = __bind(this.visit, this);
        this.initialize();
        this.listen();
      }

      Analytics.prototype.listen = function() {
        return $(window).on('hashchange', this.visit);
      };

      Analytics.prototype.initialize = function() {
        this.image = new Image;
        this.now = new Date;
        this.daysInMonth = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0).getDate();
        this.i = this.minute = 60;
        this.h = this.hour = 60 * this.minute;
        this.d = this.day = 24 * this.hour;
        this.m = this.month = this.daysInMonth * this.day;
        this.y = this.year = 365 * this.day;
        this.u = this.decade = 10 * this.year;
        return this.times = ['u', 'y', 'm', 'd', 'h', 'i'];
      };

      Analytics.prototype.visit = function() {
        if (~location.hash.indexOf('...')) {
          return;
        }
        if (User.current != null) {
          this.setUrl("&user_id=" + User.current.id);
        } else {
          this.setUrl();
        }
        return this.setTimes();
      };

      Analytics.prototype.setUrl = function(extras) {
        if (extras == null) {
          extras = '';
        }
        return this.image.src = "" + (this.url()) + extras;
      };

      Analytics.prototype.url = function() {
        return "" + config.apiHost + "/analytics/visit?" + (this.params());
      };

      Analytics.prototype.zoo = function(key) {
        return "zooniverse_" + key;
      };

      Analytics.prototype.test = function(key) {
        if (this.get(key)) {
          return 0;
        } else {
          return 1;
        }
      };

      Analytics.prototype.setTimes = function() {
        var time, _i, _len, _ref, _results;
        _ref = this.times;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          time = _ref[_i];
          _results.push(this.orSet(time));
        }
        return _results;
      };

      Analytics.prototype.orSet = function(key) {
        if (!this.get(key)) {
          return this.set(key, this[key]);
        }
      };

      Analytics.prototype.serialize = function(obj) {
        var key, val;
        return ((function() {
          var _results;
          _results = [];
          for (key in obj) {
            val = obj[key];
            _results.push("" + key + "=" + (encodeURIComponent(val)));
          }
          return _results;
        })()).join('&');
      };

      Analytics.prototype.params = function() {
        return this.serialize({
          project_id: config.app.projects[0].id,
          path: document.location.pathname,
          hash: document.location.hash,
          'u[u]': this.test('u'),
          'u[y]': this.test('y'),
          'u[m]': this.test('m'),
          'u[d]': this.test('d'),
          'u[h]': this.test('h'),
          'u[i]': this.test('i')
        });
      };

      Analytics.prototype.get = function(key) {
        var name, position, string, strings, _i, _len;
        key = this.zoo(key);
        strings = document.cookie.split(';');
        for (_i = 0, _len = strings.length; _i < _len; _i++) {
          string = strings[_i];
          position = string.indexOf('=');
          name = string.substr(0, position).replace(/^\s+|\s+$/g, '');
          if (name === key) {
            return unescape(string.substr(position + 1));
          }
        }
        return null;
      };

      Analytics.prototype.set = function(key, time) {
        var expires;
        expires = new Date;
        expires.setTime(expires.getTime() + (time * 1000));
        return document.cookie = "" + (this.zoo(key)) + "=1; expires=" + (expires.toUTCString());
      };

      return Analytics;

    })();
    return module.exports = Analytics;
  });

}).call(this);
