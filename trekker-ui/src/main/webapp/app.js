Trekker = angular.module('Trekker', ['ngMaterial', 'ui.router', 'LocalStorageModule', 'sprintf'])
    .config(TrekkerRouteCfg)
    .config(TrekkerStorageCfg)
    .run(TrekkerRun);

TrekkerRouteCfg.$inject = ['$urlRouterProvider', '$stateProvider'];
function TrekkerRouteCfg($urlRouterProvider, $stateProvider) {
  $urlRouterProvider
      .when('', '/auth');
  //.otherwise('');
  $stateProvider
      .state('auth', {
        url: '/auth',
        views: {
          top: {
            controller: 'AuthTopCtrl as ctrl',
            templateUrl: 'auth.top.view.html'
          }
        }
      })
      .state('auth-continue', {
        url: '/auth-continue',
        views: {
          top: {
            controller: 'AuthContinueCtrl'
          }
        }
      })
      .state('auth-finish', {
        url: '/auth-finish',
        views: {
          top: {
            controller: 'AuthFinishCtrl'
          }
        }
      });
}

TrekkerStorageCfg.$inject = ['localStorageServiceProvider'];
function TrekkerStorageCfg(localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('trekker');
}

TrekkerRun.$inject = ['Auth', 'Assert', '$state', '$rootScope'];
function TrekkerRun(Auth, Assert, $state, $rootScope) {
  $rootScope.$on('$stateChangeStart', function (evt, to, params) {
    console.debug('Routing to', to);
    if (!to.name.match(/^auth(\\..+)?$/) && !Auth.isAuthd()) {
      $state.go('auth');
    }

  });
}