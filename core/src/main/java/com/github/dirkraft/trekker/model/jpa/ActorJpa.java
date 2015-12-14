package com.github.dirkraft.trekker.model.jpa;

import com.github.dirkraft.trekker.model.Actor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

@Entity(name = "Actor")
@Table
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class ActorJpa implements Actor {

  String id;

  @Id
  @Override
  public String getId() {
    return id;
  }

  @Override
  public void setId(String id) {
    this.id = id;
  }
}
