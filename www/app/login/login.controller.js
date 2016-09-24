(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$log','$location','loginFactory'];
    function LoginController($scope,$log,$location,loginFactory) {
        var vm = this;

        vm.errorLogin = false;

        $scope.$watchGroup(['login.password','login.user'], function() {
            if(vm.errorLogin) {
                vm.errorLogin = false;
            }
        });

        vm.login = function() {
            console.log(vm.user);
            console.log(vm.password);
            vm.errorLogin = false;
            var response = loginFactory.login(vm.user,vm.password);
            response.then(
                function(data){
                    console.log(data);
                    $location.path('/app/home');
                },
                function(e){
                    vm.errorLogin = true;
                    console.error(e);
                }
            );

            //$state.go("/app/home"); 
        };

        activate();

        ////////////////

        function activate() { }
    }
})();