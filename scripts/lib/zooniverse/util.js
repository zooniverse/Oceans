// Generated by CoffeeScript 1.4.0
(function() {

  define(function(require, exports, module) {
    var $, Spine, dateWords, days, months;
    Spine = require('Spine');
    $ = require('jQuery');
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    dateWords = {
      year: function(date) {
        return "" + (date.getUTCFullYear());
      },
      y: function(date) {
        return ("" + (date.getUTCFullYear())).slice(0, 2);
      },
      month: function(date) {
        return months[date.getUTCMonth()];
      },
      mon: function(date) {
        return months[date.getUTCMonth()].slice(0, 3);
      },
      m: function(date) {
        return date.getUTCMonth() + 1;
      },
      date: function(date) {
        return "" + (date.getUTCDate());
      },
      day: function(date) {
        return days[date.getUTCDay()];
      },
      d: function(date) {
        return days[date.getUTCDay()].slice(0, 3);
      },
      time24: function(date) {
        return "" + (date.getUTCHours()) + ":" + (('0' + date.getUTCMinutes()).slice(-2));
      },
      time12: function(date) {
        return "" + (((date.getUTCHours() % 12) + 12) % 12) + ":" + (('0' + date.getUTCMinutes()).slice(-2));
      },
      ampm: function(date) {
        if (date.getUTCHours() >= 12) {
          return 'am';
        } else {
          return 'pm';
        }
      }
    };
    return module.exports = {
      joinLines: function(string) {
        return string.replace(/\n/g, '');
      },
      arraysMatch: function(first, second) {
        var i, item, _i, _len;
        if (first.length !== second.length) {
          return false;
        }
        for (i = _i = 0, _len = first.length; _i < _len; i = ++_i) {
          item = first[i];
          if (first[i] instanceof Spine.Model) {
            if (!first[i].eql(second[i])) {
              return false;
            }
          } else if (first[i] instanceof $) {
            if (!first[i].is(second[i])) {
              return false;
            }
          } else {
            if (first[i] !== second[i]) {
              return false;
            }
          }
        }
        return true;
      },
      getObject: function(path, root) {
        path = path.split('.');
        while (path.length !== 0) {
          root = root[path.shift()];
          if (root == null) {
            return;
          }
        }
        return root;
      },
      remove: function(thing, _arg) {
        var array, i, something, _i, _len, _results;
        array = _arg.from;
        _results = [];
        for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
          something = array[i];
          if (thing instanceof Spine.Model) {
            if (!thing.eql(something)) {
              continue;
            }
          } else if (thing instanceof $) {
            if (!thing.is(something)) {
              continue;
            }
          } else {
            if (thing !== something) {
              continue;
            }
          }
          array.splice(i, 1);
          break;
        }
        return _results;
      },
      delay: function(duration, callback) {
        if (typeof duration === 'function') {
          callback = duration;
          duration = 1;
        }
        return setTimeout(callback, duration);
      },
      formatDate: function(date, format) {
        var convert, word;
        if (format == null) {
          format = '(date) (month) (year), (time12) (ampm)';
        }
        if (!(date instanceof Date)) {
          date = new Date(date);
        }
        for (word in dateWords) {
          convert = dateWords[word];
          if (~format.indexOf("(" + word + ")")) {
            format = format.replace("(" + word + ")", convert(date));
          }
        }
        return format;
      },
      clamp: function(n, _arg) {
        var max, min, _ref;
        _ref = _arg != null ? _arg : {
          min: 0,
          max: 1
        }, min = _ref.min, max = _ref.max;
        return Math.min(Math.max(n, min), max);
      }
    };
  });

}).call(this);
