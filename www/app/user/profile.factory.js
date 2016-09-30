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
            getAvance : getAvance
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



    }
})();
