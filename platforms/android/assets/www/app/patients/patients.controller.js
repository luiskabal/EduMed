(function() {
  'use strict';

  angular
      .module('eduMed')
      .controller('patientsController', patientsController);

  patientsController.$inject = ['$scope','$rootScope','$ionicHistory','profileFactory','commonService','$log', '$ionicPopup'];
  function patientsController($scope,$rootScope,$ionicHistory,profileFactory,commonService,$log,$ionicPopup) {
    var vm = this;

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    }); 

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

    vm.enviarCodigo = function() {
      $log.log('enviarCodigo');
      var confirmPopup = $ionicPopup.confirm({
        title: '<i class="icon ion-ios-checkmark-outline"></i>',
        template: '<p>Codigo Enviado</p><h3 class="codigo">4545211554545</h3> '
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