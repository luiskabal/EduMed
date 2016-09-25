(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$log','$location','loginFactory','storageService','profileFactory','$rootScope','$ionicPopup','$ionicLoading','commonService'];
    function LoginController($scope,$log,$location,loginFactory,storageService,profileFactory,$rootScope,$ionicPopup,$ionicLoading,commonService) {
        var vm = this;

        vm.errorLogin = false;
            if (!angular.isUndefined(storageService.getToken())) {
                showLoading();
                var callPerfil = profileFactory.getProfile();
                callPerfil.then(
                    function (data) {
                        $rootScope.perfil = data;
                        $rootScope.perfil.avatarPerfil = commonService.getFileUrl(data.avatar);
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

        vm.login = function() {
            vm.errorLogin = false;
            showLoading();
            var response = loginFactory.login(vm.user,vm.password);
            response.then(
                function(data){
                    $rootScope.perfil = data.perfilUsuario;
                    $rootScope.perfil.avatarPerfil = commonService.getFileUrl(data.avatar);
                    storageService.setToken(data.tokenSesion);
                    hideLoading()
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
})();