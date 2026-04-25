package com.hostel.quickbite.controller;

import com.hostel.quickbite.model.OrderItem;
import com.hostel.quickbite.model.Product;
import com.hostel.quickbite.repository.OrderRepository;
import com.hostel.quickbite.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository repo;
    private final ProductRepository productRepo;

    public OrderController(OrderRepository repo, ProductRepository productRepo) {
        this.repo = repo;
        this.productRepo = productRepo;
    }

    // Create Order (PENDING)
    @PostMapping
    public OrderItem placeOrder(@RequestBody OrderItem order) {

        Product product = productRepo
                .findByNameContainingIgnoreCase(order.getProductName())
                .stream()
                .findFirst()
                .orElse(null);

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        if (product.getStock() < order.getQuantity()) {
            throw new RuntimeException("Not enough stock");
        }

        product.setStock(product.getStock() - order.getQuantity());
        productRepo.save(product);

        order.setTotalPrice(product.getPrice() * order.getQuantity());

        // Important: set initial status
        order.setStatus("PENDING");

        return repo.save(order);
    }

    // Get Orders by Roll Number
    @GetMapping
    public List<OrderItem> getOrders(@RequestParam String rollNo) {
        return repo.findByRollNo(rollNo);
    }

    // Mark Order as PAID
    @PutMapping("/pay/{id}")
    public OrderItem markAsPaid(@PathVariable Long id) {
        OrderItem order = repo.findById(id).orElseThrow();
        order.setStatus("PAID");
        return repo.save(order);
    }

    // Optional: Update status (for PREPARING, DELIVERED)
    @PutMapping("/status/{id}")
    public OrderItem updateStatus(@PathVariable Long id, @RequestParam String status) {
        OrderItem order = repo.findById(id).orElseThrow();
        order.setStatus(status);
        return repo.save(order);
    }
}