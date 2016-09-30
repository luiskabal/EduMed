(function() {
  'use strict';

  angular
      .module('eduMed')
      .controller('patientsController', patientsController);


  patientsController.$inject = ['$scope','$rootScope','$log','$ionicHistory','profileFactory','commonService','$ionicPopup','$state'];
  function patientsController($scope,$rootScope,$log,$ionicHistory,profileFactory,commonService,$ionicPopup,$state) {
    var vm = this;

    var traerIntereses = commonService.getResource("resource/enfermedad");
    traerIntereses.then(
            function(int){
                vm.enfermedades = int._embedded.enfermedades;
                console.log(vm.enfermedades);
            },
            function(e){
                console.error(e);
            }
    );

    vm.enviarCodigo = function() {
        var params = {
            "perfilGenerador":"idGenerador",
            "emailPaciente": vm.email,
            "estado": "",
            "guiasSugeridas": [{
                                    "descripcion": vm.interes.descripcion,
                                    "id": vm.interes.id,
                                    "nombre": vm.interes.nombre
                                }],
            "nombrePaciente": vm.nombre
        };
        var generarCodigo = profileFactory.getCode(params);
        generarCodigo.then(
            function(data){
                var alertPopup = $ionicPopup.alert({
                    title: '<i class="icon ion-ios-checkmark-outline"></i>',
                    template: '<p>Codigo Enviado a '+vm.nombre+'</p>'//<h3 class="codigo">4545211554545</h3>
                });
                alertPopup.then(function(res) {
                    $state.go('app.home');
                });

            },
            function(e){
                var alertPopup = $ionicPopup.alert({
                    title: '<i class="icon ion-ios-close-outline"></i>',
                    template: '<p>Error al generar codigo</p>'
                });
                alertPopup.then(function(res) {
                });

            }
        );
    };

      function showLoading() {
          $ionicLoading.show({
              template: '<div class="edumed-loading"></div>'
          }).then(function(){
              console.log("The loading indicator is now displayed");
          });

      }

      function hideLoading() {
          $ionicLoading.hide().then(function () {
              console.log("The loading indicator is now hidden");
          })
      }


    //init
    console.log('patients ctrl');
    vm.patients = [];

    loadPatients();

    $scope.$on('$ionicView.enter',function(e){
      $rootScope.goBack = commonService.goBack($ionicHistory);
    });




    // scope functions
    vm.getImage = function(pathImg){
      return commonService.getFileUrl(pathImg);
    };

    vm.goHistory = function(patient){
        $state.go(
            'app.history',
            {
                id: patient.id
            }
        );
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