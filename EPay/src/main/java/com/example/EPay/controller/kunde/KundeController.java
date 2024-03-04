package com.example.EPay.controller.kunde;

import java.util.Optional;

import com.example.EPay.model.Kunde;
import com.example.EPay.services.KundeService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class KundeController {
    @Autowired
    private KundeService kundeService;

    // @GetMapping("/kunden")
    // public ResponseEntity<List<Kunde>> getKunden() {
    //     List<Kunde> kundenListe = kundeService.getAllKunden();
    //     if (!kundenListe.isEmpty()) {
    //         return new ResponseEntity<>(kundenListe, HttpStatus.OK);
    //     }
    //     return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }

    @GetMapping("/me")
    public ResponseEntity<Kunde> getKunde() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && !(auth instanceof AnonymousAuthenticationToken)) {
            String email = auth.getName();

            Optional<Kunde> kunde = kundeService.getKundeByEmail(email);

            if (kunde.isPresent()) {
                return new ResponseEntity<>(kunde.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
