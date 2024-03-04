package com.example.EPay.controller.mitarbeiter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.EPay.dto.TransaktionDTO;
import com.example.EPay.model.Transaktion;
import com.example.EPay.services.TransaktionService;

@RestController
@RequestMapping("/api/mitarbeiter/transaktionen")
public class MitarbeiterTransaktionController {

    @Autowired
    private TransaktionService transaktionService;

    @GetMapping()
    public ResponseEntity<List<TransaktionDTO>> getAllTransaktionen() {
        List<TransaktionDTO> transaktionList = transaktionService.getAllTransaktionDTOs();
        if (!transaktionList.isEmpty()) {
            return new ResponseEntity<>(transaktionList, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{kunde_id}/transaktionen")
    public ResponseEntity<List<Transaktion>> getAllTransaktionenFromKunde(@PathVariable("kunde_id") Long kunde_id) {
        List<Transaktion> transaktionList = transaktionService.getAllTransaktionenToKundeById(kunde_id);
        return new ResponseEntity<>(transaktionList, HttpStatus.OK);
    }

    @PostMapping("/{transaktions_id}/approve")
    public ResponseEntity<Transaktion> approveTransaktion(@PathVariable("transaktions_id") Long transaktions_id) {
        Transaktion transaktion = transaktionService.approveTransaktion(transaktions_id);
        if (transaktion != null) {
            return new ResponseEntity<>(transaktion, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
