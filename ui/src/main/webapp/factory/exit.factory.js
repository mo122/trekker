Trekker.factory('Exit', Exit);

Exit.$inject = [];

function Exit() {
  var Exit = this,
      callbacks = [];

  Exit.registerCallback = registerCallback;

  window.onbeforeunload = onBeforeUnload;

  return Exit;


  function registerCallback(fn) {
    callbacks.push(fn);
  }

  function onBeforeUnload() {
    _.each(callbacks, function (fn) {
      fn();
    });
  }
}