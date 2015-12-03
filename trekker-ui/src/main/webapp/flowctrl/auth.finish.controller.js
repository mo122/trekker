Trekker.controller('AuthFinishCtrl', AuthFinishCtrl);

AuthFinishCtrl.$inject = ['Assert', 'Auth', '$state'];

function AuthFinishCtrl(Assert, Auth, $state) {
  var vm = this;

  var query = URI.parseQuery(window.location.search);
  var ghAccessToken = query.ghAccessToken;
  Assert.hope(ghAccessToken, 'Failed to be passed GitHub access token.');
  Auth.receiveAccessToken(ghAccessToken);
  var location = URI(window.location);
  location.query("");
  location.hash("");
  window.location = location + $state.href('top_home');
}