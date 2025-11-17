package com.brota.brotaapi.dao;

import com.brota.brotaapi.model.User;
import java.util.Optional;

public interface UserDAO {
    User save(User user);
    Optional<User> findByEmail(String email);
}
