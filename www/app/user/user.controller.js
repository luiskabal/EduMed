(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('userController', userController)
    .controller('historialController',historialController);

  userController.$inject = ['$scope','Camera','$log','$ionicPopup','profileFactory','commonService','$rootScope','storageService','utilsFactory','$state','$filter','$timeout'];
  historialController.$inject = ['$scope','profileFactory','guidesFactory','commonService','$state']
  function userController($scope,Camera,$log,$ionicPopup,profileFactory,commonService,$rootScope,storageService,utilsFactory,$state,$filter,$timeout) {
    //forzar salida backbutton
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });
    var vm = this;

    $log.log('user');
      vm.generos= [{
          "id" : "MASCULINO",
          "nombre": "Masculino"
      },{
          "id" : "FEMENINO",
          "nombre": "Femenino"
      }];

      getPerfil();

      function getPerfil() {
          var callPerfil = profileFactory.getProfile();
          callPerfil.then(
              function (data) {
                  vm.perfil = data;
                  console.log(data);
                  vm.nombre = data.nombre;
                  var fecha = new Date(data.fechaNacimiento);
                  fecha.setDate(fecha.getDate() + 1);
                  console.log(fecha);
                  vm.fechaNacimiento = fecha;
                  console.log(vm.fechaNacimiento);

                  angular.forEach(vm.generos, function (currentGenero) {
                      if (currentGenero.id == data.genero) {
                          vm.genero = currentGenero;
                      }
                  });

                  vm.perfil.avatarPerfil = commonService.getFileUrl(data.avatar);
                  var traerInstitucion = commonService.getResource("resource/institucion/" + vm.perfil.idInstitucion);
                  traerInstitucion.then(
                      function (ins) {
                          vm.perfil.institucionDescripcion = ins.nombre;
                      },
                      function (e) {
                          console.error(e);
                      }
                  );
                  var traerIntereses = commonService.getResource("resource/perfil/" + vm.perfil.id + "/intereses");
                  traerIntereses.then(
                      function (int) {
                          vm.perfil.intereses = int._embedded.enfermedades;

                          var traerEnfermedad = commonService.getResource("resource/enfermedad");
                          traerEnfermedad.then(
                              function (int) {
                                  vm.enfermedades = int._embedded.enfermedades;
                                  console.log(vm.enfermedades);
                                  console.log(vm.perfil.intereses);
                                  angular.forEach(vm.enfermedades, function (currentInteres) {
                                      if (currentInteres.id == vm.perfil.intereses[0].id) {
                                          vm.enfermedad = currentInteres;
                                      }
                                  });
                              },
                              function (e) {
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
                      function (data) {
                          vm.instituciones = data._embedded.institucions;
                          angular.forEach(vm.instituciones, function (current) {
                              if (vm.perfil.idInstitucion == current.id) {
                                  vm.institucion = current;
                              }
                          });

                          console.log(vm.instituciones);
                      },
                      function (e) {
                          console.error(e);
                      }
                  );
                  var traeIsapres = utilsFactory.getIsapres();
                  traeIsapres.then(
                      function (data) {
                          vm.isapres = data._embedded.isapres;
                          console.log(vm.isapres);
                          angular.forEach(vm.isapres, function (current) {
                              if (vm.perfil.isapre == current.nombre) {
                                  vm.isapre = current;
                              }
                          });
                      },
                      function (e) {
                          console.error(e);
                      }
                  );

                  /**/


              },
              function (e) {
                  console.error(e);

              }
          );
      };

    vm.save = function(){
        var params= {};
        params.nombre = vm.nombre;
        params.isapre = vm.isapre.nombre;
        params.fechaNacimiento = $filter('date')(vm.fechaNacimiento, "yyyy-MM-dd");
        params.genero = vm.genero.id;
        params.idInstitucion = vm.institucion.id;
        params.intereses = [];
        params.intereses.push({id: vm.enfermedad.id, nombre:vm.enfermedad.id, descripcion: vm.enfermedad.descripcion});
        console.log(JSON.stringify(params));
        var editarPerfil = commonService.patch("perfil",params);
        editarPerfil.then(
            function(response){
                console.log(response);
                getPerfil();
                var callPerfil = profileFactory.getProfile();
                callPerfil.then(
                    function (data) {
                        $rootScope.perfil = data;
                    });
                getPerfil();
                $state.go('app.home', {}, {reload: true});
            }
            ,function(e){
                console.log("ERROR!!!!!!!!!!!");
                $state.go('app.home', {}, {reload: true});
            }
        );

    };
    //select cam
    // Triggered on a button click, or some other target
    vm.myPopup = {};
    vm.showPopup = function() {
      vm.data = {};

      // An elaborate, custom popup
      vm.myPopup = $ionicPopup.show({
        template: '',
        title: '<i class="icon ion-image"></i>',
        subTitle: 'Selecciona el origen de la imagen',
        buttons: [
          { 
            text: '<i class="ion-camera"></i> Camara',
            type: 'button-positive',
            onTap: function(e) {
                 vm.takePicture();
               /* vm.myPopup.close();
              $timeout(function() {
                  vm.getPicture();
                    //myPopup.close(); //close the popup after 3 seconds for some reason
            }, 100);*/
              
              
            }

          },
          {
            text: '<i class="ion-images"></i> Galeria',
            type: 'button-positive',
            onTap: function(e) {
                 vm.getPicture();
               /* vm.myPopup.close();
              $timeout(function() {
                  vm.getPicture();
                    //myPopup.close(); //close the popup after 3 seconds for some reason
            }, 100);*/
              
              
            }
          }
        ]
      });

      /*vm.myPopup.then(function(res) {
        console.log('Tapped!', res);
        vm.takePicture();
      }, function(error){
          console.log('error', error);
      }, function(myPopup){
          vm.myPopup.close();
      });*/

      
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
          vm.perfil.avatarPerfil = "data:image/jpeg;base64," + imageData;
          $rootScope.perfil.avatarPerfil = "data:image/jpeg;base64," + imageData;
          storageService.setAvatar($rootScope.perfil.avatarPerfil);
          //vm.myPopup.close();
           $timeout(function() {
                vm.myPopup.close(); //close the popup after 3 seconds for some reason
            }, 100);
      }, function(err) {
          console.log(err);
          vm.myPopup.close();
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
         storageService.setAvatar($rootScope.perfil.avatarPerfil);
      }, function(err) {
         console.log(err);
      });
    
   };
  }

  function historialController($scope,profileFactory,guidesFactory,commonService,$state){
      var vm = this;

       //forzar salida backbutton
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

      vm.getImage = function(img){
          return commonService.getFileUrl(img);
      };

      vm.toLearn = function(idGuide) {
          console.log('toLearn: ' + idGuide);
          $state.go(
              'app.aprender',
              {
                  id: idGuide
              }
          );
      };
      vm.avances = [];
      vm.temporal = [];
      vm.temporal2 = [];
      var traeAvance = profileFactory.getAvance();
        traeAvance.then(
            function(data){
                //vm.avances = data;
                console.log(data);
                angular.forEach(data, function (d) {
                    if(angular.isUndefined(vm.temporal[d.idGuia])){
                        vm.temporal[d.idGuia] = {};
                        vm.temporal[d.idGuia].porcentaje = 0;
                    }

                    if(angular.isUndefined(vm.temporal[d.idGuia].fechaInicio)){
                        vm.temporal[d.idGuia].fechaInicio = d.fechaInicio;
                    }
                    vm.temporal[d.idGuia].fechaCompletado = d.fechaCompletado;
                    if(angular.isUndefined(vm.temporal[d.idGuia])){
                        vm.temporal[d.idGuia].porcentaje = {};
                    }
                    vm.temporal[d.idGuia].porcentaje += d.porcentaje;
                    vm.temporal[d.idGuia].idGuia = d.idGuia;
                    vm.temporal[d.idGuia].completado = d.completado;
                });
                console.log(vm.temporal);
                /*for(var i = 0; i < vm.temporal.length; i++){
                    console.log(vm.temporal[i]);

                }*/
                for (var key in vm.temporal) {
                    if (vm.temporal.hasOwnProperty(key)){
                        vm.temporal2.push(vm.temporal[key]);
                    }
                }
                angular.forEach(vm.temporal2, function (item) {
                    guidesFactory.getGuide(item.idGuia).then(
                        function(guide){
                            console.log(guide);
                            var avance = {};
                            avance.titulo = guide.titulo;
                            avance.subtitulo = guide.subtitulo;
                            avance.pathImgPreview = guide.pathImgPreview;
                            avance.totalModulos = guide.modulos.length;
                            avance.porcentaje = item.porcentaje/guide.modulos.length;
                            avance.fechaInicio = item.fechaInicio;
                            avance.idGuia = item.idGuia;
                            avance.fechaCompletado = item.fechaCompletado;
                            avance.completado = item.completado;
                            /*angular.forEach(guide.modulos, function(modulo) {
                                if(avance.idModulo == modulo.idModulo) {
                                    //avance.pathImgPreview = modulo.pathImgPreview;
                                    //avance.titulo = guide.titulo +'-'+modulo.titulo;
                                    //avance.subtitulo = modulo.subtitulo;
                                    //avance.porcentaje = current2.avance.porcentaje;

                                }
                            });*/
                            vm.avances.push(avance);
                        },
                        function(e){
                            console.error(e);
                        }
                    );
                });
                console.log(vm.avances);
                /*angular.forEach(vm.avances, function(current) {
                    console.log(current);
                    guidesFactory.getNewGuides().then(
                        function(guides){
                            angular.forEach(guides, function(current2) {
                                if(current.idGuia === current2.idGuia){
                                    console.log(current2);
                                    current.titulo = current2.titulo;
                                    current.subtitulo = current2.subtitulo;
                                    current.porcentaje = current2.avance.porcentaje;
                                    current.pathImgPreview = current2.pathImgPreview;
                                }
                            });
                        },
                        function(e){
                            console.error(e);
                        }
                    );

                });*/

            },
            function(e){
                console.error(e);
            }
        );


  }
})();