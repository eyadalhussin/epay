package com.example.EPay.controller.mitarbeiter;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.EPay.model.Kunde;
import com.example.EPay.services.KundeService;

@RestController
@RequestMapping("/api/mitarbeiter/kunden")
public class MitarbeiterKundenController {

    @Autowired
    private KundeService kundeService;

    // Get Alle Kunden
    @GetMapping
    public ResponseEntity<List<Kunde>> getAllKunden() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && !(auth instanceof AnonymousAuthenticationToken)) {

            List<Kunde> kundenList = kundeService.getAllKunden();

            if (!kundenList.isEmpty()) {
                return new ResponseEntity<>(kundenList, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


    @GetMapping("/{kunde_id}")
    public ResponseEntity<Kunde> getKundeById(@PathVariable("kunde_id") Long kundeId) {
        return kundeService.getKundeById(kundeId).map(ResponseEntity::ok).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
