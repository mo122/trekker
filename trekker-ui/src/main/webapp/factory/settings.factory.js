Trekker.factory('Settings', Settings);

Settings.$inject = ['localStorageService', '$rootScope'];

function Settings(localStorageService, $rootScope) {
  var Settings = this;

  localStorageService.bind($rootScope, 'settings');
  if (!$rootScope.settings) {
    $rootScope.settings = {

      cacheDuration: 1000 * 60 * 5 // defaults to 5 minutes

    };
  }

  return Settings;
}