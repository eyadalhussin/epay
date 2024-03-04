package com.example.EPay.services;

import com.example.EPay.model.Mitarbeiter;
import com.example.EPay.repository.MitarbeiterRepo;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MitarbeiterService {
    private MitarbeiterRepo mitarbeiterRepo;

    private final PasswordEncoder pwdEncoder;

    public MitarbeiterService(MitarbeiterRepo mitarbeiterRepo, PasswordEncoder pwdEncoder) {
        this.mitarbeiterRepo = mitarbeiterRepo;
        this.pwdEncoder = pwdEncoder;
    }

    public List<Mitarbeiter> getAllMitarbeiter() {
        List<Mitarbeiter> mitarbeiterListe = new ArrayList<>();
        mitarbeiterRepo.findAll().forEach(mitarbeiterListe::add);
        return mitarbeiterListe;
    }

    public Optional<Mitarbeiter> getMitarbeiterById(Long id) {
        return id != null ? mitarbeiterRepo.findById(id) : Optional.empty();
    }

    public Mitarbeiter addMitarbeiter(Mitarbeiter newMitarbeiter) {
        if(newMitarbeiter != null){
            String encodedPassword = pwdEncoder.encode(newMitarbeiter.getPassword());
            newMitarbeiter.setPassword(encodedPassword);
            return mitarbeiterRepo.save(newMitarbeiter);
        }
        return null;
    }

    public Mitarbeiter updateMitarbeiterById(Long id, Mitarbeiter newMitarbeiterData) {
        if (id != null && newMitarbeiterData != null) {
            return mitarbeiterRepo.findById(id).map(mitarbeiter -> {
                mitarbeiter.setName(newMitarbeiterData.getName());
                mitarbeiter.setEmail(newMitarbeiterData.getEmail());
                mitarbeiter.setPassword(newMitarbeiterData.getPassword());
                return mitarbeiterRepo.save(mitarbeiter);
            }).orElse(null);
        }
        return null;
    }
}
