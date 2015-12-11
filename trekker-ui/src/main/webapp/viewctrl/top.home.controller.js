Trekker.controller('TopHomeCtrl', TopHomeCtrl);

TopHomeCtrl.$inject = ['Tasks', 'Users', 'Settings'];

function TopHomeCtrl(Tasks, Users, Settings) {
  var vm = this;

  vm.prefs = Settings.settings.viewPrefs.top_home;
  vm.user = {};
  vm.fireTasks = [];
  vm.myTasks = [];
  vm.watchTasks = [];

  vm.orgRepo = _.keys(_.pick(Settings.settings.repos, _.identity))[0]; // TODO placeholder

  search(sprintf('repo:%s is:open label:fire', vm.orgRepo))
      .then(bind(vm, 'fireTasks', 'items'));

  Users.cacheCurrent().then(function (user) {
    vm.user = user;

    search(sprintf('repo:%s is:open assignee:%s', vm.orgRepo, user.login))
        .then(bind(vm, 'myTasks', 'items'));
    search(sprintf('repo:%s is:open involves:%s', vm.orgRepo, user.login))
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