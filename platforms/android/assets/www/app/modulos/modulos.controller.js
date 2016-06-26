

(function() {
'use strict';

	angular
		.module('eduMed')
		.controller('modulosController', modulosController);

	modulosController.$inject = ['$log','$ionicLoading','$sce','$ionicModal','$ionicPopup'];
	function modulosController($log,$ionicLoading,$sce,$ionicModal,$ionicPopup) {
		var vm = this;
		

		$log.log('modulosController');
		//$scope.setBodyClass('aprender');
       /*
	    $ionicLoading.show({
            template: '<div class="edumed-loading"></div>'
        });
        setTimeout(function(){
            $ionicLoading.hide();
        }, 2000);
		*/
		
		vm.API = null;
		vm.onPlayerReady = function(API) {
			console.log(API);
			vm.API = API;
		};
 

		vm.config = {
			
            preload: "none",
            sources: [
                {src: $sce.trustAsResourceUrl("video/La_artritis_psoriasica.mp4"), type: "video/mp4"}
            ],
            theme: {
                url: "lib/videogular-themes-default/videogular.css"
            },
            plugins: {
         		poster: "video/La_artritis_psoriasica.jpg"
            }
           
		};
		
		vm.testRun = false;
		vm.starTest = function() {
			vm.testRun = true;
			vm.API.stop();
		}
		vm.okTest = function() {
			vm.testRun = false;
		}
		
		$ionicModal.fromTemplateUrl('app/modulos/test.html', {
			//scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			vm.modal = modal;
		});
		
		//Confirmar llenar form
		vm.showConfirm = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Consume Ice Cream',
				template: 'Are you sure you want to eat this ice cream?'
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
		
		vm.onCompleteVideo = function() {
			console.log("on complete 1");
			 //vm.modal.show();
			 vm.showConfirm();

			/*ngDialog.open({ 
				template: 'modules/modulos/templates/modal.html',
				className: '',
				controller: ['$scope', function($scope) { 
					// Controller logic here
					
					console.log('alla');
					$scope.clickToClose = function() {
						console.log('jojo');
						$scope.closeThisDialog(0);
						//$location.path('/calendario');
						//Moment.addMoment( { fecha: diaSelect.toISOString(), tipo: 'estudio' } );
					};

				}]
			});*/
		};
		$ionicModal.fromTemplateUrl('app/modulos/test.html', {
			animation: 'slide-in-up'
		}).then(function(modal) {
			vm.modal = modal;
		});
		vm.openModal = function() {
			$log.log('comenzar test');
			vm.modal.show();
		}
		
		
		
		
		
	}
})();