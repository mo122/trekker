Trekker.controller('AuthTopCtrl', AuthTopCtrl);

AuthTopCtrl.$inject = ['Auth'];

function AuthTopCtrl(Auth) {
  var vm = this;

  vm.startAuthFlow = Auth.startAuthFlow;
}