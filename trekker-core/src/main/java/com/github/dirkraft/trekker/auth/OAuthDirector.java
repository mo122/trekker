package com.github.dirkraft.trekker.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.dirkraft.trekker.web.Requests;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.joda.time.DateTime;
import spark.Request;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Optional;

import static spark.Spark.get;

public class OAuthDirector {

  static final Mac MAC;

  static {
    try {
      // These are the bytes that would be externalized if we need synchronized OAuth director instances.
      byte[] keyBytes = new byte[2048];
      SecureRandom secureRandom = SecureRandom.getInstanceStrong();
      secureRandom.setSeed(0);
      secureRandom.nextBytes(keyBytes);
      SecretKey key = new SecretKeySpec(keyBytes, "HmacSHA1");
      MAC = Mac.getInstance("HmacSHA1");
      MAC.init(key);
    } catch (NoSuchAlgorithmException | InvalidKeyException e) {
      throw new RuntimeException(e);
    }
  }

  static final String CLIENT_ID = System.getProperty("trekker.clientId");
  static final String CLIENT_SECRET = System.getProperty("trekker.clientSecret");

  static final ObjectMapper MAPPER = new ObjectMapper();
  static final HttpClient HTTP = HttpClientBuilder.create().build();

  static String encodeHmacState(State state) throws JsonProcessingException {
    return new String(Base64.encodeBase64(MAC.doFinal(MAPPER.writeValueAsBytes(state))));
  }

  public static void main(String[] args) {

    get("/auth", (request, response) -> {

      Optional<String> missing = Requests.missingParams(request, "flowId", "flowStartTime", "redirectAuthCodeTo");
      if (missing.isPresent()) {
        response.status(400);
        return missing.get();
      }

      State state = new State(request);
      if (DateTime.parse(state.flowStartTime).isBefore(DateTime.now().minusMinutes(15))) {
        response.status(401);
        return "This authorization flow started too long ago. Start a new one.";
      }

      // Create impenetrable state.
      URI uri = new URIBuilder("https://github.com/login/oauth/authorize")
        .addParameter("client_id", CLIENT_ID)
        .addParameter("state", encodeHmacState(state))
        .addParameter("redirect_uri", request.queryParams("redirectAuthCodeTo"))
        .build();

      response.redirect(uri.toString());
      return null;
    }, MAPPER::writeValueAsString);

    get("/auth-callback", (request, response) -> {

      Optional<String> missing = Requests.missingParams(request,
        "flowId", "flowStartTime", "originalState", "ghCode", "redirectAccessTokenTo");
      if (missing.isPresent()) {
        response.status(400);
        return missing.get();
      }

      State state = new State(request);
      if (DateTime.parse(state.flowStartTime).isBefore(DateTime.now().minusMinutes(15))) {
        response.status(401);
        return "This authorization flow started too long ago. Start a new one.";
      }

      // Check state integrity.
      String originalState = request.queryParams("originalState");
      if (!originalState.equals(encodeHmacState(state))) {
        response.status(401);
        return "Original state did not match the requisite client attributes. Is this a (failed) forgery?";
      }

      // Exchange GitHub code for an access token
      String ghCode = request.queryParams("ghCode");
      URI uri = new URIBuilder("https://github.com/login/oauth/access_token")
        .addParameter("client_id", CLIENT_ID)
        .addParameter("client_secret", CLIENT_SECRET)
        .addParameter("code", ghCode)
        .addParameter("state", originalState)
        .build();

      HttpPost ghAccessTokenRequest = new HttpPost(uri);
      ghAccessTokenRequest.addHeader(HttpHeaders.ACCEPT, ContentType.APPLICATION_JSON.getMimeType());
      HttpResponse ghResponse = HTTP.execute(ghAccessTokenRequest);
      String accessToken;
      try {
        JsonNode json = MAPPER.readTree(ghResponse.getEntity().getContent());
        accessToken = json.get("access_token").textValue();
      } finally {
        EntityUtils.consumeQuietly(ghResponse.getEntity());
      }

      // Redirect app to its own specific handler
      URI appRedirectAccessTokenTo = new URIBuilder(request.queryParams("redirectAccessTokenTo"))
        .addParameter("ghAccessToken", accessToken)
        .build();
      response.redirect(appRedirectAccessTokenTo.toString());
      return null;

    }, MAPPER::writeValueAsString);

  }

  static class State {

    public String flowId;
    public String flowStartTime;

    // for Jackson
    State() {}

    public State(Request request) {
      flowId = request.queryParams("flowId");
      flowStartTime = request.queryParams("flowStartTime");
    }

  }
}
