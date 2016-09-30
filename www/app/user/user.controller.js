(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('userController', userController)
    .controller('historialController',historialController);

  userController.$inject = ['Camera','$log','$ionicPopup','profileFactory','commonService'];
  historialController.$inject = ['profileFactory','guidesFactory']
  function userController(Camera,$log,$ionicPopup,profileFactory,commonService) {
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
      )

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
          vm.picture = imageData;;
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
         vm.picture = "data:image/jpeg;base64," + imageData;
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