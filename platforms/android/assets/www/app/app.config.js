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


        $httpProvider.interceptors.push(function(storageService){
                //var hashPaciente = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkcmd1dGllcnJlekBvdXRsb29rLmNsIiwidXNlcm5hbWUiOiJkcmd1dGllcnJlekBvdXRsb29rLmNsIiwicm9sZXMiOiJST0xFX1BBQ0lFTlRFIn0.F_-2TIPu9c8qnDY6h4qRZgfb7s4RJJokJ5rKFFBCRgDW4bX-74IZmX-v7uMtZzqfSZG1rn7pYpRPVHJJsIDhtQ';
                //var hashDoctor = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW5uaWVsZ3V0aWVycmV6OTBAZ21haWwuY29tIiwidXNlcm5hbWUiOiJkYW5uaWVsZ3V0aWVycmV6OTBAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX0RPQ1RPUiJ9.wf9WBtL1F3KGIZHrpSRvQHnzARMsA_zczmol8DFA3QyAX2VzLql3_OKdgZhTpi21c1UjEWKx6ZWWt-ERWYKsZw';
                //console.log(storageService.getToken());
                return {
                    request: function(req) {
                        //req.headers['X-Auth'] = hashDoctor;
                        req.headers['X-Auth'] = storageService.getToken();
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
