(function() {
    'use strict';

    angular
        .module('eduMed')
        .controller('guidesController', guidesController);

    guidesController.$inject = ['$scope','$state','$ionicHistory','commonService','$rootScope','guidesFactory'];
    function guidesController($scope,$state,$ionicHistory,commonService,$rootScope,guidesFactory) {
        var vm = this;

        //init
        vm.guides = [];

        var tab = 'new';
        $scope.$on('$ionicView.enter',function(e){
            tab = $state.current.url == '/new-guide' ? 'new' : 'interest';

            console.log('in tab: ' + tab);

            vm.titulo = tab==='new' ? 'Nuevas Guías' : 'Guías de interés';
            loadGuides();

        });

        // .-


        //functions


        vm.isComplete = function(guide){
            return guide.avance && guide.avance.completado;
        };


        vm.getImage = function(guide){
            return commonService.getFileUrl(guide.pathImgPreview);
        };

        vm.toLearn = function() {
            $state.go('app.aprender');
        };

        $rootScope.goBack = function() {
            $log.log('va');
            $ionicHistory.goBack();                           //This doesn't work
            //window.history.back();                          //This works
            //alert('code to go back called. Did it work?');  //For testing
        };



        function loadGuides(){
            var response = tab==='new' ? guidesFactory.getNewGuides() : guidesFactory.getGuidesOfInterest() ;
            response.then(
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
