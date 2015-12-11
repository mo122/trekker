Trekker.controller('TopHomeCtrl', TopHomeCtrl);

TopHomeCtrl.$inject = ['Tasks', 'Users', 'Repos', 'Settings', '$q'];

function TopHomeCtrl(Tasks, Users, Repos, Settings, $q) {
  var vm = this;

  vm.prefs = Settings.settings.viewPrefs.top_home;
  vm.user = {};
  vm.repo = {};
  vm.fireTasks = [];
  vm.myTasks = [];
  vm.watchTasks = [];


  $q.all([
    Users.cacheCurrent(),
    Repos.cacheGet(_.keys(_.pick(Settings.settings.repos, _.identity))[0]) // TODO placeholder
  ]).then(function (results) {
    vm.user = results[0];
    vm.repo = results[1];

    search(sprintf('repo:%s is:open label:fire', vm.repo.full_name))
        .then(bind(vm, 'fireTasks', 'items'));
    search(sprintf('repo:%s is:open assignee:%s', vm.repo.full_name, vm.user.login))
        .then(bind(vm, 'myTasks', 'items'));
    search(sprintf('repo:%s is:open involves:%s', vm.repo.full_name, vm.user.login))
        .then(bind(vm, 'watchTasks', 'items'));
  });

  /**
   * Invokes appropriate search function based on vm.prefs.alwaysRefresh
   */
  function search() {
    var searchFn = vm.prefs.alwaysRefresh ? Tasks.search : Tasks.cacheSearch;
    return searchFn.apply(null, arguments);
  }
}