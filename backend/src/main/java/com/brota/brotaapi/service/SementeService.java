package com.brota.brotaapi.service;

import java.util.List;
import com.brota.brotaapi.model.Semente;

public interface SementeService {
    List<Semente> get();
    Semente get(int id);
    void save(Semente semente);
    void delete(int id);
}
