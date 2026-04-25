package com.hostel.quickbite.controller;

import com.hostel.quickbite.model.Product;
import com.hostel.quickbite.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String name) {

        if (name != null) {
            return repo.findByNameContainingIgnoreCase(name);
        }

        if (category != null) {
            return repo.findByCategory(category);
        }

        return repo.findAll();
    }
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return repo.save(product);
    }}