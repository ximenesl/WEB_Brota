package com.brota.brotaapi.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brota.brotaapi.model.Armazem;
import com.brota.brotaapi.model.Fornecedor;
import com.brota.brotaapi.service.FornecedorService;

@RestController
@RequestMapping("/api")
public class FornecedorController {
	
	@Autowired
	private FornecedorService fornecedorService;
	
	@GetMapping("/fornecedor")
	public List<Fornecedor> get(){
		return fornecedorService.get();
	}
	
	@PostMapping("/fornecedor")
	public Fornecedor save(@RequestBody Fornecedor fornecedorObj) {
		fornecedorService.save(fornecedorObj);
		return fornecedorObj;
	}
	
	@GetMapping("/fornecedor/{id}")
	public Fornecedor get(@PathVariable int id) {
		Fornecedor fornecedorObj = fornecedorService.get(id);
		if (fornecedorObj == null) {
			throw new RuntimeException("Fornecedor com id" + id + " não foi encontrada");
		}
		return fornecedorObj;
	}
	
	@DeleteMapping("/fornecedor/{id}")
	public String delete(@PathVariable int id) {
		fornecedorService.delete(id);
		return "O Fornecedor foi deletado com o id: "+id; 
	}
	
	@PutMapping("/fornecedor")
	public Fornecedor update(@RequestBody Fornecedor fornecedorObj) {
		fornecedorService.save(fornecedorObj); 
		return fornecedorObj;
	}
}
