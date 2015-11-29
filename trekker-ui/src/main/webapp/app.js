Trekker = angular.module('Trekker', ['ngResource', 'ngMaterial', 'ui.router', 'LocalStorageModule', 'sprintf',
      'com.github.dirkraft.JsLocalCache'])
    .config(TrekkerRouteCfg)
    .config(TrekkerStorageCfg)
    .run(TrekkerRun);

TrekkerRouteCfg.$inject = ['$urlRouterProvider', '$stateProvider'];
function TrekkerRouteCfg($urlRouterProvider, $stateProvider) {
  $urlRouterProvider
      .when('', '/home')
      .otherwise('/home');
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
      })
      .state('home', {
        url: '/home',
        views: {
          top: {
            controller: 'HomeTopCtrl as ctrl',
            templateUrl: 'home.top.view.html'
          }
        }
      })
      .state('settings', {
        url: '/settings',
        views: {
          top: {
            controller: 'SettingsTopCtrl as ctrl',
            templateUrl: 'settings.top.view.html'
          }
        }
      });
}

TrekkerStorageCfg.$inject = ['localStorageServiceProvider', '$sceDelegateProvider'];
function TrekkerStorageCfg(localStorageServiceProvider, $sceDelegateProvider) {
  localStorageServiceProvider.setPrefix('trekker');
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://avatars.githubusercontent.com/u/**'
  ]);
}

TrekkerRun.$inject = ['Auth', 'LocalCache', 'Settings', '$state', '$rootScope'];
function TrekkerRun(Auth, LocalCache, Settings, $state, $rootScope) {

  $rootScope.$on('$stateChangeStart', function (evt, to, params) {
    console.debug('Routing to', to);
    if (!to.name.match(/^auth.*$/) && !Auth.isAuthd()) {
      evt.preventDefault();
      $state.go('auth');
    }

  });
}