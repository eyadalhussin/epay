package com.example.EPay.services.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.EPay.model.AuthenticationRequest;
import com.example.EPay.model.AuthenticationResponse;
import com.example.EPay.model.Kunde;
import com.example.EPay.model.Mitarbeiter;
import com.example.EPay.repository.KundeRepo;
import com.example.EPay.repository.MitarbeiterRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class AuthenticationService {
    private final KundeRepo kundeRepo;
    private final MitarbeiterRepo mitarbeiterRepo;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final EUserDetailsService userDetailsService;

    private final Logger logger = LoggerFactory.getLogger(getClass());


    public AuthenticationResponse authenticate(AuthenticationRequest request){

        logger.info("TEST email is " + request.getEmail());
        logger.info("TEST password is " + request.getPassword());

        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        System.out.println("Found User Details" + userDetails);

        String jwtToken = jwtService.generateToken(userDetails);
        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse regisiter(AuthenticationRequest request){
        String token;

        String email = request.getEmail();
        String password = request.getPassword();
        int atIndex = email.indexOf("@");
        String name = email.substring(0, atIndex).toUpperCase();


        if(email.contains("agido")){
            Mitarbeiter mitarbeiter = new Mitarbeiter(name, request.getEmail(), request.getPassword());
            mitarbeiterRepo.save(mitarbeiter);
             token = jwtService.generateToken(mitarbeiter);
             return new AuthenticationResponse(token);

        } else {
            Kunde kunde = new Kunde(name, email, password);
            kundeRepo.save(kunde);
            token = jwtService.generateToken(kunde);
            return new AuthenticationResponse(token);
        }
    }
}
