package com.github.dirkraft.trekker.model;

public interface TrekStop extends Identifiable {
  Trek getTrek();

  void setTrek(Trek trek);

  String getName();

  void setName(String name);

  Byte getSeq();

  void setSeq(Byte seq);

  Boolean getWeight();

  void setWeight(Boolean weight);
}
