package com.github.dirkraft.trekker.model;

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

@Entity
@Table
public class Trek implements Identifiable {

  Long id;
  String name;
  List<TrekStop> trekStops = new ArrayList<>();

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
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @OneToMany(targetEntity = TrekStop.class, mappedBy = "trek",
    orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @OrderBy("seq")
  public List<TrekStop> getTrekStops() {
    return trekStops;
  }

  public void setTrekStops(List<TrekStop> trekStops) {
    this.trekStops = trekStops;
  }
}
