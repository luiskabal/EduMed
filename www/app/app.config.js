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
                var hash = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkcmd1dGllcnJlekBvdXRsb29rLmNsIiwidXNlcm5hbWUiOiJkcmd1dGllcnJlekBvdXRsb29rLmNsIiwicm9sZXMiOiJST0xFX1BBQ0lFTlRFIn0.F_-2TIPu9c8qnDY6h4qRZgfb7s4RJJokJ5rKFFBCRgDW4bX-74IZmX-v7uMtZzqfSZG1rn7pYpRPVHJJsIDhtQ';
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
