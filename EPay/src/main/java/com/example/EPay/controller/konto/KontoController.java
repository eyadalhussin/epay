package com.example.EPay.controller.konto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.EPay.model.Transaktion;
import com.example.EPay.services.KontoService;

@RestController
@RequestMapping("/api/me/")
public class KontoController {
    @Autowired
    private KontoService kontoService;

    @PostMapping("/addBetrag")
    public ResponseEntity<Transaktion> addBetragToKonto(@RequestParam("betrag") double betrag){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null && !(auth instanceof AnonymousAuthenticationToken)){
            String email = auth.getName();
            Transaktion transaktion =  kontoService.addBetragToKontoByKundenEmail(email, betrag);
            if(transaktion != null){
                return new ResponseEntity<>(transaktion, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/removeBetrag")
    public ResponseEntity<Transaktion> removeBetragFromKonto(@RequestParam("betrag") double betrag){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null && !(auth instanceof AnonymousAuthenticationToken)){
            String email = auth.getName();
            Transaktion transaktion =  kontoService.removeBetragFromKontoByKundenEmail(email, betrag);
            if(transaktion != null){
                return new ResponseEntity<>(transaktion, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
