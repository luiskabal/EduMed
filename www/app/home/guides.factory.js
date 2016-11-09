(function() {
    'use strict';

    angular
        .module('eduMed')
        .factory('guidesFactory', guidesFactory);

    guidesFactory.$inject = ['commonService','CANT_GUIDES_HOME'];
    function guidesFactory(commonService,CANT_GUIDES_HOME) {

        return {
            getGuide : getGuide,
            getNewGuides : getNewGuides,
            getGuidesOfInterest : getGuidesOfInterest,
            getRelatedGuides : getRelatedGuides,
            setValoracion: setValoracion
        };

        function setValoracion(params){
            return commonService.post('valoracion',params);
        }

        function getNewGuides(){
            return commonService.getResource('guia?latest=' + CANT_GUIDES_HOME);
        }

        function getGuidesOfInterest(){
            return commonService.getResource('guia');
        }

        function getGuide(idGuide){
            return commonService.getResource('guia/'+idGuide);
        }

        function getRelatedGuides(idAffliction){
            return commonService.getResource('guia?idEnfermedad='+idAffliction);
        }




    }
})();
