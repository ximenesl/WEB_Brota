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
import com.brota.brotaapi.service.ArmazemService;

@RestController
@RequestMapping("/api")
public class ArmazemController {
	
	@Autowired
	private ArmazemService armazemService;
	
	@GetMapping("/armazem")
	public List<Armazem> get(){
		return armazemService.get();
	}
	
	@PostMapping("/armazem")
	public Armazem save(@RequestBody Armazem armazemObj) {
		armazemService.save(armazemObj);
		return armazemObj;
	}
	
	@GetMapping("/armazem/{id}")
	public Armazem get(@PathVariable int id) {
		Armazem armazemObj = armazemService.get(id);
		if (armazemObj == null) {
			throw new RuntimeException("Armazém com id" + id + " não foi encontrada");
		}
		return armazemObj;
	}
	
	@DeleteMapping("/armazem/{id}")
	public String delete(@PathVariable int id) {
		armazemService.delete(id);
		return "O Armazém foi deletado com o id: "+id; 
	}
	
	@PutMapping("/armazem")
	public Armazem update(@RequestBody Armazem armazemObj) {
		armazemService.save(armazemObj);
		return armazemObj;
	}
}
