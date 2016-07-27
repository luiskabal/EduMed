(function() {
    'use strict';

    angular
        .module('eduMed')
        .factory('profileFactory', profileFactory);

    profileFactory.$inject = ['commonService'];
    function profileFactory(commonService) {

        return {
            getProfile : getProfile,
            getPatients : getPatients
        };



        function getProfile(){
            return commonService.getResource('perfil');
        }

        function getPatients(){
            return commonService.getResource('doctor/pacientes');
        }





    }
})();
