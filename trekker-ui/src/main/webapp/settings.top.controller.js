Trekker.controller('SettingsTopCtrl', SettingsTopCtrl);

SettingsTopCtrl.$inject = ['Repos', 'Error'];

function SettingsTopCtrl(Repos, Error) {
  var vm = this;

  vm.repos = [];
  Repos.cacheList().then(function (repos) {
    vm.repos = repos;
  }, Error.generic);
}