Trekker.controller('TopSettingsCtrl', TopSettingsCtrl);

TopSettingsCtrl.$inject = ['Repos', 'Settings'];

function TopSettingsCtrl(Repos, Settings) {
  var vm = this;

  vm.reposByOwner = {};

  vm.repoIsActive = repoIsActive;
  vm.toggleRepo = toggleRepo;

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
   * @param repo {Object}
   * @returns {Boolean} whether or not the repo is activated with Trekker
   */
  function repoIsActive(repo) {
    return Settings.settings.repos[repo.full_name];
  }

  function toggleRepo(repo) {
    Settings.settings.repos[repo.full_name] = !Settings.settings.repos[repo.full_name];
  }
}