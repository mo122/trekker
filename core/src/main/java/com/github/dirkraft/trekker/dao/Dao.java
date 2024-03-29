package com.github.dirkraft.trekker.dao;

import com.github.dirkraft.trekker.model.Identifiable;

import java.util.Optional;

public interface Dao<E extends Identifiable> {

  Optional<E> get(Long id);
  void save(E e);
}
