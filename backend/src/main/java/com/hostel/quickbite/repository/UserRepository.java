package com.hostel.quickbite.repository;

import com.hostel.quickbite.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}