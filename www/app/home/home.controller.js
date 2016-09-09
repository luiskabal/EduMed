(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','$state','$ionicHistory','commonService','$rootScope','guidesFactory'];
    function homeController($scope,$state,$ionicHistory,commonService,$rootScope,guidesFactory) {
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

    }
})();
