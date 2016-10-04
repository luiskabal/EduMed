/**
 * Created by pvill on 25-09-2016.
 */
(function() {
    'use strict';

    angular
        .module('eduMed')
        .factory('utilsFactory', utilsFactory);

    utilsFactory.$inject = ['commonService'];
    function utilsFactory(commonService) {
        return {
            getInstituciones : getInstituciones,
            getIsapres:getIsapres
        };
        function getInstituciones() {
            return commonService.getResource('resource/institucion');
        }

        function getIsapres(){
            return commonService.getResource('resource/isapre');
        }
    }

})();
