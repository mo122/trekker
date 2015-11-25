package com.github.dirkraft.trekker.model.jpa;

import com.github.dirkraft.trekker.model.Trek;
import com.github.dirkraft.trekker.model.TrekStop;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OrderColumn;
import javax.persistence.Table;

@Entity(name = "TrekStop")
@Table
public class TrekStopJpa implements TrekStop {

  String id;
  Trek trek;
  String name;
  Byte seq;
  Boolean weight;

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
  @ManyToOne(targetEntity = TrekJpa.class, optional = false)
  public Trek getTrek() {
    return trek;
  }

  @Override
  public void setTrek(Trek trek) {
    this.trek = trek;
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
  @Column
  @OrderColumn(nullable = false)
  public Byte getSeq() {
    return seq;
  }

  @Override
  public void setSeq(Byte seq) {
    this.seq = seq;
  }

  @Override
  @Column(nullable = false)
  public Boolean getWeight() {
    return weight;
  }

  @Override
  public void setWeight(Boolean weight) {
    this.weight = weight;
  }
}
