'use strict';

angular.module('qsmig', ['ui.router','ngResource','ui.bootstrap'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider

    .state('app', {
        url:'/',
            views: {
                'header': {
                    templateUrl : 'views/header.html',
                    controller  : 'HeaderController'
                },
                'content@': {
                    templateUrl : 'views/MainContent.html',
                    controller  : 'MainContentController'
                },
                'footer': {
                     templateUrl : 'views/footer.html',
                }
            }
        })

    .state('app.Sites', {
        url:'sites',
            views: {
                'header': {
                    templateUrl : 'views/header.html',
                    controller  : 'HeaderController'
                },
                'content@': {
                    templateUrl : 'views/Sites.html',
                    controller  : 'SitesController'
                }
            }
        })

    .state('app.Sites.details', {
        url:'sites/:server',
            views: {
                'header': {
                    templateUrl : 'views/header.html',
                    controller  : 'HeaderController'
                },
                'content@': {
                    templateUrl : 'views/SitesDetails.html',
                    controller  : 'SitesDetailsController'
                }
            }
        })


    .state('app.SavedConfig', {
        url:'savedConfig',
            views: {
                'header': {
                    templateUrl : 'views/header.html',
                    controller  : 'HeaderController'
                },
                'content@': {
                    templateUrl : 'views/savedConfig.html',
                    controller  : 'SavedConfController'
                }
            }
        })

     //$locationProvider.hashPrefix('!');

    $urlRouterProvider.otherwise('/');
    })
;