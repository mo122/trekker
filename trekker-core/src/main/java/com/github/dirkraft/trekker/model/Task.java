package com.github.dirkraft.trekker.model;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table
public class Task implements Identifiable {

  Long id;
  String title;
  String description;
  Trek trek;
  Set<Flag> flags;

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
  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  @Column
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @ManyToOne(targetEntity = Trek.class, optional = false)
  public Trek getTrek() {
    return trek;
  }

  public void setTrek(Trek trek) {
    this.trek = trek;
  }

  @ElementCollection(targetClass = Flag.class, fetch = FetchType.EAGER)
  @CollectionTable(name = "task_flag")
  public Set<Flag> getFlags() {
    return flags;
  }

  public void setFlags(Set<Flag> flags) {
    this.flags = flags;
  }
}
