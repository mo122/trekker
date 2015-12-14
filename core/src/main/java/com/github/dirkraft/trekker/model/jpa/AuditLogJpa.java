package com.github.dirkraft.trekker.model.jpa;

import com.github.dirkraft.trekker.model.Actor;
import com.github.dirkraft.trekker.model.AuditLog;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity(name = "AuditLog")
@Table
public class AuditLogJpa implements AuditLog {

  String id;
  String key;
  String attrs;
  DateTime time;
  Actor actor;
  String description;

  @Id
  @Override
  public String getId() {
    return id;
  }

  @Override
  public void setId(String id) {
    this.id = id;
  }

  @Override
  @Column(nullable = false)
  public String getKey() {
    return key;
  }

  @Override
  public void setKey(String key) {
    this.key = key;
  }

  @Override
  @Column
  public String getAttrs() {
    return attrs;
  }

  @Override
  public void setAttrs(String attrs) {
    this.attrs = attrs;
  }

  @Override
  @Column(nullable = false)
  @Type(type = "org.joda.time.contrib.hibernate.PersistentDateTime")
  public DateTime getTime() {
    return time;
  }

  @Override
  public void setTime(DateTime time) {
    this.time = time;
  }

  @Override
  @ManyToOne(targetEntity = ActorJpa.class, optional = false)
  public Actor getActor() {
    return actor;
  }

  @Override
  public void setActor(Actor actor) {
    this.actor = actor;
  }

  @Override
  @Column(nullable = false)
  public String getDescription() {
    return description;
  }

  @Override
  public void setDescription(String description) {
    this.description = description;
  }
}
