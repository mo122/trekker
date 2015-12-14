/**
 * Concisely binds resolved promises to properties.
 * <pre>
 *   var vm = {};
 *   thingThatReturnsPromise.then(bind(vm, 'dest', 'color'));
 *   // is equivalent to
 *   thingThatReturnsPromise.then(function(result) {
 *     vm.dest = result.color;
 *     return result; // for additional chaining
 *   });
 * </pre>
 *
 * @param vm {*}
 * @param vmProp {String} property of vm to bind to
 * @param [valProp] {String} if given, binds a property of the resolved val instead of the entire val
 * @returns {Function} which binds the first argument to vm[vmProp]
 */
function bind(vm, vmProp, valProp) {
  return function (val) {
    vm[vmProp] = valProp ? val[valProp] : val;
    return val;
  }
}