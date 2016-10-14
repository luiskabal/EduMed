(function() {
    'use strict';

    angular
        .module('eduMed')
        .controller('historyController', historyController);


    historyController.$inject = ['$scope','$rootScope','$stateParams','$ionicHistory','profileFactory','commonService','avancesFactory'];
    function historyController($scope,$rootScope,$stateParams,$ionicHistory,profileFactory,commonService,avancesFactory) {
         //forzar salida backbutton
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });
        
        var vm = this;

        //init
        console.log('history');
        vm.user = {};
        vm.hist = {
            active: {},
            completed: {}
        };


        $scope.$on('$ionicView.enter',function(e){
            var idUser = $stateParams.id;
            loadProfile();
            loadHistory(idUser);

            $rootScope.goBack = commonService.goBack($ionicHistory);
        });

        // scope functions
        vm.getImage = function(pathImg){
            return commonService.getFileUrl(pathImg);
        };


        //internal functions
        function loadProfile(){
            profileFactory.getProfile().then(
                function(profile){
                    vm.user = profile;
                    console.log(vm.user);
                },
                function(e){
                    console.error(e);
                }
            );
        }

        function loadHistory(idUser){
            console.log(idUser);
            avancesFactory.getAvance(idUser).then(
                function(history){
                    vm.hist.completed = _.filter(history,function(h){return h.completado!=null && h.completado==true});
                    vm.hist.active = _.filter(history,function(h){return h.completado!=null && h.completado==false});
                    console.log(vm.hist);
                },
                function(e){
                    console.error(e);
                }
            );
        }



    }
})();