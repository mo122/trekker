Trekker.controller('TopHomeCtrl', TopHomeCtrl);

TopHomeCtrl.$inject = ['Tasks', 'Users', 'Repos', 'Settings', '$q'];

function TopHomeCtrl(Tasks, Users, Repos, Settings, $q) {
  var vm = this;

  vm.prefs = Settings.settings.viewPrefs.top_home;
  vm.user = null; // Init falsey until loaded
  vm.repos = [];
  vm.repo = null; // Init falsey until loaded
  vm.fireTasks = [];
  vm.myTasks = [];
  vm.myTasksOrder = {sort: 'updated', order: 'desc'};
  vm.watchTasks = [];
  vm.watchTasksOrder = {sort: 'updated', order: 'desc'};

  vm.selectedRepoChanged = selectedRepoChanged;

  loadUserAndRepo()
      .then(loadTasks);


  function loadUserAndRepo() {
    return $q.all([
      Users.cacheCurrent(),
      Repos.cacheList()
    ]).then(function (results) {
      vm.user = results[0];
      vm.repos = _.filter(results[1], function (repo) {
        // Only show those enabled in Settings
        return Settings.settings.repos[repo.full_name];
      });

      if (vm.prefs.lastSelectedRepo) {
        vm.repo = _.first(_.filter(vm.repos, 'full_name', vm.prefs.lastSelectedRepo));
      }

      if (!vm.repo && vm.repos.length > 0) {
        // Pick the first one?
        vm.repo = vm.repos[0];
      }
    });
  }

  function loadTasks() {
    if (vm.user && vm.repo) {
      search(sprintf('repo:%s is:open is:issue label:fire', vm.repo.full_name), 'created', 'asc')
          .then(bind(vm, 'fireTasks', 'items'));
      search(sprintf('repo:%s is:open is:issue assignee:%s', vm.repo.full_name, vm.user.login),
          vm.myTasksOrder.sort, vm.myTasksOrder.order)
          .then(bind(vm, 'myTasks', 'items'));
      search(sprintf('repo:%s is:open is:issue involves:%s', vm.repo.full_name, vm.user.login),
          vm.watchTasksOrder.sort, vm.watchTasksOrder.order)
          .then(bind(vm, 'watchTasks', 'items'));
    }
  }

  function selectedRepoChanged() {

    // Update preferences
    vm.prefs.lastSelectedRepo = vm.repo.full_name;

    loadUserAndRepo()
        .then(loadTasks());

  }

  /**
   * Invokes appropriate search function based on vm.prefs.alwaysRefresh
   */
  function search() {
    var searchFn = vm.prefs.alwaysRefresh ? Tasks.search : Tasks.cacheSearch;
    return searchFn.apply(null, arguments);
  }
}