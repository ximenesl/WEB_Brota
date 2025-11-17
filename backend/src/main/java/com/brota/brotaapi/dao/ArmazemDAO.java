package com.brota.brotaapi.dao;

import java.util.List;

import com.brota.brotaapi.model.Armazem;

public interface ArmazemDAO {
	
	List<Armazem> get();
	
	Armazem get(int id);
	
	void save(Armazem armazem);
	
	void delete(int id);
}
