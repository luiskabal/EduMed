(function() {
    'use strict';

    angular
        .module('eduMed')
        .controller('newGuidesController', newGuidesController);

    newGuidesController.$inject = ['$scope','$state','$ionicHistory','$location','$rootScope','guidesFactory'];
    function newGuidesController($scope,$state,$ionicHistory,$location,$rootScope,guidesFactory) {
        var vm = this;

        //init
        vm.guides = [];
        loadNewGuides();

        //
        vm.isComplete = function(guide){
            return guide.avance && guide.avance.completado;
        };

        vm.toLearn = function() {
            $log.log('va');
            $state.go('app.aprender');
        };

        $rootScope.goBack = function() {
            $log.log('va');
            $ionicHistory.goBack();                           //This doesn't work
            //window.history.back();                          //This works
            //alert('code to go back called. Did it work?');  //For testing
        };



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
