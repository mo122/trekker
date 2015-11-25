package com.github.dirkraft.trekker.model.jpa;

import com.github.dirkraft.trekker.model.Flag;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "Flag")
@Table
public class FlagJpa implements Flag {

  String id;
  String name;

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
  public String getName() {
    return name;
  }

  @Override
  public void setName(String name) {
    this.name = name;
  }
}
