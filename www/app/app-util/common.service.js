(function() {
    'use strict';

    angular
        .module('eduMed')
        .service('commonService', commonService);

    commonService.$inject = ['$q','URL_API'];
    function commonService($q,URL_API) {

        return {
            getFileUrl : getFileUrl
        };

        function getFileUrl(id){
            return URL_API + 'file/' + id;
        }



    }
})();
