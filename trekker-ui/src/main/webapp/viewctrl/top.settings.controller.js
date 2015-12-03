Trekker.controller('TopSettingsCtrl', TopSettingsCtrl);

TopSettingsCtrl.$inject = ['Repos', 'Error'];

function TopSettingsCtrl(Repos, Error) {
  var vm = this;

  vm.reposByOwner = {};
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
}