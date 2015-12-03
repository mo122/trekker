Trekker.factory('Error', Error);

Error.$inject = ['Assert'];

function Error(Assert) {
  var Error = this;

  Error.noGitHubAuth = gitHubAuthUnavailable;
  Error.authFlowSegmentation = authFlowSegmentation;

  return Error;


  function generic() {
    var args = Array.prototype.slice.call(arguments);
    if (args) {
      throw 'Error. ' + args;
    } else {
      throw 'Error. I cannot tell you anything.';
    }
  }

  /**
   * GitHub authentication is not available. User should be directed to appropriate auth flow.
   */
  function gitHubAuthUnavailable() {
    Assert.unimplemented('Redirect user somewhere they can resolve this.');
  }

  /**
   * Auth flow was started but some precondition along the way failed. User may be directed
   * to retry authorization.
   */
  function authFlowSegmentation(cause) {
    Assert.unimplemented('What do we do if the auth flow segments (cannot continue to completion). Cause: ' + cause);
  }
}