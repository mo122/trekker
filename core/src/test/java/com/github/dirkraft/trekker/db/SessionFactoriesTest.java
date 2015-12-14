package com.github.dirkraft.trekker.db;

import com.github.dirkraft.trekker.dao.hib.SessionFactories;
import org.junit.Test;

public class SessionFactoriesTest {

  @Test
  public void test() {
    SessionFactories.getInstance();
  }

}