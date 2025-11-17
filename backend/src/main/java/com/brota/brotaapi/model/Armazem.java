package com.brota.brotaapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "armazem")
public class Armazem {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name = "idArmazem")
	private Integer id;
	
	@Column
	private String nome;
	
	@Column
	private String localização;
	
	@Column 
	private String responsável;
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getLocalização() {
		return localização;
	}

	public void setLocalização(String email) {
		this.localização = email;
	}

	public String getResponsável() {
		return responsável;
	}

	public void setResponsável(String responsável) {
		this.responsável = responsável;
	}

	@Override
	public String toString() {
		return "Armazem [id=" + id + ", nome=" + nome + ", localização=" + localização + ", responsável=" + responsável + "]";
	}
}
