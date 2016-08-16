(function() {
    'use strict';

    angular
        .module('eduMed')
        .factory('modulosFactory', modulosFactory);

    modulosFactory.$inject = ['commonService'];
    function modulosFactory(commonService) {

        return {
            postAnswers : postAnswers
        };


        function postAnswers(idGuide,idModule,details){
            return commonService.post('avance/',{
                "idGuia": idGuide,
                "idModulo": idModule,
                "detalleAvances": details
            });
        }



    }
})();
