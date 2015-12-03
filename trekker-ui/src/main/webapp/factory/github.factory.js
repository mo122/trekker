Trekker.factory('GitHub', GitHub);

GitHub.$inject = ['Auth', '$http'];

function GitHub(Auth, $http) {
  var GitHub = this,
      GH_API = 'https://api.github.com';

  GitHub.get = get;

  return GitHub;


  function get(path, options) {
    options = options || {};
    authify(options);

    return $http.get(URI(GH_API).path(path), options)
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