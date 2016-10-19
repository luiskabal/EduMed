(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('userController', userController)
    .controller('historialController',historialController);

  userController.$inject = ['$scope','Camera','$log','$ionicPopup','profileFactory','commonService','$rootScope','storageService','utilsFactory','$state'];
  historialController.$inject = ['profileFactory','guidesFactory']
  function userController($scope,Camera,$log,$ionicPopup,profileFactory,commonService,$rootScope,storageService,utilsFactory,$state) {
    //forzar salida backbutton
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });
    var vm = this;

    $log.log('user');
      var callPerfil = profileFactory.getProfile();
      callPerfil.then(
          function (data) {
              vm.perfil = data;
              vm.perfil.avatarPerfil = commonService.getFileUrl(data.avatar);
              var traerInstitucion = commonService.getResource("resource/institucion/"+vm.perfil.idInstitucion);
              traerInstitucion.then(
                  function(ins){
                        vm.perfil.institucionDescripcion = ins.nombre;
                  },
                  function(e){
                      console.error(e);
                  }
              );
              var traerIntereses =  commonService.getResource("resource/perfil/"+vm.perfil.id+"/intereses");
              traerIntereses.then(
                  function(int){
                      vm.perfil.intereses = int._embedded.enfermedades;
                      console.log(vm.perfil);
                  },
                  function(e){
                      console.error(e);
                  }
              );
          },
          function (e) {
              console.error(e);
          }
      );
      var traeInstituciones = utilsFactory.getInstituciones();
      traeInstituciones.then(
          function(data){
              vm.instituciones = data._embedded.institucions;
              angular.forEach(vm.instituciones, function(current) {
                if(vm.perfil.idInstitucion == current.id){
                    vm.institucion = current;
                }
              });

              console.log(vm.instituciones);
          },
          function(e){
              console.error(e);
          }
      );
      var traeIsapres = utilsFactory.getIsapres();
      traeIsapres.then(
          function(data){
              vm.isapres = data._embedded.isapres;
              /*angular.forEach(vm.isapres, function(current) {
                  if(vm.perfil.isapre == current.id){
                      vm.institucion = current;
                  }
              });*/
          },
          function(e){
              console.error(e);
          }
      );

      var traerEnfermedad = commonService.getResource("resource/enfermedad");
      traerEnfermedad.then(
          function(int){
              vm.enfermedades = int._embedded.enfermedades;
              console.log(vm.enfermedades);
          },
          function(e){
              console.error(e);
          }
      );

    vm.save = function(){
        $state.go('app.home');
    };
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
          quality : 100,
          destinationType : 0,
          targetWidth: 200,
          targetHeight: 200,
          allowEdit: true, //allow cropping
          sourceType: 0
      };

      Camera.getPicture(options).then(function(imageData) {
          vm.perfil.avatarPerfil = imageData;
          $rootScope.perfil.avatarPerfil = imageData;
          storageService.setToken($rootScope.perfil.avatarPerfil);
      }, function(err) {
          console.log(err);
      });
    };  
    vm.takePicture = function (options) {
      $log.log('Camara');
      var options = {
         quality : 100,
         destinationType : 0,
         targetWidth: 200,
         targetHeight: 200,
         allowEdit: true, //allow cropping
         sourceType: 1
      };

      Camera.getPicture(options).then(function(imageData) {
         vm.perfil.avatarPerfil = "data:image/jpeg;base64," + imageData;
         $rootScope.perfil.avatarPerfil = "data:image/jpeg;base64," + imageData;
         storageService.setToken($rootScope.perfil.avatarPerfil);
      }, function(err) {
         console.log(err);
      });
    
   };
  }

  function historialController(profileFactory,guidesFactory){
      var vm = this;


          var traeAvance = profileFactory.getAvance();
          traeAvance.then(
              function(data){
                  vm.avances = data._embedded.avances;
                  console.log(vm.avances);
                  angular.forEach(vm.avances, function(current) {
                      guidesFactory.getGuide(current.idGuia).then(
                          function(guide){
                              console.log(guide);
                              current.titulo = guide.titulo;
                              current.subtitulo = guide.subtitulo;
                          },
                          function(e){
                              console.error(e);
                          }
                      );
                  });

              },
              function(e){
                  console.error(e);
              }
          );


  }
})();