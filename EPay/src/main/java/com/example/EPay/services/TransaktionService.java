package com.example.EPay.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.EPay.Utility.TStatus;
import com.example.EPay.dto.TransaktionDTO;
import com.example.EPay.model.Konto;
import com.example.EPay.model.Kunde;
import com.example.EPay.model.Transaktion;
import com.example.EPay.repository.KontoRepo;
import com.example.EPay.repository.KundeRepo;
import com.example.EPay.repository.TransaktionRepo;

@Service
public class TransaktionService {

    @Autowired
    private TransaktionRepo transaktionRepo;

    @Autowired
    private KontoRepo kontoRepo;

    @Autowired
    private KundeRepo kundeRepo;

    public Transaktion addTransaktion(Transaktion transaktion) {
        if (transaktion != null) {
            return transaktionRepo.save(transaktion);
        }
        return null;
    }

    public List<Transaktion> getAllTransaktionen() {
        List<Transaktion> transaktionenList = new ArrayList<Transaktion>();
        transaktionRepo.findAll().forEach(transaktionenList::add);
        return transaktionenList;
    }

    public List<TransaktionDTO> getAllTransaktionDTOs() {
        List<TransaktionDTO> transaktionDTOs = new ArrayList<TransaktionDTO>();
        transaktionRepo.findAll().forEach(transaktion -> {
            Kunde kunde = transaktion.getKonto().getKunde();
            Konto konto = transaktion.getKonto();
            transaktionDTOs.add(
                    new TransaktionDTO(
                            transaktion.getTransaktion_id(),
                            transaktion.getBetrag(),
                            transaktion.getDatum(), transaktion.getTime(),
                            transaktion.getStatus(),
                            transaktion.getTransaktionstyp(),
                            konto.getKonto_id(),
                            konto.getKontostand(),
                            kunde.getId(),
                            kunde.getName(),
                            kunde.getEmail()));
        });
        return !transaktionDTOs.isEmpty() ? transaktionDTOs : null;
    }

    public List<Transaktion> getAllTransaktionenToKundeById(Long kunde_id) {
        Kunde kunde = kundeRepo.findById(kunde_id).orElseThrow();
        List<Transaktion> transaktionsListe = kunde.getKonto().getTransaktionen();
        return transaktionsListe;
    }

    public Transaktion getTransaktionById(Long id) {
        if (id != null) {
            Optional<Transaktion> transaktionObject = transaktionRepo.findById(id);
            if (transaktionObject.isPresent()) {
                return transaktionObject.get();
            }
        }
        return null;
    }

    public Transaktion approveTransaktion(Long transaktion_id) {
        Transaktion transaktion = transaktionRepo.findById(transaktion_id).orElseThrow();

        if (transaktion.getStatus() == TStatus.AUSSTEHEND) {
            Konto konto = transaktion.getKonto();
            if (konto.getKontostand() < transaktion.getBetrag()) {
                return null;
            } else {
                transaktion.setStatus(TStatus.BESTAETIGT);
                transaktionRepo.save(transaktion);
                konto.removeBetrag(transaktion.getBetrag());
                kontoRepo.save(konto);
                return transaktion;
            }
        }
        return null;
    }
}
