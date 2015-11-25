package com.github.dirkraft.trekker.db;

import com.github.dirkraft.trekker.model.Identifiable;

import java.util.Optional;

public class DaoGitHub<E extends Identifiable> implements Dao<E> {
  @Override
  public Optional<E> get(Long id) {
    return null;
  }

  @Override
  public void save(E e) {

  }
}
