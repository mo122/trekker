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
   * @param q {String}
   * @returns {GitHubIssue[]}
   */
  function search(q) {
    return GitHub.get(URI('search/issues').addQuery('q', q));
  }

}