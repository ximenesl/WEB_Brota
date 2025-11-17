package com.brota.brotaapi.dao;

import java.util.List;  
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import com.brota.brotaapi.model.Armazem;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class ArmazemDAOImpl implements ArmazemDAO {

	@PersistenceContext
    private EntityManager entityManager;
	
	@Override
	public List<Armazem> get() {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Armazem> query = currentSession.createQuery("from Armazem", Armazem.class);
		List<Armazem> list = query.getResultList();
		return list;
	}

	@Override
	public Armazem get(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Armazem armazemObj = currentSession.get(Armazem.class, id);
		return armazemObj;
	}

	@Override
	public void save(Armazem armazem) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.saveOrUpdate(armazem);
	}

	@Override
	public void delete(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Armazem armazemObj = currentSession.get(Armazem.class, id);
		currentSession.delete(armazemObj);
	}

}
