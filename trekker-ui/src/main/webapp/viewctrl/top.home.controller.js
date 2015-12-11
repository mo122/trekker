Trekker.controller('TopHomeCtrl', TopHomeCtrl);

TopHomeCtrl.$inject = ['Tasks', 'Users', 'Repos', 'Settings', '$q'];

function TopHomeCtrl(Tasks, Users, Repos, Settings, $q) {
  var vm = this;

  vm.prefs = Settings.settings.viewPrefs.top_home;
  vm.user = {};
  vm.repo = {};
  vm.fireTasks = [];
  vm.myTasks = [];
  vm.myTasksOrder = {sort: 'updated', order: 'desc'};
  vm.watchTasks = [];
  vm.watchTasksOrder = {sort: 'updated', order: 'desc'};


  $q.all([
    Users.cacheCurrent(),
    Repos.cacheGet(_.keys(_.pick(Settings.settings.repos, _.identity))[0]) // TODO placeholder

  ]).then(function (results) {
    vm.user = results[0];
    vm.repo = results[1];

    search(sprintf('repo:%s is:open is:issue label:fire', vm.repo.full_name), 'created', 'asc')
        .then(bind(vm, 'fireTasks', 'items'));
    search(sprintf('repo:%s is:open is:issue assignee:%s', vm.repo.full_name, vm.user.login),
        vm.myTasksOrder.sort, vm.myTasksOrder.order)
        .then(bind(vm, 'myTasks', 'items'));
    search(sprintf('repo:%s is:open is:issue involves:%s', vm.repo.full_name, vm.user.login),
        vm.watchTasksOrder.sort, vm.watchTasksOrder.order)
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