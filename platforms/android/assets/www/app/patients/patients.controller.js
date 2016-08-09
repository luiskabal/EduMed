(function() {
  'use strict';

  angular
      .module('eduMed')
      .controller('patientsController', patientsController);


  patientsController.$inject = ['$scope','$rootScope','$ionicHistory','profileFactory','commonService'];
  function patientsController($scope,$rootScope,$ionicHistory,profileFactory,commonService) {
    var vm = this;

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
    //init
    console.log('patients');
    vm.patients = [];

    loadPatients();

    $scope.$on('$ionicView.enter',function(e){
      $rootScope.goBack = commonService.goBack($ionicHistory);
    });




    // scope functions
    vm.getImage = function(pathImg){
      return commonService.getFileUrl(pathImg);
    };


    //internal function s
    function loadPatients(){
      profileFactory.getPatients().then(
          function(patients){
              console.log(patients);
              vm.patients = patients;
          },
          function(e){ console.error(e); }
      );
    }

  }
})();