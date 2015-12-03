Trekker.factory('Users', Users);

Users.$inject = [];

function Users() {
  var Users = this,
      GH_API = 'https://api.github.com',
      cache = LocalCache.of('Users');

  Users.current = cache.cachingPromise('current', current, true);

  return Users;


  function current() {
    return $http.get(URI(GH_API).path('user'));
  }
}