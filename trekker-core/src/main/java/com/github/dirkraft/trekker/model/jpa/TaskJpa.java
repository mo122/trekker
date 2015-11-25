package com.github.dirkraft.trekker.model.jpa;

import com.github.dirkraft.trekker.model.Flag;
import com.github.dirkraft.trekker.model.Task;
import com.github.dirkraft.trekker.model.Trek;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Set;

@Entity(name = "Task")
@Table
public class TaskJpa implements Task {

  String id;
  String title;
  String description;
  Trek trek;
  Set<Flag> flags;

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
  public String getTitle() {
    return title;
  }

  @Override
  public void setTitle(String title) {
    this.title = title;
  }

  @Override
  @Column
  public String getDescription() {
    return description;
  }

  @Override
  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  @ManyToOne(targetEntity = TrekJpa.class, optional = false)
  public Trek getTrek() {
    return trek;
  }

  @Override
  public void setTrek(Trek trek) {
    this.trek = trek;
  }

  @Override
  @ElementCollection(targetClass = FlagJpa.class, fetch = FetchType.EAGER)
  @CollectionTable(name = "task_flag")
  public Set<Flag> getFlags() {
    return flags;
  }

  @Override
  public void setFlags(Set<Flag> flags) {
    this.flags = flags;
  }
}
