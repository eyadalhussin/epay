package com.example.EPay.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.EPay.model.Mitarbeiter;

@Repository
public interface MitarbeiterRepo extends JpaRepository<Mitarbeiter, Long> {
        Optional<Mitarbeiter> findByemail(String email);
}
