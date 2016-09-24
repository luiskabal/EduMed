/**
 * Created by pvill on 23-09-2016.
 */
(function() {
    'use strict';

    angular
        .module('eduMed')
        .factory('loginFactory', loginFactory);

    loginFactory.$inject = ['commonService'];
    function loginFactory(commonService) {

        return {
            login : login
        };

        function login(user,password){
            return commonService.post('auth/',{
                "username": user,
                "password": password
            });
        }
    }
})();