Trekker = angular.module('Trekker', ['ngResource', 'ngMaterial', 'ui.router', 'LocalStorageModule', 'sprintf',
      'com.github.dirkraft.JsLocalCache'])
    .config(TrekkerRouteCfg)
    .config(TrekkerStorageCfg)
    .run(TrekkerLocalCacheRun)
    .run(TrekkerRun);

TrekkerRouteCfg.$inject = ['$urlRouterProvider', '$stateProvider'];
function TrekkerRouteCfg($urlRouterProvider, $stateProvider) {

  $urlRouterProvider
      .when('', '/home')
      .otherwise('/home');

  $stateProvider
      .state('top_auth', {
        url: '/auth',
        views: {
          top: {
            controller: 'TopAuthCtrl',
            controllerAs: 'vm',
            templateUrl: 'viewctrl/top.auth.view.html'
          }
        }
      })
      .state('top_home', {
        url: '/home',
        views: {
          top: {
            controller: 'TopHomeCtrl',
            controllerAs: 'vm',
            templateUrl: 'viewctrl/top.home.view.html'
          }
        }
      })
      .state('top_settings', {
        url: '/settings',
        views: {
          top: {
            controller: 'TopSettingsCtrl',
            controllerAs: 'vm',
            templateUrl: 'viewctrl/top.settings.view.html'
          }
        }
      })
      .state('dialog_auth-no-good', {
        views: {
          dialog: {
            controller: 'DialogAuthNoGoodCtrl',
            controllerAs: 'vm',
            templateUrl: 'viewctrl/dialog.auth-no-good.view.html'
          }
        }
      })
      .state('auth_continue', {
        url: '/auth-continue',
        views: {
          top: {
            controller: 'AuthContinueCtrl'
          }
        }
      })
      .state('auth_finish', {
        url: '/auth-finish',
        views: {
          top: {
            controller: 'AuthFinishCtrl'
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

TrekkerLocalCacheRun.$inject = ['LocalCache', 'Settings'];
function TrekkerLocalCacheRun(LocalCache, Settings) {

  // First apply any LocalCache config to our saved Settings that is not specified there.
  _.each(LocalCache.config, function (v, k) {
    if (typeof Settings.settings.localCache[k] === 'undefined') {
      Settings.settings.localCache[k] = v;
    }
  });
  // Then replace the LocalCache config with the instance in our settings, which is scoped and watched for updates.
  LocalCache.config = Settings.settings.localCache;
}

TrekkerRun.$inject = ['Auth', '$state', '$rootScope'];
function TrekkerRun(Auth, $state, $rootScope) {

  $rootScope.$on('$stateChangeStart', function (evt, to, params) {
    console.debug('Routing to', to);
    if (!to.name.match(/^auth.*$/) && !Auth.isAuthd()) {
      evt.preventDefault();
      $state.go('top_auth');
    }

  });
}