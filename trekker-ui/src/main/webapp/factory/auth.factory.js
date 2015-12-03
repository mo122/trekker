Trekker.factory('Auth', Auth);

Auth.$inject = ['Assert', 'Error', 'localStorageService', '$http', '$state'];

function Auth(Assert, Error, localStorageService, $http, $state) {
  var Auth = this;

  Auth.trekkerAuthServer = 'http://localhost:4567';
  Auth.ghAccessToken = localStorageService.get('auth.ghAccessToken');

  Auth.isAuthd = isAuthd;
  Auth.startAuthFlow = startAuthFlow;
  Auth.continueAuthFlow = continueAuthFlow;
  Auth.receiveAccessToken = receiveAccessToken;

  /*
   Auth flow:
   . Browser without working access token.
   - Ask Trekker to start Auth flow with identifying auth flow id stored in browser local storage.
   - Trekker redirect browser to GitHub with (HMAC'd data specific to the Browser)
   - GitHub redirect browser to angular view to request Trekker with (flow id, GitHub code)
   - Trekker verify (?2)
   - Trekker request access token from GitHub
   - Trekker redirect browser to angular view that sets access token
   . Browser with GitHub access
   */

  return Auth;


  /**
   * @returns {boolean} whether or not the browser has working GitHub authentication
   */
  function isAuthd() {
    return !!Auth.ghAccessToken;
  }

  function startAuthFlow() {
    console.info('Beginning new auth flow.');
    var flowId = Math.random();
    localStorageService.set('auth.flowId', flowId);
    var flowStartTime = moment().toISOString();
    localStorageService.set('auth.flowStartTime', flowStartTime);

    // $state.href(..., ..., {absolute: true}) doesn't actually work. URLs are not really absolute.
    var location = URI(window.location);
    location.query("");
    location.hash("");
    var redirectAuthCodeTo = location + $state.href('auth_continue');
    window.location = URI(Auth.trekkerAuthServer).path('auth').search({
      flowId: flowId,
      flowStartTime: flowStartTime,
      redirectAuthCodeTo: redirectAuthCodeTo
    });
  }

  function continueAuthFlow(state, ghCode) {
    console.info('Received code from GitHub. Passing along to auth server.');
    var flowId = localStorageService.get('auth.flowId');
    Assert.hope(flowId, 'Flow id should have been saved to local storage.');
    var flowStartTime = localStorageService.get('auth.flowStartTime');
    Assert.hope(flowStartTime, 'Flow start time should have been saved to local storage.');

    if (moment(flowStartTime).isBefore(moment().subtract(15, 'minutes'))) {
      Error.authFlowSegmentation('Flow start time is too old. Started at ' + flowStartTime);
    }

    // This is nice opposed to async because we don't have to worry about CORS.
    // $state.href(..., ..., {absolute: true}) doesn't actually work. URLs are not really absolute.
    var location = URI(window.location);
    location.query("");
    location.hash("");
    var redirectAccessTokenTo = location + $state.href('auth_finish');
    window.location = URI(Auth.trekkerAuthServer).path('auth-callback').search({
      flowId: flowId,
      flowStartTime: flowStartTime,
      originalState: state,
      ghCode: ghCode,
      redirectAccessTokenTo: redirectAccessTokenTo
    });
  }

  function receiveAccessToken(ghAccessToken) {
    console.info('Retrieved fresh access token!');
    Auth.ghAccessToken = ghAccessToken;
    localStorageService.set('auth.ghAccessToken', ghAccessToken);
  }

}