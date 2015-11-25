package com.github.dirkraft.trekker.model;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

public class AuditLog implements Identifiable {

  Long id;
  String key;
  String attrs;
  DateTime time;
  Actor actor;
  String desc;

  @Id
  @Override
  public Long getId() {
    return id;
  }

  @Override
  public void setId(Long id) {
    this.id = id;
  }

  @Column(nullable = false)
  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  @Column
  public String getAttrs() {
    return attrs;
  }

  public void setAttrs(String attrs) {
    this.attrs = attrs;
  }

  @Column(nullable = false)
  @Type(type = "org.joda.time.contrib.hibernate.PersistentDateTime")
  public DateTime getTime() {
    return time;
  }

  public void setTime(DateTime time) {
    this.time = time;
  }

  @ManyToOne(targetEntity = Actor.class, optional = false)
  public Actor getActor() {
    return actor;
  }

  public void setActor(Actor actor) {
    this.actor = actor;
  }

  @Column(nullable = false)
  public String getDesc() {
    return desc;
  }

  public void setDesc(String desc) {
    this.desc = desc;
  }
}
