function bind(vm, prop) {
  return function (val) {
    vm[prop] = val;
  }
}