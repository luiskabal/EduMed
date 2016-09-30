(function() {
    'use strict';

    angular
        .module('eduMed')
        .factory('profileFactory', profileFactory);

    profileFactory.$inject = ['commonService'];
    function profileFactory(commonService) {

        return {
            getProfile : getProfile,
            getPatients : getPatients,
            getAvance : getAvance,
            getCode : getCode
        };



        function getProfile(){
            return commonService.getResource('perfil');
        }

        function getPatients(){
            return commonService.getResource('doctor/pacientes');
        }

        function getAvance(){
            return commonService.getResource('resource/avance');
        }

        function getCode(params){
                return commonService.post('codigo-acceso',params);
        }



    }
})();
