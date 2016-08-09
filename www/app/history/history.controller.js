(function() {
    'use strict';

    angular
        .module('eduMed')
        .controller('historyController', historyController);


    historyController.$inject = ['$scope','$rootScope','$ionicHistory','profileFactory','commonService'];
    function historyController($scope,$rootScope,$ionicHistory,profileFactory,commonService) {
        var vm = this;

        //init
        console.log('history');
        vm.user = {};

        $scope.$on('$ionicView.enter',function(e){
            $rootScope.goBack = commonService.goBack($ionicHistory);
        });



    }
})();