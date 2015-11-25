package com.github.dirkraft.trekker.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OrderColumn;
import javax.persistence.Table;

@Entity
@Table
public class TrekStop implements Identifiable {

  Long id;
  Trek trek;
  String name;
  Byte seq;
  Boolean weight;

  @Id
  @Override
  public Long getId() {
    return id;
  }

  @Override
  public void setId(Long id) {
    this.id = id;
  }

  @ManyToOne(targetEntity = Trek.class, optional = false)
  public Trek getTrek() {
    return trek;
  }

  public void setTrek(Trek trek) {
    this.trek = trek;
  }

  @Column(nullable = false)
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Column
  @OrderColumn(nullable = false)
  public Byte getSeq() {
    return seq;
  }

  public void setSeq(Byte seq) {
    this.seq = seq;
  }

  @Column(nullable = false)
  public Boolean getWeight() {
    return weight;
  }

  public void setWeight(Boolean weight) {
    this.weight = weight;
  }
}
