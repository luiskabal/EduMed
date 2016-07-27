(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('elementsController', elementsController);

  elementsController.$inject = ['$log','$ionicPopup','$ionicLoading'];
  function elementsController($log,$ionicPopup,$ionicLoading) {
    var vm = this;
    
    $log.log('elements');
    
    vm.showLoading = function () {
      $ionicLoading.show({
        template: '<div class="edumed-loading"></div>'
      }).then(function(){
        console.log("The loading indicator is now displayed");
      });
      setTimeout(function() {
        $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
        });
      }, 2000);
    }

    vm.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: '<i class="icon ion-ios-checkmark-outline"></i>',
        template: 'Are you sure you want to eat this ice cream?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };
  }
})();