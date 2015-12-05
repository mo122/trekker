Trekker.factory('GitHub', GitHub);

GitHub.$inject = ['Const', 'Auth', '$http'];

function GitHub(Const, Auth, $http) {
  var GitHub = this;

  GitHub.scopes = scopes;
  GitHub.get = get;

  return GitHub;


  function scopes() {
    var options = {};
    authify(options);
    return $http.get(URI(Const.GH_API), options)
        .then(function (response) {
          return _.filter(response.headers('X-OAuth-Scopes').split(', '));
        });
  }

  /**
   * @param {String} path
   * @param {{}} [options]
   * @returns {*}
   */
  function get(path, options) {
    options = options || {};
    authify(options);

    return $http.get(URI(Const.GH_API).path(path), options)
        .then(data, handleGeneralErrors);
  }

  function authify(options) {
    options.headers = options.headers || {};
    options.headers['Authorization'] = 'token ' + Auth.ghAccessToken;
  }

  function data(response) {
    return response.data;
  }

  function handleGeneralErrors(error) {
    return error;
  }
}