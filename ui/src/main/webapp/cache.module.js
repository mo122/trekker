'use strict';

(function () {
  angular.module('com.github.dirkraft.JsLocalCache', []).factory('LocalCache', LocalCache);

  window.LocalCache = LocalCache;

  LocalCache.$inject = ['$q'];

  function LocalCache($q) {
    var service = {},
        GLOBAL_NAMESPACE = 'com.github.dirkraft.JsLocalCache:';

    service.config = {

      /**
       * Namespaces all the entries of this LocalCache.
       * @type {String}
       */
      prefix: '',

      /**
       * How long cached responses are kept in ms, defaults to 5 minutes
       * @type {Number}
       */
      expiration: 1000 * 60 * 60 * 24 // milliseconds
    };

    service.of = of;
    service.caching = caching;
    service.cachingPromise = cachingPromise;
    service.invalidating = invalidating;
    service.cached = cached;
    service.get = get;
    service.refresh = refresh;
    service.put = put;
    service.remove = remove;
    service.clear = clear;

    return service;


    /**
     * @param {String} realm describing the set of things cached by the returned LocalCache instance
     * @returns {LocalCache}
     */
    function of(realm) {
      var localCache = new LocalCache($q);
      // Inherit global settings.
      localCache.config.prefix = service.config.prefix + realm + ':';
      localCache.config.expiration = service.config.expiration;
      return localCache;
    }

    /**
     * @param {String} name which uniquely identifies the function given to this LocalCache
     * @param {Function} func whose result should be cached by its specific arguments
     * @param {Boolean} [refresh=false] always skips cache lookup and invokes `func`, thus refreshing the cached result
     * @returns {Function} which when invoked consults the cache (accessors)
     */
    function caching(name, func, refresh) {
      return function () {
        // Hold onto this for a possible later invocation.
        var args = Array.prototype.slice.call(arguments);
        return (refresh === true ? refresh : get)(name + JSON.stringify(args), function () {
          return func.apply(null, args);
        });
      }
    }

    /**
     * @param {String} name which uniquely identifies the function given to this LocalCache
     * @param {Function} func that returns a promise whose result should be cached by its specific arguments
     * @param {Boolean} [refresh=false] always skips cache lookup and invokes `func`, thus refreshing the cached result
     * @returns {Function} which consults the cache (accessors) during resolution of the returned promise
     */
    function cachingPromise(name, func, refresh) {
      return function () {

        var deferred = $q.defer();

        // Hold onto this for a possible later invocation.
        var args = Array.prototype.slice.call(arguments);
        var cachedValue;
        if (!refresh) {
          cachedValue = cached(name + JSON.stringify(args));
        }

        if (cachedValue) {
          // Refresh was not forced (true) and there was a cached value.
          deferred.resolve(cachedValue);

        } else {
          // Refresh was forced, or there was no cached value.
          func.apply(null, args).then(function (result) {
            put(name + JSON.stringify(args), result);
            deferred.resolve(result);
          }, deferred.reject);
        }

        return deferred.promise;
      }
    }

    /**
     *
     * @param {Function} func that when invoked invalidates all entries in this LocalCache
     * @returns {Function} which when invoked invalidates the cache (mutators)
     */
    function invalidating(func) {
      return function () {
        clear();
        var args = Array.prototype.slice.call(arguments);
        return func.apply(null, args);
      }
    }

    /**
     * @param {String} key
     * @param {*|Function} [defaultValue]
     * @returns {*}
     */
    function cached(key, defaultValue) {
      var fqKey = GLOBAL_NAMESPACE + service.config.prefix + key,
          item = _get(fqKey),
          expired; // Set to true if the item exists but is expired.

      if (item && !(expired = new Date().getTime() >= item.time + service.config.expiration)) {
        // Exists and is not expired.
        return item.value;

      } else {
        // Not exists, or is expired.
        if (expired === true) {
          localStorage.removeItem(fqKey);
        }
        // 'defaultValue' could validly be totally undefined
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      }
    }

    /**
     * @param {String} key
     * @param {*|Function} value
     * @return {*}
     */
    function get(key, value) {
      var fqKey = GLOBAL_NAMESPACE + service.config.prefix + key,
          item = _get(fqKey);

      if (item && new Date().getTime() >= item.time + service.config.expiration) {
        // Exists and is not expired.
        return item.value;

      } else {
        // Not exists, or is expired.
        var resolvedValue = value === 'function' ? value() : value;
        _put(fqKey, resolvedValue);
        return resolvedValue;
      }
    }

    /**
     * @param {String} key
     * @param {*|Function} value
     * @return {*}
     */
    function refresh(key, value) {
      var fqKey = GLOBAL_NAMESPACE + service.config.prefix + key,
          resolvedValue = value === 'function' ? value() : value;
      _put(fqKey, resolvedValue);
      return resolvedValue;
    }

    /**
     * @param {String} key
     * @param {*} value
     */
    function put(key, value) {
      var fqKey = GLOBAL_NAMESPACE + service.config.prefix + key;
      _put(fqKey, value);
    }

    /**
     * @param {String} key
     */
    function remove(key) {
      var fqKey = GLOBAL_NAMESPACE + service.config.prefix + key;
      localStorage.removeItem(fqKey);
    }

    function clear() {
      // Reverse order because indices change as things are deleted.
      var fqKeyPrefix = GLOBAL_NAMESPACE + service.config.prefix;
      for (var i = localStorage.length - 1; i >= 0; i--) {
        var key = localStorage.key(i);
        if (key.indexOf(fqKeyPrefix) == 0 /* starts with */) {
          localStorage.removeItem(key);
        }
      }
    }

    function _get(fqKey) {
      var item = localStorage.getItem(fqKey);
      return item && angular.fromJson(item) || false;
    }

    function _put(fqKey, value) {
      var item = {
        value: value,
        time: new Date().getTime()
      };
      localStorage.setItem(fqKey, angular.toJson(item));
      return item;
    }

  }

}());
