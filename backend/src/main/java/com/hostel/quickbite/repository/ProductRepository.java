package com.hostel.quickbite.repository;

import com.hostel.quickbite.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);
    List<Product> findByNameContainingIgnoreCase(String name);

}