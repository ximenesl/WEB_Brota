package com.brota.brotaapi.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.brota.brotaapi.dao.SementeDAO;
import com.brota.brotaapi.model.Semente;

@Service
public class SementeServiceImpl implements SementeService {

    @Autowired
    private SementeDAO sementeDAO;

    @Transactional
    @Override
    public List<Semente> get() {
        return sementeDAO.get();
    }

    @Transactional
    @Override
    public Semente get(int id) {
        return sementeDAO.get(id);
    }

    @Transactional
    @Override
    public void save(Semente semente) {
        sementeDAO.save(semente);
    }

    @Transactional
    @Override
    public void delete(int id) {
        sementeDAO.delete(id);
    }
}
