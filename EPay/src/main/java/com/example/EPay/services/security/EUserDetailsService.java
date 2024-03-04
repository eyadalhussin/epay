package com.example.EPay.services.security;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.EPay.model.Kunde;
import com.example.EPay.model.Mitarbeiter;
import com.example.EPay.repository.KundeRepo;
import com.example.EPay.repository.MitarbeiterRepo;

@Service
public class EUserDetailsService implements UserDetailsService {

    private final KundeRepo kundeRepo;
    private final MitarbeiterRepo mitarbeiterRepo;

    public EUserDetailsService(KundeRepo kundeRepo, MitarbeiterRepo mitarbeiterRepo){
        this.kundeRepo = kundeRepo;
        this.mitarbeiterRepo = mitarbeiterRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Try to find Kunde
        Optional<Kunde> kundeOptional = kundeRepo.findByemail(email);
        if(kundeOptional.isPresent()){
            return kundeOptional.get();
        }

        Optional<Mitarbeiter> mitarbeiterOptional = mitarbeiterRepo.findByemail(email);
        if(mitarbeiterOptional.isPresent()){
            return mitarbeiterOptional.get();
        }

        throw new UsernameNotFoundException("User with email " + email + " Not found");

    }

}
