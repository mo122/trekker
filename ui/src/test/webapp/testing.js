_test_results = [];

function test(description, testFunc) {
  try {
    if (testFunc()) {
      _test_results.push({
        outcome: 'pass',
        message: 'Passed assertion: ' + description
      });
    } else {
      _test_results.push({
        outcome: 'fail',
        message: 'Failed assertion: ' + description
      });
    }
  } catch (e) {
    _test_results.push({
      outcome: 'fail',
      exception: e,
      message: 'Failed assertion with exception: ' + description
    });
  }
}

function test_results() {
  var resultsDiv = document.createElement("div");
  resultsDiv.id = 'test-results';
  for (var i = 0; i < _test_results.length; i++) {
    var test_result = _test_results[i];
    var resultDiv = document.createElement('div');
    if (test_result.outcome === 'pass') {

    } else if (test_result.outcome === 'fail') {

    }
  }
  document.body.appendChild(resultsDiv);
}