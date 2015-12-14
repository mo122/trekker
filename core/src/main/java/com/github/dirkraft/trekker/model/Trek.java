package com.github.dirkraft.trekker.model;

import java.util.List;

public interface Trek extends Identifiable {
  String getName();

  void setName(String name);

  List<TrekStop> getTrekStops();

  void setTrekStops(List<TrekStop> trekStops);
}
