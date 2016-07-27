(function() {
  'use strict';

  angular
      .module('eduMed')
      .controller('patientsController', patientsController);

  patientsController.$inject = ['$scope','$rootScope','$ionicHistory','profileFactory','commonService'];
  function patientsController($scope,$rootScope,$ionicHistory,profileFactory,commonService) {
    var vm = this;

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