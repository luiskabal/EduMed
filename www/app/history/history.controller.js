(function() {
    'use strict';

    angular
        .module('eduMed')
        .controller('historyController', historyController);


    historyController.$inject = ['$scope','$rootScope','$stateParams','$ionicHistory','profileFactory','commonService'];
    function historyController($scope,$rootScope,$stateParams,$ionicHistory,profileFactory,commonService) {
        var vm = this;

        //init
        console.log('history');
        vm.user = {};


        $scope.$on('$ionicView.enter',function(e){
            var idUser = $stateParams.id;
            loadHistory(idUser);

            $rootScope.goBack = commonService.goBack($ionicHistory);
        });




        //internal functions
        function loadHistory(idUser){
            console.log(idUser);
        }



    }
})();