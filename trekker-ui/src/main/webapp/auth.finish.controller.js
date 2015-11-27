Trekker.controller('AuthFinishCtrl', AuthFinishCtrl);

AuthFinishCtrl.$inject = ['Assert', 'Auth'];

function AuthFinishCtrl(Assert, Auth) {
  var vm = this;

  var query = URI.parseQuery(window.location.search);
  var ghAccessToken = query.ghAccessToken;
  Assert.hope(ghAccessToken, 'Failed to be passed GitHub access token.');
  Auth.receiveAccessToken(ghAccessToken);
}