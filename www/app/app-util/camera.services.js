(function() {
'use strict';

  angular
    .module('eduMed')
    .service('Camera', Camera);

  Camera.$inject = ['$q'];
  function Camera($q) {
    
    
    ////////////////
      return {
          getPicture: function(options) {
            var q = $q.defer();

            navigator.camera.getPicture(function(result) {
                q.resolve(result);
            }, function(err) {
                q.reject(err);
            }, options);

            return q.promise;
          }
      }

    
    }
})();