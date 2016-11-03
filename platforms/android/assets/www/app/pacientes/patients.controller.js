(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('patientsController2', patientsController2);

  patientsController2.$inject = ['$scope','$log','$ionicPopup'];
  function patientsController2($scope,$log,$ionicPopup) {
    //forzar salida backbutton
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    var vm = this;
    $log.log('patients');

    vm.enviarCodigo = function() {
      $log.log('enviarCodigo');
      var alertPopup = $ionicPopup.alert({
        title: '<i class="icon ion-ios-checkmark-outline"></i>',
        template: 'Are you sure you want to eat this ice cream?'
      });

      alertPopup.then(function(res) {
        
      });
    };
    

  }
})();