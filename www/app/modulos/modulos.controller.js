(function() {
'use strict';

	angular
		.module('eduMed')
		.controller('modulosController', modulosController);

	modulosController.$inject = ['$scope','$rootScope','$state','$stateParams','$ionicHistory','$log','$ionicLoading','$sce','$ionicModal','$ionicPopup','$timeout','commonService','guidesFactory','avancesFactory'];
	function modulosController($scope,$rootScope,$state,$stateParams,$ionicHistory,$log,$ionicLoading,$sce,$ionicModal,$ionicPopup,$timeout,commonService,guidesFactory,avancesFactory) {
		var vm = this;

		//init
		vm.idGuide = null;
		vm.guide = {};
		vm.relatedGuides = [];
		vm.selectedModule = null;




		$scope.$on('$ionicView.enter',function(e){
			vm.idGuide = $stateParams.id;
			loadGuide(vm.idGuide);

			$rootScope.goBack = commonService.goBack($ionicHistory);
		});

		// .-


		// scope functions

		$scope.openModal = function() {
			console.log('comenzar test');
			$scope.selectedModule = vm.selectedModule;
			$scope.modal.show();
			$scope.selectedAnswers = {};
			_.forEach(vm.selectedModule.preguntas,function(p){
				console.log(p);
				$scope.selectedAnswers[p.idPregunta] = null;
			});

		};

		$scope.closeModal = function() {
			console.log($scope);
			$log.log('finalizar test');
			console.log($scope.selectedAnswers);
			var answers = [];
			var invalidAnswer = false;
			_.forEach(vm.selectedModule.preguntas,function(p){
				if($scope.selectedAnswers[p.idPregunta]==null){
					invalidAnswer = true;
				}
				answers.push({
					"idPregunta":p.idPregunta,
					"idRespuesta": $scope.selectedAnswers[p.idPregunta]
				});
			});
			if(invalidAnswer){
				console.error("invalid do validation!");
			}else{
				avancesFactory.postAnswers(
					vm.idGuide,
					vm.selectedModule.idModulo,
					answers
				);
			}

			$scope.modal.hide();
			loadGuide(vm.idGuide);
		};

		$scope.clickRadio = function(p,r){
			$scope.selectedAnswers[p.idPregunta] = r.idRespuesta;
		};


		//Comenzar cuestionario ?
		vm.showConfirm = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: vm.guide.titulo,
				template: 'has terminado el video de este módulo. ¿Quieres comenzar a responder el test de esté modulo?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					vm.modal.show();
					console.log('llenar form');
				} else {
					console.log('You are not sure');
				}
			});
		};






		// API video

		vm.API = null;
		vm.config = {
			preload: "none",
			sources: [{
				src: "https://youtu.be/eutVskbOCUQ"
			}],
			theme: {
				url: "lib/videogular-themes-default/videogular.css"
			},
			plugins: {
				poster: "video/La_artritis_psoriasica.jpg"
			}
		};

		// Events video

		vm.onPlayerReady = function(API) {
			console.log(API);
			vm.API = API;
		};

		vm.onCompleteVideo = function() {
			console.log("on complete 1");
			//vm.modal.show();
			$timeout(function() {
				vm.showConfirm(); //close the popup after 3 seconds for some reason
			}, 600);

		};

		// init modal
		$ionicModal.fromTemplateUrl('app/modulos/test.html', {
			animation: 'slide-in-up', scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});



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
				_.forEach(selectedModule.preguntas,function(p){
					_.forEach(p.respuestas,function(r){
						r.idRadio = 'p'+p.idPregunta+'r'+r.idRespuesta;
					})
				});
			}
			vm.selectedModule = selectedModule;
			setVideo(vm.selectedModule);
		}

		function setVideo(modulo){
			if(modulo==null){
				return;
			}

			var videoUrl = modulo.urlVideo.substring(0,4)==='http' ? modulo.urlVideo : commonService.getFileUrl(modulo.urlVideo);

			vm.config.sources = [{
				src: videoUrl
			}];
			vm.config.plugins.poster = commonService.getFileUrl(modulo.pathImgPreview);
			setTimeout(function(){
				try{
					vm.API.play();
				}catch(e){
					console.log(e)
				};
			},2500);
		}
		
		
	}
})();