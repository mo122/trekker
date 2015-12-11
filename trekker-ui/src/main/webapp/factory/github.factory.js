Trekker.factory('GitHub', GitHub);

GitHub.$inject = ['Const', 'Auth', '$http', '$q'];

function GitHub(Const, Auth, $http, $q) {
  var GitHub = this;

  GitHub.scopes = scopes;
  GitHub.get = get;
  GitHub.getAll = getAll;
  GitHub.parseLinkHeader = parseLinkHeader;

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
   * @returns {Promise<*>}
   */
  function get(path, options) {
    authify(options || {});

    return $http.get(URI(Const.GH_API).path(path), options)
        .then(data, handleGeneralErrors);
  }

  /**
   * For paged resources, those that return a Link header, retrieves all pages before returning a single concatenated
   * response.
   *
   * @param {String} path http request path
   * @param {{}} [options] http request options
   * @param {Function} [aggregator] function(currentAggregate, pageResponse) {returns nextAggregate}
   * @returns {Promise<*[]>}
   */
  function getAll(path, options, aggregator) {
    options = authify(options || {});
    aggregator = aggregator || function (aggregate, data) {return aggregate.concat(data)};
    var deferred = $q.defer(),
        href = URI(Const.GH_API).path(path),
        aggregation = [];

    nextPage();

    return deferred.promise;

    function nextPage() {
      $http.get(href, options)
          .then(function (response) {
            aggregation = aggregator(aggregation, response.data);
            var links = parseLinkHeader(response);
            if (links && links.next) {
              href = links.next.href;
              nextPage();
            } else {
              deferred.resolve(aggregation);
            }
          }, function (error) {
            deferred.reject(error);
          });
    }
  }

  /**
   * @param {GitHubResponse} response
   * @returns { {rel: { href: String, rel: String, attrs...: * } }[] }
   */
  function parseLinkHeader(response) {
    var header = response.headers('Link');
    if (!header) {
      return {};
    }

    var links = {},
        tags = header.split(',');
    _.each(tags, function (tag) {
      var line = tag.split('; '),
      // <http://thing.in.here...>
          link = {href: line[0].substr(1, line[0].length - 2)};
      // Mash in all the attributes
      for (var i = 1; i < line.length; i++) {
        var attrVal = line[i].split('=', 2),
            name = attrVal[0],
        // Strip quotes around value. Name is not quoted.
            val = attrVal[1].substr(1, attrVal[1].length - 2);

        link[name] = val;
        // Map to the parse link line by 'rel' value
        if ('rel' == attrVal[0]) {
          links[val] = link;
        }
      }
    });
    return links;
  }

  function authify(options) {
    options.headers = options.headers || {};
    options.headers['Authorization'] = 'token ' + Auth.ghAccessToken;
    return options;
  }

  function data(response) {
    return response.data;
  }

  function handleGeneralErrors(error) {
    return error;
  }
}