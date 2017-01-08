(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('LoginController', LoginController)
        .controller('RegistrarController',RegistrarController);

    LoginController.$inject = ['$scope','$log','$location','loginFactory','storageService','profileFactory','$rootScope','$ionicPopup','$ionicLoading','commonService'];
    RegistrarController.$inject =['$scope','$ionicModal','$log','$location','loginFactory','$rootScope','$ionicPopup','$ionicLoading','commonService','$filter','utilsFactory'];
    function LoginController($scope,$log,$location,loginFactory,storageService,profileFactory,$rootScope,$ionicPopup,$ionicLoading,commonService) {
        var vm = this;

        if (ionic.Platform.isAndroid()) {
            window.addEventListener("native.hidekeyboard", function () {
            //show stuff on keyboard hide
             StatusBar.hide();
                window.AndroidFullScreen.immersiveMode(false, false);
            });
        }
        
        vm.errorLogin = false;
            if (!angular.isUndefined(storageService.getToken())) {
                showLoading();
                var callPerfil = profileFactory.getProfile();
                callPerfil.then(
                    function (data) {
                        $rootScope.perfil = data;
                        if (!angular.isUndefined(storageService.getAvatar())) {
                            $rootScope.perfil.avatarPerfil = storageService.getAvatar();
                        }else {
                            $rootScope.perfil.avatarPerfil = commonService.getFileUrl(data.avatar);
                        }
                        hideLoading();
                        $location.path('/app/home');
                    },
                    function (e) {
                        hideLoading()
                        console.error(e);
                    }
                )
            }

        $scope.$watchGroup(['login.password','login.user'], function() {
            if(vm.errorLogin) {
                vm.errorLogin = false;
            }
        });

        vm.volverLogin = function(){
            $location.path('/login');
        };

        vm.login = function() {
            vm.errorLogin = false;
            showLoading();
            var response = loginFactory.login(vm.user,vm.password);
            response.then(
                function(data){
                    $rootScope.perfil = data.perfilUsuario;
                    $rootScope.perfil.avatarPerfil = commonService.getFileUrl(data.avatar);
                    storageService.setToken(data.tokenSesion);
                    //storageService.setAvatar($rootScope.perfil.avatarPerfil);
                    hideLoading();
                    $location.path('/app/home');
                },
                function(e){
                    vm.errorLogin = true;
                    hideLoading();
                    console.error(e);
                }
            );

            //$state.go("/app/home"); 
        };

        vm.recuperar = function () {
            var response = loginFactory.recuperar(vm.recuperarEmail);
            response.then(
                function(data){

                },
                function(e){
                    vm.errorLogin = true;
                    hideLoading();
                    console.error(e);
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


        activate();

        ////////////////

        function activate() { }
    }
    function RegistrarController($scope,$ionicModal,$log,$location,loginFactory,$rootScope,$ionicPopup,$ionicLoading,commonService,$filter,utilsFactory){
        var vm = this;
        
        //CONDICIONES
        $ionicModal.fromTemplateUrl('app/login/condiciones.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.showCondiciones = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //end CONDICIONES
        
        console.log($rootScope.registro);
        vm.instituciones = [];

        var traeInstituciones = utilsFactory.getInstituciones();
        traeInstituciones.then(
            function(data){
                vm.instituciones = data._embedded.institucions;
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
                console.log(vm.isapres);
            },
            function(e){
                console.error(e);
            }
        );

        vm.generos= [{
                        "id" : "MASCULINO",
                        "nombre": "Masculino"
                    },{
                        "id" : "FEMENINO",
                        "nombre": "Femenino"
                    }];

        vm.paso1 = function(){
            $rootScope.registro = {};
            $rootScope.registro.nombre = vm.nombre;
            $rootScope.registro.email = vm.email;
            $rootScope.registro.password = vm.password;
            $rootScope.registro.fechaNacimiento = $filter('date')(vm.fechaNacimiento, 'yyyy-MM-dd')+'T00:00:00.000Z';
            $rootScope.registro.genero = vm.genero.id;
            $location.path('/codigo');
        };

        vm.paso2 = function(){
            $rootScope.registro.idInstitucion = vm.institucion.id;
            $rootScope.registro.codigoAcceso = vm.codigoAcceso;
            $rootScope.registro.tipoUsuario = 'ROLE_PACIENTE';
            $rootScope.registro.especialidad = " ";
            $rootScope.registro.intereses = [];
            $rootScope.registro.isapre = vm.isapre.id;

            console.log($filter('json')($rootScope.registro));
            var registrar = loginFactory.suscribirse($rootScope.registro);
            registrar.then(
                function(data){
                    var alertPopup = $ionicPopup.alert({
                        title: '<i class="icon ion-ios-checkmark-outline"></i>',
                        template: '<p>El registro a terminado con éxito</p>'
                    });
                    alertPopup.then(function(res) {
                        $location.path('/login');
                    });

                },
                function(e){
                    var alertPopup = $ionicPopup.alert({
                        title: '<i class="icon ion-ios-close-outline"></i>',
                        template: '<p>Código no válido</p>'
                    });
                    alertPopup.then(function(res) {
                    });

                }
            );
        };
    }

})();