Trekker.factory('Tasks', Tasks);

Tasks.$inject = ['LocalCache', '$http'];

function Tasks(LocalCache, $http) {
  var Tasks = this,
      GH_API = 'https://api.github.com',
      cache = LocalCache.of('Tasks');

  Tasks.list = cache.cachingPromise('list', list, true);
  Tasks.cacheList = cache.cachingPromise('list', list);

  return Tasks;


  function list() {
    return $http.get(URI(GH_API).path('user/repos'));
  }
}