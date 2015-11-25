package com.github.dirkraft.trekker.db;

import java.util.Optional;

public interface Dao<E extends Identifiable> {

  Optional<E> get(Long id);
  void save(E e);
}
