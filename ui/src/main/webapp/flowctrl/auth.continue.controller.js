Trekker.controller('AuthContinueCtrl', AuthContinueCtrl);

AuthContinueCtrl.$inject = ['Assert', 'Auth'];

function AuthContinueCtrl(Assert, Auth) {
  var vm = this;

  var query = URI.parseQuery(window.location.search);
  var state = query.state;
  Assert.hope(state, 'Failed to be passed original state from GitHub.');
  var ghCode = query.code;
  Assert.hope(ghCode, 'Failed to receive GitHub auth code!');

  Auth.continueAuthFlow(state, ghCode)
      .then(function () {
        console.info('Successfully authenticated with GitHub.');
        Assert.unimplemented('Redirect to authd landing or original destination.')
      }, function () {
        Assert.unimplemented('Handle GitHub auth failure');
      });

}