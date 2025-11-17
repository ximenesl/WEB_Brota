package com.brota.brotaapi.dao;

import java.util.List;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.brota.brotaapi.model.Semente;

@Repository
public class SementeDAOImpl implements SementeDAO {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Semente> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Semente> query = currentSession.createQuery("from Semente", Semente.class);
        List<Semente> list = query.getResultList();
        return list;
    }

    @Override
    public Semente get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Semente semente = currentSession.get(Semente.class, id);
        return semente;
    }

    @Override
    public void save(Semente semente) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(semente);
    }

    @Override
    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Semente semente = currentSession.get(Semente.class, id);
        currentSession.delete(semente);
    }
}
