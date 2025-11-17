package com.brota.brotaapi.model;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Fornecedor")
public class Fornecedor {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name = "idFornecedor")
	private Integer id;
	
	@Column
	private String nome;
	
	@Column
	private String CNPJCPF;
	
	@Column
	private String endereco;
	
	@Column 
	private String telefone;
	
	@Column 
	private String email;
	
	@Column 
	private String produtos;
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCNPJCPF() {
		return CNPJCPF;
	}

	public void setCNPJCPF(String CNPJCPF) {
		this.CNPJCPF = CNPJCPF;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getendereco() {
		return endereco;
	}

	public void setendereco(String endereco) {
		this.endereco = endereco;
	}

	public String gettelefone() {
		return telefone;
	}

	public void settelefone(String telefone) {
		this.telefone = telefone;
	}
	
	public String getemail() {
		return email;
	}

	public void setemail(String email) {
		this.email = email;
	}
	
	public String getprodutos() {
		return produtos;
	}

	public void setprodutos(String produtos) {
		this.produtos = produtos;
	}

	@Override
	public String toString() {
		return "Armazem [id=" + id + ", nome=" + nome + ", CNPJ/CPF=" + CNPJCPF + ", endereço=" + endereco + ", telefone=" + telefone + ", email=" + email + ", produtos=" + produtos +"]";
	}
}
