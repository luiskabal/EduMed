(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','$state','$ionicHistory','commonService','$rootScope','guidesFactory','$ionicPlatform','$location','storageService'];
    function homeController($scope,$state,$ionicHistory,commonService,$rootScope,guidesFactory,$ionicPlatform,$location,storageService) {
        
        
        // run this function when either hard or soft back button is pressed
        var doCustomBack = function() {
            console.log("custom BACK");
            $ionicHistory.goBack();
            
        };

        // override soft back
        // framework calls $rootScope.$ionicGoBack when soft back button is pressed
        var oldSoftBack = $rootScope.$ionicGoBack;
        $rootScope.$ionicGoBack = function() {
            doCustomBack();
        };
        var deregisterSoftBack = function() {
            $rootScope.$ionicGoBack = oldSoftBack;
        };

        // override hard back
        // registerBackButtonAction() returns a function which can be used to deregister it
        var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
            doCustomBack, 101
        );

        // cancel custom back behaviour
        $scope.$on('$destroy', function() {
            deregisterHardBack();
            deregisterSoftBack();
        });
        
        
        
        
        
        
        
        
        
        var vm = this;
        
        vm.guidesLoaded = false;


        //init
        vm.guides = [];
        loadNewGuides();
        $scope.$on('$ionicView.enter',function(e){
            //console.log(e);
            $rootScope.goBack = commonService.goBack($ionicHistory);
        });




        // scope functions

        vm.drawProgress = function(guide){
            var percentage = guide.avance.porcentaje;
            return Math.floor((percentage*5)/100);
        };

        $scope.cerrarSession = function(){
            storageService.setToken("");
            $location.path('/login');
        };

        // internal functions


        function loadNewGuides(){
            guidesFactory.getNewGuides().then(
                function(guides){
                    vm.guides = guides;
                    vm.guidesLoaded = true;
                },
                function(e){
                    console.error(e);
                }
            );
        }
        
        //slide
        $scope.helpState = 'help-state-one';
        $scope.slideHasChanged = function(index) {
            console.log(index);
            if(index === 0) {
                $scope.helpState = 'help-state-one';
            } else {
                $scope.helpState = 'help-state-two';
            }
        };

        vm.iconEnfermedad = function(id) {
            switch (id) {
                case '5781554676b0bf7d7cba1d9f':
                    return 'cancer-colorrectal';
                    break;
                case '5781554676b0bf7d7cba1c9f':
                    return 'ostomizados';
                    break;
                case '578154900364274901210aeb':
                    return 'cancer-gastrico';
                    break;
                default:
            }
            
        }

    }
})();
