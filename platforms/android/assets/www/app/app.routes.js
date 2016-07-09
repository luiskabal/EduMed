(function () {
    'use strict';

    angular
        .module('eduMed')
        .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routes($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('dash', {
                url: '/login',
                //abstract: true,
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .state('suscribirse', {
                url: '/suscribirse',
                //abstract: true,
                templateUrl: 'app/login/suscribirse.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .state('codigo', {
                url: '/codigo',
                //abstract: true,
                templateUrl: 'app/login/ingresar-codigo.html',
                controller: 'LoginController'
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/menu/menu.html',
                controller: 'homeController'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'app/home/home.html',
                        controller: 'homeController',
                        controllerAs: 'home'
                    }
                }
            })
            .state('app.search', {
                url: '/search',
                //abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: 'app/home/search.html',
                        controller: 'homeController',
                        controllerAs: 'home'
                    }
                }
            })
            .state('app.search.new-guide', {
                url: '/new-guide',
                views: {
                    'new-guide': {
                        templateUrl: 'app/home/new-guide.html',
                        controller: 'homeController',
                        controllerAs: 'home'
                    }
                }
            })
            .state('app.search.guides-interest', {
                url: '/guides-interest',
                views: {
                    'guides-interest': {
                        templateUrl: 'app/home/guides-interest.html',
                        controller: 'homeController',
                        controllerAs: 'home'
                    }
                }
            })
            .state('app.user', {
                url: '/user',
                views: {
                    'menuContent': {
                        templateUrl: 'app/user/user.html'
                    }
                }
            })
            .state('app.edit-user', {
                url: '/edit-user',
                views: {
                    'menuContent': {
                        templateUrl: 'app/user/user-edit.html'
                    }
                }
            })
            .state('app.elements', {
                url: '/elements',
                views: {
                    'menuContent': {
                        templateUrl: 'app/elements/elements.html',
                        controller: 'elementsController',
                        controllerAs: 'elements'
                    }
                }
            })
            .state('app.aprender', {
                url: '/aprender',
                views: {
                    'menuContent': {
                        templateUrl: 'app/modulos/aprender.html',
                        controller: 'elementsController',
                        controllerAs: 'elements'
                    }
                }
            })
            .state('app.modulo', {
                url: '/modulo',
                views: {
                    'menuContent': {
                        templateUrl: 'app/modulos/video.html',
                        controller: 'modulosController',
                        controllerAs: 'module'
                    }
                }
            })
            .state('app.patients', {
                url: '/patients',
                views: {
                    'menuContent': {
                        templateUrl: 'app/patients/patients.html',
                        controller: 'patientsController',
                        controllerAs: 'patients'
                    }
                }
            });

        // Each tab has its own nav history stack which is defined in the corresponding module.

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    }

})();