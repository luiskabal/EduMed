(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$log'];
    function LoginController($log) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();