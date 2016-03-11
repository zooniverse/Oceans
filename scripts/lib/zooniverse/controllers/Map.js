// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  define(function(require, exports, module) {
    var $, Leaflet, Map, Spine, delay;
    Spine = require('Spine');
    Leaflet = require('Leaflet');
    require('leafletProviders');
    $ = require('jQuery');
    delay = require('zooniverse/util').delay;
    Map = (function(_super) {

      __extends(Map, _super);

      Map.prototype.latitude = 41.9;

      Map.prototype.longitude = -87.6;

      Map.prototype.zoom = 10;

      Map.prototype.layers = null;

      Map.prototype.cartoLogo = false;

      Map.prototype.zoomControl = true;

      Map.prototype.scrollWheelZoom = false;

      Map.prototype.doubleClickZoom = false;

      Map.prototype.apiKey = '';

      Map.prototype.tilesId = 998;

      Map.prototype.tilesProvider = 'MapQuestOpen.Aerial';

      Map.prototype.map = null;

      function Map() {
        this.addLabel = __bind(this.addLabel, this);

        this.resized = __bind(this.resized, this);

        this.removeLayer = __bind(this.removeLayer, this);

        this.addLayer = __bind(this.addLayer, this);

        this.setZoom = __bind(this.setZoom, this);

        this.setCenter = __bind(this.setCenter, this);

        var logo, mapSize, url, _ref;
        Map.__super__.constructor.apply(this, arguments);
        if ((_ref = this.layers) == null) {
          this.layers = [];
        }
        if (!(this.layers instanceof Array)) {
          this.layers = [this.layers];
        }
        this.map = new Leaflet.Map(this.el.get(0), {
          center: new Leaflet.LatLng(this.latitude, this.longitude),
          zoom: this.zoom,
          layers: [new Leaflet.TileLayer.Provider(this.tilesProvider)].concat(__slice.call((function() {
              var _i, _len, _ref1, _results;
              _ref1 = this.layers;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                url = _ref1[_i];
                _results.push(new Leaflet.TileLayer(url));
              }
              return _results;
            }).call(this))),
          scrollWheelZoom: this.scrollWheelZoom,
          doubleClickZoom: this.doubleClickZoom,
          attributionControl: false,
          zoomControl: this.zoomControl
        });
        mapSize = this.map.getSize();
        if (0 === mapSize.x || 0 === mapSize.y) {
          delay(1000, this.resized);
        }
        if (this.cartoLogo) {
          logo = $('<a href="http://www.cartodb.com/" target="_blank" class="cartodb-logo">\n  <img src="images/cartodb-logo.png" />\n</a>');
          logo.appendTo(this.el);
        }
      }

      Map.prototype.setCenter = function(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        return this.map.setView(new Leaflet.LatLng(this.latitude, this.longitude), this.map.getZoom());
      };

      Map.prototype.setZoom = function(zoom) {
        this.zoom = zoom;
        return this.map.setZoom(this.zoom);
      };

      Map.prototype.addLayer = function(url) {
        var layer;
        layer = new Leaflet.TileLayer(url);
        this.map.addLayer(layer);
        return layer;
      };

      Map.prototype.removeLayer = function(layer) {
        return this.map.removeLayer(layer);
      };

      Map.prototype.resized = function() {
        return this.map.invalidateSize();
      };

      Map.prototype.addLabel = function(lat, lng, html, radius) {
        var label, latLng;
        if (radius == null) {
          radius = 5;
        }
        latLng = new Leaflet.LatLng(lat, lng, true);
        label = new Leaflet.CircleMarker(latLng, {
          radius: radius
        });
        this.map.addLayer(label);
        if (html) {
          label.bindPopup(html);
        }
        return label;
      };

      return Map;

    })(Spine.Controller);
    return module.exports = Map;
  });

}).call(this);
