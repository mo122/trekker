(function () {

  Trekker.factory('Assert', Assert);

  Assert.$inject = [];

  function Assert() {
    var Assert = this;

    Assert.hope = hope;
    Assert.unimplemented = unimplemented;

    return Assert;


    /**
     * @param {boolean} condition which must be satisfied
     * @param {string} assumptionFmt assumption in english as a sprintf string
     * @param {...Object} [arguments] message format arguments
     * @throws when `condition` is false
     */
    function hope(condition, assumptionFmt) {
      if (!condition) {
        var args = Array.from(arguments);
        args.shift();
        args.shift();
        throw sprintf('Assumption failed: ' + assumptionFmt, args);
      }
    }

    /**
     * @param {string} noticeFmt assumption in english as a sprintf string
     * @param {...Object} [arguments] message format arguments
     * @throws always because this code is unimplemented
     */
    function unimplemented(noticeFmt) {
      var args = Array.from(arguments);
      args.shift();
      args.shift();
      throw sprintf('Unimplemented: ' + noticeFmt, args);
    }
  }

}());
