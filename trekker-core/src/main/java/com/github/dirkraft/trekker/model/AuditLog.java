package com.github.dirkraft.trekker.model;

import org.joda.time.DateTime;

public interface AuditLog extends Identifiable {

  String getKey();

  void setKey(String key);

  String getAttrs();

  void setAttrs(String attrs);

  DateTime getTime();

  void setTime(DateTime time);

  Actor getActor();

  void setActor(Actor actor);

  String getDescription();

  void setDescription(String description);
}
