Trekker.controller('TopSettingsCtrl', TopSettingsCtrl);

TopSettingsCtrl.$inject = ['Repos', 'GitHub', 'Settings', 'Auth', 'LocalCache'];

function TopSettingsCtrl(Repos, GitHub, Settings, Auth, LocalCache) {
  var vm = this,
      scopeDiffClasses = {
        // isCurrent
        true: {
          // isDesired
          true: 'trk-active',
          // !isDesired
          false: 'trk-remove'
        },
        // !isCurrent
        false: {
          // isDesired
          true: 'trk-add',
          // !isDesired
          false: ''
        }
      };

  /**
   * @type {Object<String, Array<Object>>}
   */
  vm.reposByOwner = {};
  /**
   * @type {Array<String>}
   */
  vm.desiredScopes = [];
  /**
   * @type {Array<String>}
   */
  vm.currentScopes = null;

  vm.scopeDiffClass = scopeDiffClass;
  vm.toggleDesiredScope = toggleDesiredScope;
  vm.desiredScopeDiffersFromAuth = desiredScopeDiffersFromAuth;
  vm.refreshAccessToken = refreshAccessToken;

  vm.repoIsActive = repoIsActive;
  vm.toggleRepo = toggleRepo;

  GitHub.scopes().then(function (currentScopes) {
    vm.desiredScopes = _.clone(currentScopes);
    vm.currentScopes = _.clone(currentScopes);
  });

  Repos.cacheList().then(function (repos) {
    for (var i = 0; i < repos.length; i++) {
      var repo = repos[i];
      var forOwner = vm.reposByOwner[repo.owner.login];
      if (!forOwner) {
        forOwner = vm.reposByOwner[repo.owner.login] = [];
      }
      forOwner.push(repo);
    }
  });


  /**
   * @param scope {String}
   * @return {String} CSS class which differentiates absent, applied, to be applied, to be removed
   */
  function scopeDiffClass(scope) {
    var isCurrent = _.contains(vm.currentScopes, scope),
        isDesired = _.contains(vm.desiredScopes, scope);
    return scopeDiffClasses[isCurrent][isDesired]
  }

  /**
   * @param scope {String} that should be added or removed from the desired scopes
   */
  function toggleDesiredScope(scope) {
    if (_.contains(vm.desiredScopes, scope)) {
      vm.desiredScopes = _.without(vm.desiredScopes, scope);
    } else {
      vm.desiredScopes.push(scope);
    }
  }

  /**
   * @returns {Boolean} whether or not the desired scopes equal the currently authorized scopes
   */
  function desiredScopeDiffersFromAuth() {
    return _.eq(vm.desiredScopes, vm.currentScopes);
  }

  /**
   * Updates settings desired scopes and starts a new auth flow, which should respect the new scope settings.
   */
  function refreshAccessToken() {
    Settings.settings.scopes = vm.desiredScopes;
    // Flush it all down the drain. Permission affect everything.
    LocalCache.clear();
    Auth.startAuthFlow();
  }

  /**
   * @param repo {Object}
   * @returns {Boolean} whether or not the repo is activated with Trekker
   */
  function repoIsActive(repo) {
    return Settings.settings.repos[repo.full_name];
  }

  /**
   * Enable/disable a repository with Trekker
   * @param {Object} repo
   */
  function toggleRepo(repo) {
    Settings.settings.repos[repo.full_name] = !Settings.settings.repos[repo.full_name];
  }
}