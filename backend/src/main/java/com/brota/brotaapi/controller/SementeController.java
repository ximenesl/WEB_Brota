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
import com.brota.brotaapi.model.Semente;
import com.brota.brotaapi.service.SementeService;

@RestController
@RequestMapping("/api")
public class SementeController {

    @Autowired
    private SementeService sementeService;

    @GetMapping("/sementes")
    public List<Semente> get() {
        return sementeService.get();
    }

    @PostMapping("/sementes")
    public Semente save(@RequestBody Semente semente) {
        sementeService.save(semente);
        return semente;
    }

    @GetMapping("/sementes/{id}")
    public Semente get(@PathVariable int id) {
        Semente semente = sementeService.get(id);
        if (semente == null) {
            throw new RuntimeException("Semente com id " + id + " não foi encontrada.");
        }
        return semente;
    }

    @DeleteMapping("/sementes/{id}")
    public String delete(@PathVariable int id) {
        sementeService.delete(id);
        return "Semente com id " + id + " foi deletada.";
    }

    @PutMapping("/sementes")
    public Semente update(@RequestBody Semente semente) {
        sementeService.save(semente);
        return semente;
    }
}
