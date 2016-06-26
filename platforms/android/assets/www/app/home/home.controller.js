(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('homeController', homeController);

    homeController.$inject = ['$log','$state'];
    function homeController($log,$state) {
        var vm = this;
        
        

        vm.toLearn = function() {
			$log.log('va');
            $state.go('app.aprender');
		}
    }
})();