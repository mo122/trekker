Trekker.factory('Repos', Repos);

Repos.$inject = ['LocalCache', 'GitHub'];

function Repos(LocalCache, GitHub) {
  var Repos = this,
      cache = LocalCache.of('Repos');

  Repos.list = cache.cachingPromise('list', list, true);
  Repos.cacheList = cache.cachingPromise('list', list);

  return Repos;


  function list() {
    return GitHub.get('user/repos');
  }
}