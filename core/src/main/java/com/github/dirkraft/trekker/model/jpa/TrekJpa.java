package com.github.dirkraft.trekker.model.jpa;

import com.github.dirkraft.trekker.model.Trek;
import com.github.dirkraft.trekker.model.TrekStop;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Trek")
@Table
public class TrekJpa implements Trek {

  String id;
  String name;
  List<TrekStop> trekStops = new ArrayList<>();

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

  @Override
  @OneToMany(targetEntity = TrekStopJpa.class, mappedBy = "trek",
    orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @OrderBy("seq")
  public List<TrekStop> getTrekStops() {
    return trekStops;
  }

  @Override
  public void setTrekStops(List<TrekStop> trekStops) {
    this.trekStops = trekStops;
  }
}
