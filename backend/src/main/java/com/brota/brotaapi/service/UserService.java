package com.brota.brotaapi.service;

import com.brota.brotaapi.model.User;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    Optional<User> findByEmail(String email);
}
