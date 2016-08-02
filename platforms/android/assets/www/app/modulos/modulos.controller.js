(function() {
'use strict';

	angular
		.module('eduMed')
		.controller('modulosController', modulosController);

	modulosController.$inject = ['$scope','$rootScope','$state','$stateParams','$ionicHistory','$log','$ionicLoading','$sce','$ionicModal','$ionicPopup','$timeout','commonService','guidesFactory'];
	function modulosController($scope,$rootScope,$state,$stateParams,$ionicHistory,$log,$ionicLoading,$sce,$ionicModal,$ionicPopup,$timeout,commonService,guidesFactory) {
		var vm = this;

		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        }); 

		//init
		vm.guide = {};
		vm.relatedGuides = [];
		vm.selectedModule = null;




		$scope.$on('$ionicView.enter',function(e){
			var idGuide = $stateParams.id;
			loadGuide(idGuide);

			$rootScope.goBack = commonService.goBack($ionicHistory);
		});

		// .-


		// scope functions

		$scope.openModal = function() {
			$log.log('comenzar test');
			$scope.modal.show();
			console.log(vm.modal);
		};

		$scope.closeModal = function() {
			$log.log('cerrar modal');
			$scope.modal.hide();
			vm.moduleStepCurrent = vm.moduleStepCurrent ;
			vm.setVideo(vm.moduleStepCurrent);
		};


		//Comenzar cuestionario ?
		vm.showConfirm = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: vm.guide.titulo,
				template: 'has terminado el video de este módulo. ¿Quieres comenzar a responder el test de esté modulo?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					$scope.modal.show();
					console.log('llenar form');
				} else {
					console.log('You are not sure');
				}
			});
		};


///VIDEO GULAR

            vm.state = null;
            vm.API = null;
            vm.currentVideo = 0;

            vm.onPlayerReady = function(API) {
                vm.API = API;
            };

            vm.onCompleteVideo = function() {
                //vm.isCompleted = true;
                //vm.currentVideo++;
                //if (vm.currentVideo >= vm.videos.length) vm.currentVideo = 0;
                //vm.setVideo(vm.currentVideo);
				console.log("on complete 1");
				//vm.modal.show();
				$timeout(function() {
					vm.showConfirm(); //close the popup after 3 seconds for some reason
				}, 600);
            };

            vm.videos = [
            {
                sources: [
                    {src:"https://youtu.be/eutVskbOCUQ"}
                ]
            },
            {
                sources: [
                    {src: "https://youtu.be/iTzYDprQY1s"}
                ]
            },
            {
                sources: [
                    {src: "https://youtu.be/LTrqi8N_6W8"}
                ]
            },
            {
                sources: [
                    {src: "https://youtu.be/bUIyb101ldM"}
                ]
            }

        ];

            vm.config = {
                preload: "none",
                autoHide: false,
                autoHideTime: 3000,
                autoPlay: false,
                sources: vm.videos[0].sources,
                theme: {
                    url: "lib/videogular-themes-default/videogular.css"
                },
                plugins: {
                    poster: "img/video/cancer-colorrectal-modulo-1.png"
                }
            };

            vm.setVideo = function(index) {
                vm.API.stop();
                vm.currentVideo = index;
                vm.config.sources = vm.videos[index].sources;
                $timeout(vm.API.play.bind(vm.API), 100);
				vm.moduleStepCurrent = index + 1;
            };


//FIN VIDEO

		vm.moduleStepCurrent = 1;




	
		

		
		
		// init modal
		$ionicModal.fromTemplateUrl('app/modulos/test.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});

		vm.clickToSave = function(){
			console.log(123);
		};



		// internal functions

		function loadGuide(idGuide){
			guidesFactory.getGuide(idGuide).then(
				function(guide){
					console.log(guide);
					vm.guide = guide;
					loadActiveModule(vm.guide);
				},
				function(e){
					console.error(e);
				}
			);
		}

		function loadActiveModule(guide){
			var selectedModule = null;
			if(guide.modulos){
				_.forEach(guide.modulos,function(mod){
					if(mod.avance && !mod.avance.completado){
						selectedModule = mod;
					}
				});
				if(selectedModule==null && guide.modulos.length>0){
					selectedModule = guide.modulos[0];
				}
			}
			vm.selectedModule = selectedModule;
			//setVideo(vm.selectedModule);
		}

		/*function setVideo(modulo){
			if(modulo==null){
				return;
			}
			//video/La_artritis_psoriasica.mp4
			vm.config.sources = [{
				src: $sce.trustAsResourceUrl(commonService.getFileUrl(modulo.urlVideo)), type: "video/mp4"
			}];
			vm.config.plugins.poster = commonService.getFileUrl(modulo.pathImgPreview);
		}*/
		
		
	}
})();