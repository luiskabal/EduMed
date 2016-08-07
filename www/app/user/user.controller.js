(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('userController', userController);

  userController.$inject = ['Camera','$log','$ionicPopup'];
  function userController(Camera,$log,$ionicPopup) {
    var vm = this;
    $log.log('user');
    //select cam
    // Triggered on a button click, or some other target
    vm.showPopup = function() {
      vm.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '',
        title: '<i class="icon ion-image"></i>',
        subTitle: 'Selecciona el origen de la imagen',
        buttons: [
          { 
            text: '<i class="ion-camera"></i> Camara',
            type: 'button-positive'

          },
          {
            text: '<i class="ion-images"></i> Galeria',
            type: 'button-positive',
            onTap: function(e) {
              vm.getPicture();
              if (!vm.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return vm.data.wifi;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
        vm.takePicture();
      });

      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);
    };


    vm.getPicture = function (options) {
      $log.log('Galeria');
      var options = {
          quality : 75,
          targetWidth: 200,
          targetHeight: 200,
          sourceType: 0
      };

      Camera.getPicture(options).then(function(imageData) {
          vm.picture = imageData;;
      }, function(err) {
          console.log(err);
      });
    };  
    vm.takePicture = function (options) {
      $log.log('Camara');
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