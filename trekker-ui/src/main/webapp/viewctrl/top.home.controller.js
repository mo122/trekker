Trekker.controller('TopHomeCtrl', TopHomeCtrl);

TopHomeCtrl.$inject = ['Tasks'];

function TopHomeCtrl(Tasks) {
  var vm = this;

  vm.tasks = Tasks.list();
}