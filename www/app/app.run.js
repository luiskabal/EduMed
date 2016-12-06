(function() {
    'use strict';

    angular
    .module('eduMed')
    .run(runBlock);

    runBlock.$inject = ['$ionicPlatform','$ionicPopup'];

    function runBlock($ionicPlatform,$ionicPopup) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar
            // above the keyboard for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                //StatusBar.styleLightContent();
                StatusBar.hide();
                ionic.Platform.fullScreen();
            }
            setInterval(function(){
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                            title: "SIN CONEXION A INTERNET!",
                            content: "Revisa tu internet wifi o tu conexión móvil para continuar."
                        })
                        .then(function(result) {
                            if(!result) {
                              //  ionic.Platform.exitApp();
                            }else{
                                ionic.Platform.exitApp();
                            }
                        });
                }
            }
                },10000);

            ionic.Platform.fullScreen();
            
        });
    }
})();
