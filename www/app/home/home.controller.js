(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('homeController', homeController);

    homeController.$inject = ['$log','$state','$ionicViewService','$ionicHistory','$location','$rootScope'];
    function homeController($log,$state,$ionicViewService,$ionicHistory,$location,$rootScope) {
        var vm = this;
        
        

        vm.toLearn = function() {
			$log.log('va');
            $state.go('app.aprender');
		}
        
        $rootScope.goBack = function() {
            $log.log('va');
            $ionicHistory.goBack();                           //This doesn't work
        //window.history.back();                          //This works
        //alert('code to go back called. Did it work?');  //For testing
        }
    }
})();
