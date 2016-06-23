(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('elementsController', elementsController);

  elementsController.$inject = ['$log','$ionicPopup'];
  function elementsController($log,$ionicPopup) {
    var vm = this;
    
    $log.log('elements');
    

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