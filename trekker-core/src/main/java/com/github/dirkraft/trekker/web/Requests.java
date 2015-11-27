package com.github.dirkraft.trekker.web;

import com.google.common.base.Joiner;
import spark.Request;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class Requests {

  public static Optional<String> missingParams(Request request, String... paramNames) {
    List<String> missingParamNames = new ArrayList<>();
    Set<String> queryParams = request.queryParams();
    for (String paramName : paramNames) {
      if (!queryParams.contains(paramName)) {
        missingParamNames.add(paramName);
      }
    }

    if (missingParamNames.isEmpty()) {
      return Optional.empty();
    } else {
      return Optional.of("Require parameters missing: " + Joiner.on(", ").join(missingParamNames));
    }
  }
}
