(function() {
    'use strict';

    angular
        .module('eduMed')
        .factory('guidesFactory', guidesFactory);

    guidesFactory.$inject = ['$q','$http','URL_API','CANT_GUIDES_HOME'];
    function guidesFactory($q,$http,URL_API,CANT_GUIDES_HOME) {

        return {
            getNewGuides : getNewGuides,
            getGuidesOfInterest : getGuidesOfInterest
        };

        function getNewGuides(){
            return getGuides('guia?latest=' + CANT_GUIDES_HOME);
        }

        function getGuidesOfInterest(){
            return getGuides('guia');
        }


        function getGuides(restUrl){
            var deferred = $q.defer();
            $http({
                url: URL_API + restUrl,
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            }).then(function(result){

                var guidesList = result.data;

                deferred.resolve(guidesList);

            }, function(){
                deferred.reject();
            });

            return deferred.promise;
        }


    }
})();
