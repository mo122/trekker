package com.github.dirkraft.trekker.db;

import org.junit.Test;

public class GenericDaoTest {

  @Test
  public void test() {
    new GenericDao<>(Trek.class).get(1L);
  }

}