(function() {
    'use strict';

    angular
        .module('eduMed')
        .factory('avancesFactory', avancesFactory);

    avancesFactory.$inject = ['commonService'];
    function avancesFactory(commonService) {

        return {
            postAnswers : postAnswers,
            getAvance: getAvance
        };


        function postAnswers(idGuide,idModule,details){
            return commonService.post('avance/',{
                "idGuia": idGuide,
                "idModulo": idModule,
                "detalleAvances": details
            });
        }

        function getAvance(idPacient){
            return commonService.getResource('avance/'+idPacient);
        }



    }
})();
