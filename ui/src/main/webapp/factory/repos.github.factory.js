Trekker.factory('Repos', Repos);

Repos.$inject = ['LocalCache', 'GitHub'];

function Repos(LocalCache, GitHub) {
  var Repos = this,
      cache = LocalCache.of('Repos');

  Repos.get = cache.cachingPromise('get', get, true);
  Repos.cacheGet = cache.cachingPromise('get', get);
  Repos.list = cache.cachingPromise('list', list, true);
  Repos.cacheList = cache.cachingPromise('list', list);

  return Repos;


  /**
   * @param org {String} organization name or organization/repo (will be detected)
   * @param [repo] {String} repository name, assuming the first arg was not already the combined org/repo form
   */
  function get(org, repo) {
    return GitHub.get('repos/' + (org.indexOf('/') > 0 ? org : org + '/' + repo));
  }

  function list() {
    return GitHub.getAll('user/repos');
  }
}