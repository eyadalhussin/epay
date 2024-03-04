package com.example.EPay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.EPay.model.Konto;

@Repository
public interface KontoRepo extends JpaRepository<Konto, Long> {
    
}
