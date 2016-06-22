(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('homeController', homeController);

    homeController.$inject = ['$log'];
    function homeController($log) {
        var vm = this;
        
        

        activate();

        ////////////////

        function activate() { }
    }
})();