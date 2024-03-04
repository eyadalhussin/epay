package com.example.EPay.services;

import com.example.EPay.model.Kunde;
import com.example.EPay.repository.KundeRepo;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class KundeService {
    private KundeRepo kundeRepo;
    private PasswordEncoder passwordEncoder;

    public KundeService(KundeRepo kundeRepo, PasswordEncoder passwordEncoder) {
        this.kundeRepo = kundeRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Kunde> getAllKunden() {
        List<Kunde> kundenListe = new ArrayList<>();
        kundeRepo.findAll().forEach(kundenListe::add);
        return kundenListe;
    }

    public Optional<Kunde> getKundeByEmail(String email) {
        return email != null ? kundeRepo.findByemail(email) : Optional.empty();
    }

    public Optional<Kunde> getKundeById(Long id) {
        return id != null ? kundeRepo.findById(id) : Optional.empty();
    }

    public Kunde addKunde(Kunde newKunde) {
        if(newKunde != null){
            String encodedPassword = passwordEncoder.encode(newKunde.getPassword());
            newKunde.setPassword(encodedPassword);
            return kundeRepo.save(newKunde);
        }
        return null;
        //return newKunde != null ? kundeRepo.save(newKunde) : null;
    }

    public Kunde updateKundeById(Long id, Kunde newKundeData) {
        if (id != null && newKundeData != null) {
            return kundeRepo.findById(id).map(kunde -> {
                kunde.setName(newKundeData.getName());
                kunde.setEmail(newKundeData.getEmail());
                kunde.setPassword(newKundeData.getPassword());
                return kundeRepo.save(kunde);
            }).orElse(null);
        }
        return null;
    }

    public void deleteKundeById(Long id) {
        if (id != null) {
            kundeRepo.deleteById(id);
        }
    }
}
