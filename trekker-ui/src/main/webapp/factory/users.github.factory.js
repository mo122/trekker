Trekker.factory('Users', Users);

Users.$inject = ['GitHub', 'LocalCache'];

function Users(GitHub, LocalCache) {
  var Users = this,
      cache = LocalCache.of('Users');

  Users.current = cache.cachingPromise('current', current, true);
  Users.cacheCurrent =  cache.cachingPromise('current', current);

  return Users;


  function current() {
    return GitHub.get('user');
  }
}