(function() {
    'use strict';

    angular
        .module('eduMed')
        .factory('profileFactory', profileFactory);

    profileFactory.$inject = ['commonService','$http','$q','URL_API'];
    function profileFactory(commonService,$http,$q,URL_API) {

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
