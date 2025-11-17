package com.brota.brotaapi.dao;

import java.util.List;  

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.brota.brotaapi.model.Fornecedor;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class FornecedorDAOImpl implements FornecedorDAO {

	@PersistenceContext
    private EntityManager entityManager;
	
	@Override
	public List<Fornecedor> get() {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Fornecedor> query = currentSession.createQuery("from Fornecedor", Fornecedor.class);
		List<Fornecedor> list = query.getResultList();
		return list;
	}

	@Override
	public Fornecedor get(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Fornecedor fornecedorObj = currentSession.get(Fornecedor.class, id);
		return fornecedorObj;
	}

	@Override
	public void save(Fornecedor fornecedor) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.saveOrUpdate(fornecedor);
	}

	@Override
	public void delete(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Fornecedor fornecedorObj = currentSession.get(Fornecedor.class, id);
		currentSession.delete(fornecedorObj);
	}
}
