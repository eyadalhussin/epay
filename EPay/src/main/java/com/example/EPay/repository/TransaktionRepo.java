package com.example.EPay.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EPay.model.Transaktion;

public interface TransaktionRepo extends JpaRepository<Transaktion, Long> {
    
}
