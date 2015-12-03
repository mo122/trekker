Trekker.controller('TopSettingsCtrl', TopSettingsCtrl);

TopSettingsCtrl.$inject = ['Repos', 'Error'];

function TopSettingsCtrl(Repos, Error) {
  var vm = this;

  vm.repos = [];
  Repos.cacheList().then(function (repos) {
    vm.repos = repos;
  });
}