(function() {
  'use strict';
  angular.module('facebook-ng', []).factory('Facebook', [
    '$window', '$rootScope', '$q', function($window, $rootScope, $q) {
      var Facebook;
      Facebook = {
        _init_promise: $q.defer(),
        _config: {
          appId: null,
          status: false,
          cookie: true,
          xfbml: false,
          oauth: true,
          frictionlessRequests: false,
          hideFlashCallback: null
        },
        init: function(config) {
          var _this = this;
          config = angular.extend(this._config, config);
          return $window.fbAsyncInit = function() {
            FB.init(config);
            return _this._init_promise.resolve(FB);
          };
        },
        FB: function(callback) {
          return this._init_promise.promise.then(function(FB) {
            return callback(FB);
          });
        }
      };
      return Facebook;
    }
  ]).directive('facebook', [
    'Facebook', function(Facebook) {
      var link;
      link = function(scope, element, attr) {
        var config, e;
        config = {};
        if ('appid' in attr) {
          config['appId'] = parseInt(attr['appid']);
        }
        if ('cookie' in attr) {
          config['cookie'] = attr['cookie'] === 'true';
        }
        if ('status' in attr) {
          config['status'] = attr['status'] === 'true';
        }
        if ('xfbml' in attr) {
          config['xfbml'] = attr['xfbml'] === 'true';
        }
        if ('oauth' in attr) {
          config['oauth'] = attr['oauth'] === 'true';
        }
        if ('frictionlessrequests' in attr) {
          config['frictionlessRequests'] = attr['frictionlessrequests'] === 'true';
        }
        if ('hideflashcallback' in attr) {
          config['hideFlashCallback'] = attr['hideflashcallback'] === 'true';
        }
        Facebook.init(config);
        e = document.createElement("script");
        e.async = true;
        e.src = document.location.protocol + "//connect.facebook.net/en_US/all.js";
        return element[0].appendChild(e);
      };
      return {
        restrict: 'E',
        template: '<div id="fb-root"></div>',
        replace: true,
        scope: {
          facebook_id: '=fbid'
        },
        link: link
      };
    }
  ]);

}).call(this);
