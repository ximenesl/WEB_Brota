package com.brota.brotaapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brota.brotaapi.dao.ArmazemDAO;
import com.brota.brotaapi.model.Armazem;

@Service
public class ArmazemServiceImpl implements ArmazemService {
	
	@Autowired
	private ArmazemDAO armazemDAO;
	
	@Transactional
	@Override
	public List<Armazem> get() {
		return armazemDAO.get();
	}
	
	@Transactional
	@Override
	public Armazem get(int id) {
		return armazemDAO.get(id);
	}

	@Transactional
	@Override
	public void save(Armazem armazem) {
		armazemDAO.save(armazem);
	}

	@Transactional
	@Override
	public void delete(int id) {
		armazemDAO.delete(id);
	}

}
