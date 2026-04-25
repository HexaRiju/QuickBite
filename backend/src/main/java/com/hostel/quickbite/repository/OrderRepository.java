package com.hostel.quickbite.repository;

import com.hostel.quickbite.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByRollNo(String rollNo);   // get orders of a user
}