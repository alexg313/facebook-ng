(function() {
  describe('Facebook init test', function() {
    var compile_scope;
    beforeEach(module('facebook-ng'));
    compile_scope = function(html) {
      var _this = this;
      return inject(function($compile, $rootScope) {
        var compiled, elem;
        elem = angular.element(html);
        compiled = $compile(elem);
        compiled($rootScope);
        return $rootScope.$digest();
      });
    };
    it('Should parse appid to int', function() {
      compile_scope('<facebook appId="123"></facebook>');
      return inject(function(Facebook) {
        return expect(Facebook._config.appId).toBe(123);
      });
    });
    it('Should parse booleans correctly', function() {
      var key, keys, value, _i, _len, _results;
      keys = ['status', 'cookie', 'xfbml', 'oauth', 'frictionlessRequests', 'hideFlashCallback'];
      _results = [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        _results.push((function() {
          var _j, _len1, _ref, _results1;
          _ref = [true, false];
          _results1 = [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            value = _ref[_j];
            compile_scope('<facebook ' + key + '="' + value + '"></facebook>');
            _results1.push(inject(function(Facebook) {
              return expect(Facebook._config[key]).toBe(value);
            }));
          }
          return _results1;
        })());
      }
      return _results;
    });
    it('Should initialise Facebook after fbAsyncInit gets called', function() {
      window.FB = {
        init: function() {}
      };
      spyOn(window.FB, 'init');
      compile_scope('<facebook appId="123"></facebook>');
      fbAsyncInit();
      return expect(window.FB.init).toHaveBeenCalled();
    });
    it('Should resolve promise after fbAsyncInit gets called', function() {
      compile_scope('<facebook appId="123"></facebook>');
      return inject(function(Facebook) {
        spyOn(Facebook._init_promise, 'resolve');
        fbAsyncInit();
        return expect(Facebook._init_promise.resolve).toHaveBeenCalled();
      });
    });
    return it('Should return facebook SDK after fbAsyncInit is finished', function() {
      window.FB = {
        init: function() {}
      };
      compile_scope('<facebook appId="123"></facebook>');
      fbAsyncInit();
      return inject(function(Facebook) {
        return Facebook.FB(function(FB) {
          return expect(FB).toBe(window.FB);
        });
      });
    });
  });

}).call(this);
