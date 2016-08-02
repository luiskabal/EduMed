(function() {
'use strict';

    angular
        .module('eduMed')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope','$state','$ionicHistory','commonService','$rootScope','guidesFactory'];
    function homeController($scope,$state,$ionicHistory,commonService,$rootScope,guidesFactory) {
        var vm = this;

        vm.dr = true;

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

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
                    /*
                    var l1 ={"idGuia":"12312321","titulo":"Resfrio Introducción","subtitulo":"Como cuidarse ","descripcion":"guai de prueba","pathImgPreview":"pathImagenGuia1","fechaCreacion":"2016-06-28","idEnfermedad":"5781554676b0bf7d7cba1c9f","tags":["prevenir","resfrio","test"],"avance":{"completado":false,"porcentaje":33,"modulos":[{"completado":false,"porcentaje":66},{"completado":false,"porcentaje":0}]}};
                    var l2 ={"idGuia":"12312321","titulo":"Resfrio Introducción","subtitulo":"Como cuidarse ","descripcion":"guai de prueba","pathImgPreview":"pathImagenGuia1","fechaCreacion":"2016-06-28","idEnfermedad":"5781554676b0bf7d7cba1c9f","tags":["prevenir","resfrio","test"],"avance":{"completado":false,"porcentaje":33,"modulos":[{"completado":false,"porcentaje":66},{"completado":false,"porcentaje":0}]}};
                    guides = _.concat(guides,l1,l2);
                    */
                    vm.guides = guides;
                },
                function(e){
                    console.error(e);
                }
            );
        }

    }
})();
