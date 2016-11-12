(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('elementsController', elementsController);

  elementsController.$inject = ['$log','$ionicPopup','$ionicLoading','$scope'];
  function elementsController($log,$ionicPopup,$ionicLoading, $scope) {
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
        cssClass: 'ModalMensaje',
				scope: $scope,
				templateUrl: 'app/modulos/pop-up-mensaje-error.html'
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