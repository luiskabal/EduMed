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
            getResource : getResource,
            post : post,
            uploadFile : uploadFile,
            patch: patch
        };

        //impl
        function uploadFile(params){
                var fd = new FormData();
                fd.append("file", params.file);
                return $http({
                    url: URL_API+'file',
                    method: "POST",
                    data: fd,
                    transformRequest: angular.identity,
                    headers :{ 'Content-Type': undefined}
                }).then(function(response){
                    return response.data;
                },function(response){

                });
        }



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

        function post(restUrl,payload){
            var deferred = $q.defer();
            $http({
                url: URL_API + restUrl,
                method: "POST",
                data: payload,
                headers: {'Content-Type': 'application/json'}
            }).then(function(result){

                var data = result.data;

                deferred.resolve(data);

            }, function(){
                deferred.reject();
            });

            return deferred.promise;
        }

        function patch(restUrl,payload){
            var deferred = $q.defer();
            $http({
                url: URL_API + restUrl,
                method: "PATCH",
                data: payload,
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
