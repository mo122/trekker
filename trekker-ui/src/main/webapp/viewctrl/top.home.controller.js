Trekker.controller('TopHomeCtrl', TopHomeCtrl);

TopHomeCtrl.$inject = ['Tasks', 'Settings'];

function TopHomeCtrl(Tasks, Settings) {
  var vm = this;

  vm.fireTasks = [];

  vm.orgRepo = _.keys(_.pick(Settings.settings.repos, _.identity))[0]; // TODO placeholder

  Tasks.search(sprintf('repo:%s is:open label:fire', vm.orgRepo)).then(function (data) {
    vm.fireTasks = data.items;
  });
}