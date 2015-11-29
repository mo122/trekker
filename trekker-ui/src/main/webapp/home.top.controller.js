Trekker.controller('HomeTopCtrl', HomeTopCtrl);

HomeTopCtrl.$inject = ['Tasks'];

function HomeTopCtrl(Task) {
  var vm = this;

  vm.tasks = Task.list();
}