(function () {
    'use strict';

    angular
        .module('eduMed')
        .config(configure);

    configure.$inject = ['$ionicConfigProvider','$httpProvider'];

    function configure($ionicConfigProvider,$httpProvider) {
        // Add your configuration here
        $ionicConfigProvider.tabs.position('top'); // other values: top
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
        //$ionicConfigProvider.views.swipeBackEnabled(false);



        $httpProvider.interceptors.push(function(){
                var hash = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW5pZWxAeG1haWwuY29tIiwidXNlcm5hbWUiOiJkYW5pZWxAeG1haWwuY29tIiwicm9sZXMiOiJkb2N0b3IifQ.cRoSuKyLkt4ePEQpp_C9ns028Brzqo3SNpCXQf2HuFS5X2WEkUDp3abaFLY6VrLiHuvZ71jJQrjIccusD9bNYw';
                return {
                    request: function(req) {
                        req.headers['X-Auth'] = hash;
                        return req;
                    },
                    response: function(res){
                        return res;
                    }
                };
            }
        );

    }

})();
