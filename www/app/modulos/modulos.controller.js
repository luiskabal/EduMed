(function() {
'use strict';

	angular
		.module('eduMed')
		.controller('modulosController', modulosController);

	modulosController.$inject = ['$scope','$rootScope','$state','$stateParams','$ionicHistory','$log','$ionicLoading','$sce','$ionicModal','$ionicPopup','$timeout','commonService','guidesFactory','avancesFactory'];
	function modulosController($scope,$rootScope,$state,$stateParams,$ionicHistory,$log,$ionicLoading,$sce,$ionicModal,$ionicPopup,$timeout,commonService,guidesFactory,avancesFactory) {
		//forzar salida backbutton
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });


		var vm = this;

		//init
		vm.idGuide = null;
		vm.guide = {};
		vm.relatedGuides = [];
		vm.selectedModule = null;
		vm.rating = 1;

		vm.sendedVideo= null;




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
					"idRespuestaSeleccionada": $scope.selectedAnswers[p.idPregunta]
				});
			});
			if(invalidAnswer){
				console.error("invalid do validation!");
			}else{
				vm.sendedVideo = vm.selectedModule.idModulo;
				avancesFactory.postAnswers(
					vm.idGuide,
					vm.selectedModule.idModulo,
					answers
				).then(function(res){
					angular.forEach(res,function(itemResp){
						if(itemResp.idModulo == vm.selectedModule.idModulo && vm.guide.idGuia == itemResp.idGuia){
							console.log(itemResp.completado);
							if(itemResp.completado) {
								$scope.modal.hide();
								if(vm.guide.modulos.length == vm.selectedModule.idModulo){
									vm.showRatings();
								}
								$scope.setSelectedModule(vm.selectedModule.idModulo);
								loadGuide(vm.idGuide);
								$scope.setSelectedModule(vm.selectedModule.idModulo);


							}else{
								$scope.modal.hide();
							}
						}
					});
				});

			}


		};

		$scope.clickRadio = function(p,r){
			$scope.selectedAnswers[p.idPregunta] = r.idRespuesta;
		};

		$scope.moduleIsComplete = function(id){
			var modulo = vm.guide.avance.modulos[id-1];
			return modulo && modulo.completado;
		};

		$scope.moduleIsActive = function(id){
			var modulo = vm.guide.avance.modulos[id-1];
			var indice = id-2;
			if(indice >= 0) {
				return modulo && !modulo.completado && (vm.guide.avance.modulos[id - 2].completado);
			}else{
				return modulo && !modulo.completado;
			}
		};

		$scope.setSelectedModule = function(id){
			if(vm.guide.avance.modulos[id-1].completado || $scope.moduleIsActive(id)) {
				vm.selectedModule = vm.guide.modulos[id - 1];
				setVideo(vm.selectedModule);
			}
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
			theme: {
				url: "lib/videogular-themes-default/videogular.css"
			}
			//,plugins: {
			//	poster: "video/La_artritis_psoriasica.jpg"
			//}
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
			if(vm.guide.modulos){
				//selecciona el modulo
				var lastComplete = 0;
				_.forEach(vm.guide.modulos,function(mod){
					var modulo = vm.guide.avance.modulos[mod.idModulo-1];
					console.log(modulo && modulo.completado);
					if(modulo && modulo.completado){
						lastComplete++;
					}
				});
				selectedModule = vm.guide.modulos[lastComplete];
				if(angular.isUndefined(selectedModule)){
					selectedModule = vm.guide.modulos[0];
				}
				/*if(vm.sendedVideo!=null){
					selectedModule = vm.guide.modulos[vm.sendedVideo+1];
				}*/

				//id para las preguntas
				_.forEach(selectedModule.preguntas,function(p){
					_.forEach(p.respuestas,function(r){
						r.idRadio = 'p'+p.idPregunta+'r'+r.idRespuesta;
					})
				});

				console.log(selectedModule);
			}
			if(vm.selectedModule == null) {
				vm.selectedModule = selectedModule;
			};
			setVideo(vm.selectedModule);
		}



		function setVideo(modulo){
			if(modulo==null){
				return;
			}

			//https://player.vimeo.com/external/190002635.sd.mp4?s=5ebff57b349ee84e07ffaa7f001009d77c96c9d9&profile_id=164
			//var videoUrl = modulo.urlVideo.substring(0,4)==='http' ? modulo.urlVideo : commonService.getFileUrl(modulo.urlVideo);
			var videoUrl = 'https://player.vimeo.com/external/190002635.sd.mp4?s=5ebff57b349ee84e07ffaa7f001009d77c96c9d9&profile_id=164';
			var videoPoster = commonService.getFileUrl(modulo.pathImgPreview);
			console.log(videoPoster);
			vm.config.sources = [{
				src: $sce.trustAsResourceUrl(videoUrl),
				type: "video/mp4"
			}];
			vm.config.plugins = {
				poster :  videoPoster
			};
			
		}

		// ionic-ratings(ratingsobj='ratingsObject', index='0') 
		//Rating
    $scope.ratingsObject = {
        iconOn : 'ion-ios-star',
        iconOff : 'ion-ios-star',
        iconOnColor: '#f7d74c',
        iconOffColor:  '#ffffff',
        rating:  2,
        minRating:1,
        callback: function(rating) {
            $scope.ratingsCallback(rating);
        }
    };

    $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
		vm.rating = rating;
    };
		

		vm.showRatings = function() {
			var confirmPopup = $ionicPopup.confirm({
				cssClass: 'ModalCalificar',
				scope: $scope,
				templateUrl: 'app/modulos/pop-up.html'
			});

			confirmPopup.then(function(res) {
				if(res) {
					var params= {};
					params.idGuia = vm.guide.idGuia;
					params.rating = vm.rating;
					guidesFactory.setValoracion(params).then(
						function(ret){
							console.log(ret);
						},
						function(e){
							console.error(e);
						}
					);
				} else {
					console.log('You are not sure');
				}
			});
		};

		
	}
})();