Trekker.factory('Tasks', Tasks);

Tasks.$inject = ['GitHub', 'LocalCache'];

function Tasks(GitHub, LocalCache) {
  var Tasks = this,
      cache = LocalCache.of('Tasks');

  Tasks.search = cache.cachingPromise('search', search, true);
  Tasks.cacheSearch = cache.cachingPromise('search', search);

  return Tasks;


  /**
   * https://developer.github.com/v3/search/#search-issues
   *
   * @param q {String} query
   * @param [sort] {String} comments | created | updated
   * @param [order] {String} desc | asc
   * @returns {GitHubIssue[]}
   */
  function search(q, sort, order) {
    var uri = URI('search/issues').addQuery('q', q);
    if (sort) {
      uri.addQuery('sort', sort);
    }
    if (order) {
      uri.addQuery('order', order);
    }
    return GitHub.get(uri);
  }

}