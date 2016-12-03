(function() {
    'use strict';

    angular
        .module('eduMed')
        .controller('historyController', historyController);


    historyController.$inject = ['$scope','$rootScope','$stateParams','$ionicHistory','profileFactory','commonService','avancesFactory','guidesFactory','$state'];
    function historyController($scope,$rootScope,$stateParams,$ionicHistory,profileFactory,commonService,avancesFactory,guidesFactory,$state) {
         //forzar salida backbutton
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });
        
        var vm = this;

        //init
        console.log('history');
        vm.user = {};
        vm.hist = {
            active: [],
            completed: []
        };


        $scope.$on('$ionicView.enter',function(e){
            var idUser = $stateParams.id;
            loadPatients(idUser);

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

        vm.toLearn = function(idGuide) {
            console.log('toLearn: ' + idGuide);
            $state.go(
                'app.aprender',
                {
                    id: idGuide
                }
            );
        };

        function loadPatients(idUser){
            profileFactory.getPatients().then(
                function(patients){
                    //console.log(patients);
                    angular.forEach(patients,function(item){
                        if(item.paciente.id==idUser) {
                            vm.user = item.paciente;
                        }
                        //vm.user =
                    });
                    //vm.patients = patients;
                },
                function(e){ console.error(e); }
            );
        }
        vm.temporal = [];
        vm.temporal2 = [];
        function loadHistory(idUser) {
            console.log(idUser);
            avancesFactory.getAvance(idUser).then(
                function (data) {
                    console.log(data);
                    angular.forEach(data, function (d) {
                        if(angular.isUndefined(vm.temporal[d.idGuia])){
                            vm.temporal[d.idGuia] = {};
                            vm.temporal[d.idGuia].porcentaje = 0;
                        }

                        if(angular.isUndefined(vm.temporal[d.idGuia].fechaInicio)){
                            vm.temporal[d.idGuia].fechaInicio = d.fechaInicio;
                        }
                        vm.temporal[d.idGuia].fechaCompletado = d.fechaCompletado;
                        if(angular.isUndefined(vm.temporal[d.idGuia])){
                            vm.temporal[d.idGuia].porcentaje = {};
                        }
                        vm.temporal[d.idGuia].porcentaje += d.porcentaje;
                        vm.temporal[d.idGuia].idGuia = d.idGuia;
                        vm.temporal[d.idGuia].completado = d.completado;
                    });
                    console.log(vm.temporal);
                    /*for(var i = 0; i < vm.temporal.length; i++){
                     console.log(vm.temporal[i]);

                     }*/
                    for (var key in vm.temporal) {
                        if (vm.temporal.hasOwnProperty(key)){
                            vm.temporal2.push(vm.temporal[key]);
                        }
                    }
                    console.log(vm.temporal);
                    angular.forEach(vm.temporal2, function (item) {
                        guidesFactory.getGuide(item.idGuia).then(
                            function(guide){
                                console.log(guide);
                                var avance = {};
                                avance.titulo = guide.titulo;
                                avance.subtitulo = guide.subtitulo;
                                avance.pathImgPreview = guide.pathImgPreview;
                                avance.totalModulos = guide.modulos.length;
                                avance.porcentaje = item.porcentaje/guide.modulos.length;
                                avance.fechaInicio = item.fechaInicio;
                                avance.idGuia = item.idGuia;
                                avance.fechaCompletado = item.fechaCompletado;
                                avance.completado = item.completado;
                                /*angular.forEach(guide.modulos, function(modulo) {
                                 if(avance.idModulo == modulo.idModulo) {
                                 //avance.pathImgPreview = modulo.pathImgPreview;
                                 //avance.titulo = guide.titulo +'-'+modulo.titulo;
                                 //avance.subtitulo = modulo.subtitulo;
                                 //avance.porcentaje = current2.avance.porcentaje;

                                 }
                                 });*/
                                if(avance.porcentaje==100){
                                    vm.hist.completed.push(avance);
                                }else{
                                    vm.hist.active.push(avance);
                                }
                            },
                            function(e){
                                console.error(e);
                            }
                        );
                    });
                    /*vm.hist.completed = _.filter(history,function(h){return h.completado!=null && h.completado==true});
                     vm.hist.active = _.filter(history,function(h){return h.completado!=null && h.completado==false});
                     co/nsole.log(vm.hist);*/
                },
                function (e) {
                    console.error(e);
                }
            );
        };


    }
})();