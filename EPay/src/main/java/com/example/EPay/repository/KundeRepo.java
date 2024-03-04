package com.example.EPay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.EPay.model.Kunde;
import java.util.Optional;


@Repository
public interface KundeRepo extends JpaRepository<Kunde, Long>{

    Optional<Kunde> findByemail(String email);
    
}