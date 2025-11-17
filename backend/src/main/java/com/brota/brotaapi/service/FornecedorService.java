package com.brota.brotaapi.service;

import java.util.List; 

import com.brota.brotaapi.model.Fornecedor;

public interface FornecedorService {
	List<Fornecedor> get();
	
	Fornecedor get(int id);
	
	void save(Fornecedor fornecedor);
	
	void delete(int id);
}
