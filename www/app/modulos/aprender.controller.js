(function() {
    'use strict';

    angular
        .module('eduMed')
        .controller('aprenderController', aprenderController);

    aprenderController.$inject = ['$scope','$state','$stateParams','$ionicHistory','commonService','$rootScope','guidesFactory'];
    function aprenderController($scope,$state,$stateParams,$ionicHistory,commonService,$rootScope,guidesFactory) {
        var vm = this;

        //init
        vm.guide = {};
        vm.relatedGuides = [];

        $scope.$on('$ionicView.enter',function(e){
            var idGuide = $stateParams.id;
            loadGuide(idGuide);

            $rootScope.goBack = commonService.goBack($ionicHistory);
        });

        // .-


        // scope functions


        vm.isComplete = function(g){
            g = g || vm.guide;
            return g.avance && g.avance.completado;
        };


        vm.getImage = function(g){
            g = g || vm.guide;
            return commonService.getFileUrl(g.pathImgPreview);
        };



        // internal functions

        function loadGuide(idGuide){
            guidesFactory.getGuide(idGuide).then(
                function(guide){
                    console.log(guide);
                    vm.guide = guide;
                    loadRelatedGuides(vm.guide.idEnfermedad);
                },
                function(e){
                    console.error(e);
                }
            );
        }

        function loadRelatedGuides(idAffliction){
            guidesFactory.getRelatedGuides(idAffliction).then(
                function(relatedGuides){
                    console.log(relatedGuides);
                    vm.relatedGuides = _.filter(relatedGuides, function(rg) {
                        return rg.idGuia !== vm.guide.idGuia;
                    });
                },
                function(e){
                    console.error(e);
                }
            );
        }

    }
})();
