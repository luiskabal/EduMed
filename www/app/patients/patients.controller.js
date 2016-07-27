(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('patientsController', patientsController);

  patientsController.$inject = ['$log','$ionicPopup','$state'];
  function patientsController($log,$ionicPopup,$state) {
    var vm = this;
    $log.log('patients');

    vm.enviarCodigo = function() {
      $log.log('enviarCodigo');
      var alertPopup = $ionicPopup.alert({
        title: '<i class="icon ion-ios-checkmark-outline"></i>',
        template: '<p>Codigo Enviado a Jose Hernandez</p><h3 class="codigo">4545211554545</h3> '
      });

      alertPopup.then(function(res) {
       $state.go('app.home');
      });
    };
  }
})();