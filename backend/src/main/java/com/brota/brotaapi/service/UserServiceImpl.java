package com.brota.brotaapi.service;

import com.brota.brotaapi.dao.UserDAO;
import com.brota.brotaapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    // In a real app, you would inject a PasswordEncoder here
    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public User registerUser(User user) {
        // In a real app, you would encode the password before saving
        // user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userDAO.save(user);
    }

    @Transactional
    @Override
    public Optional<User> findByEmail(String email) {
        return userDAO.findByEmail(email);
    }
}
