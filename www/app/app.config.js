(function () {
    'use strict';

    angular
        .module('eduMed')
        .config(configure);

    configure.$inject = ['$ionicConfigProvider'];

    function configure($ionicConfigProvider) {
        // Add your configuration here
        $ionicConfigProvider.tabs.position('top'); // other values: top
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
        //$ionicConfigProvider.views.swipeBackEnabled(false);
    }

})();
