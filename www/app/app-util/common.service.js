(function() {
    'use strict';

    angular
        .module('eduMed')
        .service('commonService', commonService);

    commonService.$inject = ['$q','$http','URL_API'];
    function commonService($q,$http,URL_API) {

        //definitions
        return {
            getFileUrl : getFileUrl,
            goBack : goBack,
            getResource : getResource
        };

        //impl

        function getFileUrl(id){
            return URL_API + 'file/' + id;
        }


        function goBack($ionicHistory){
            return function(){
                console.log('goBack');
                $ionicHistory.goBack();
            }
        }


        function getResource(restUrl){
            var deferred = $q.defer();
            $http({
                url: URL_API + restUrl,
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            }).then(function(result){

                var data = result.data;

                deferred.resolve(data);

            }, function(){
                deferred.reject();
            });

            return deferred.promise;
        }


    }
})();
