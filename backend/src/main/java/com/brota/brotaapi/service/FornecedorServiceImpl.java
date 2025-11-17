package com.brota.brotaapi.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brota.brotaapi.dao.FornecedorDAO;
import com.brota.brotaapi.model.Fornecedor;

@Service
public class FornecedorServiceImpl implements FornecedorService {
	
	@Autowired
	private FornecedorDAO fornecedorDAO;
	
	@Transactional
	@Override
	public List<Fornecedor> get() {
		return fornecedorDAO.get();
	}
	
	@Transactional
	@Override
	public Fornecedor get(int id) {
		return fornecedorDAO.get(id);
	}

	@Transactional
	@Override
	public void save(Fornecedor fornecedor) {
		fornecedorDAO.save(fornecedor);
	}

	@Transactional
	@Override
	public void delete(int id) {
		fornecedorDAO.delete(id);
	}

}
