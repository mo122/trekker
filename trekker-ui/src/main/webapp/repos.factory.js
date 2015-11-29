Trekker.factory('Repos', Repos);

Repos.$inject = ['Auth', 'LocalCache', '$http'];

function Repos(Auth, LocalCache, $http, $q) {
  var Repos = this,
      GH_API = 'https://api.github.com',
      cache = LocalCache.of('Repos');

  Repos.list = cache.cachingPromise('list', list, true);
  Repos.cacheList = cache.cachingPromise('list', list);

  return Repos;


  function list() {
    return $http.get(URI(GH_API).path('user/repos'), {
      headers: {
        Authorization: 'token ' + Auth.ghAccessToken
      }
    }).then(function (response) {
      return response.data;
    });
  }
}