package com.github.dirkraft.trekker.db;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class SessionFactories {

  SessionFactory sessionFactory = new Configuration()
    .configure()
    .buildSessionFactory();


  private SessionFactories() {
  }

  private static class Lazy {
    static final SessionFactories INSTANCE = new SessionFactories();
  }

  public static SessionFactory getInstance() {
    return Lazy.INSTANCE.sessionFactory;
  }
}
