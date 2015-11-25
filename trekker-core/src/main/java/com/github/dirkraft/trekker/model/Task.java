package com.github.dirkraft.trekker.model;

import java.util.Set;

public interface Task extends Identifiable {
  String getTitle();

  void setTitle(String title);

  String getDescription();

  void setDescription(String description);

  Trek getTrek();

  void setTrek(Trek trek);

  Set<Flag> getFlags();

  void setFlags(Set<Flag> flags);
}
