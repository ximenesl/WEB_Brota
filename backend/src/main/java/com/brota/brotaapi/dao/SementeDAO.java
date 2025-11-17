package com.brota.brotaapi.dao;

import java.util.List;
import com.brota.brotaapi.model.Semente;

public interface SementeDAO {
    List<Semente> get();
    Semente get(int id);
    void save(Semente semente);
    void delete(int id);
}
