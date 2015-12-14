package com.github.dirkraft.trekker.model.jpa;

import com.github.dirkraft.trekker.model.Flag;
import com.github.dirkraft.trekker.model.Task;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Collection;

@Entity(name = "Flag")
@Table
public class FlagJpa implements Flag {

  String id;
  String name;
  Collection<Task> tasks;

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

  @ManyToMany(targetEntity = TaskJpa.class)
  @JoinTable(name = "task_flag")
  public Collection<Task> getTasks() {
    return tasks;
  }

  public void setTasks(Collection<Task> tasks) {
    this.tasks = tasks;
  }
}
