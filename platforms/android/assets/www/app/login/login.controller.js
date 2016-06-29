(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$log','$location'];
    function LoginController($log,$location) {
        var vm = this;
        
        vm.login = function() {
            $location.path('/app/home');
            //$state.go("/app/home"); 
        };

        activate();

        ////////////////

        function activate() { }
    }
})();