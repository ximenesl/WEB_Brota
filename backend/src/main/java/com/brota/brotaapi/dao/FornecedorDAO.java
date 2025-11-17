package com.brota.brotaapi.dao;

import java.util.List;

import com.brota.brotaapi.model.Fornecedor;

public interface FornecedorDAO {
	
	List<Fornecedor> get();
	
	Fornecedor get(int id);
	
	void save(Fornecedor fornecedor);
	
	void delete(int id);
}
