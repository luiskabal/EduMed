(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','$state','$ionicHistory','commonService','$rootScope','guidesFactory'];
    function homeController($scope,$state,$ionicHistory,commonService,$rootScope,guidesFactory) {
        var vm = this;
        
        //init
        vm.guides = [];
        loadNewGuides();
        $scope.$on('$ionicView.enter',function(e){
            //console.log(e);
            $rootScope.goBack = commonService.goBack($ionicHistory);
        });




        // scope functions



        // internal functions


        function loadNewGuides(){
            guidesFactory.getNewGuides().then(
                function(guides){
                    vm.guides = guides;
                },
                function(e){
                    console.error(e);
                }
            );
        }

    }
})();
