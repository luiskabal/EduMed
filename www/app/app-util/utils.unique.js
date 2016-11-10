/**
 * Created by pvill on 09-11-2016.
 */
(function() {
    'use strict';

    angular
      .module('eduMed')
      .filter('unique',unique)

     function unique(){
             return function(collection, keyname) {
                 var output = [],
                     keys = [];

                 angular.forEach(collection, function(item) {
                     var key = item[keyname];
                     if(keys.indexOf(key) === -1) {
                         keys.push(key);
                         output.push(item);
                     }
                 });

                 return output;
             };
     }

})();
