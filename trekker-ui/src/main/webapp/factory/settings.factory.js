Trekker.factory('Settings', Settings);

Settings.$inject = ['Exit', 'localStorageService', '$rootScope'];

function Settings(Exit, localStorageService, $rootScope) {
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
         * GitHub scopes desired by the user.
         * @type {Array<String>}
         */
        scopes: [],

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

  // If the settings are modified but navigation occurs immediately, the bind will never have a digest cycle.
  Exit.registerCallback(flushSettings);

  return Settings;


  function flushSettings() {
    localStorageService.set('settings', Settings.settings);
    console.log('Immediate settings flush due to navigation.');
  }
}