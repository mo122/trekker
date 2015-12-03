Trekker.controller('TopAuthCtrl', TopAuthCtrl);

TopAuthCtrl.$inject = ['Auth'];

function TopAuthCtrl(Auth) {
  var vm = this;

  vm.startAuthFlow = Auth.startAuthFlow;
}