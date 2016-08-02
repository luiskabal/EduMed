(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('userController', userController);

  userController.$inject = ['Camera','$log'];
  function userController(Camera,$log) {
    var vm = this;
    $log.log('user');

    vm.takePicture = function (options) {
      $log.log('takePicture');
      var options = {
         quality : 75,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 1
      };

      Camera.getPicture(options).then(function(imageData) {
         vm.picture = imageData;
      }, function(err) {
         console.log(err);
      });
    
   };
  }
})();