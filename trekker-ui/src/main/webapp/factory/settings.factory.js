Trekker.factory('Settings', Settings);

Settings.$inject = ['localStorageService', '$rootScope'];

function Settings(localStorageService, $rootScope) {
  var Settings = this,
      defaults = {

        /**
         * LocalCache settings and so conforms to the configuration format of LocalCache.
         * @type {Object}
         */
        localCache: {

          expiration: 1000 * 60 * 5

        },

        /**
         * Repositories activated with Trekker. Keys are GitHub full names such as "organization/repository"
         * @type {Object<String, Boolean>}
         */
        repos: {}

      };

  // Load any saved settings and bind the object to a scope to automatically persist changes.
  localStorageService.bind($rootScope, 'settings', {});

  // Also make available on the service.
  Settings.settings = $rootScope.settings;

  _.each(defaults, function (v, k) {
    if (typeof Settings.settings[k] === 'undefined') {
      Settings.settings[k] = v;
    }
  });


  return Settings;
}