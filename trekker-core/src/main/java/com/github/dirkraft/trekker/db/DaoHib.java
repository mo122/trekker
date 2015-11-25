package com.github.dirkraft.trekker.db;

import com.github.dirkraft.trekker.model.Identifiable;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.Optional;

public class DaoHib<E extends Identifiable> implements Dao<E> {

  Class<E> entityClass;
  SessionFactory sessionFactory;

  @SuppressWarnings("unchecked")
  public DaoHib(Class<E> entityClass, SessionFactory sessionFactory) {
    this.entityClass = entityClass;
    this.sessionFactory = sessionFactory;
  }

  public DaoHib(Class<E> entityClass) {
    this(entityClass, SessionFactories.getInstance());
  }

  @Override
  public Optional<E> get(Long id) {
    return Optional.ofNullable(query(s -> s.get(entityClass, id)));
  }

  @Override
  public void save(E e) {
    commit(s -> s.saveOrUpdate(e));
  }

  protected <R> R query(Returning<R> returning) {
    try (Session session = sessionFactory.openSession()) {
      return returning.execute(session);
    }
  }

  protected void commit(Voidly voidly) {
    transact(s -> {
      voidly.execute(s);
      return null;
    });
  }

  protected <R> R transact(Returning<R> returning) {
    Session session = sessionFactory.openSession();
    try {
      Transaction trx = session.beginTransaction();
      try {
        R result = returning.execute(session);
        trx.commit();
        return result;
      } catch (Exception e) {
        trx.rollback();
        throw e;
      }
    } finally {
      session.close();
    }
  }

  @FunctionalInterface
  public interface Returning<R> {
    R execute(Session s);
  }

  @FunctionalInterface
  public interface Voidly {
    void execute(Session s);
  }
}
