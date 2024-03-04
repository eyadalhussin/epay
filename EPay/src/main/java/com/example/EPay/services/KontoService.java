package com.example.EPay.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.EPay.Utility.TStatus;
import com.example.EPay.Utility.TType;
import com.example.EPay.model.Konto;
import com.example.EPay.model.Kunde;
import com.example.EPay.model.Transaktion;
import com.example.EPay.repository.KontoRepo;

import jakarta.transaction.Transactional;

@Service
public class KontoService {
    @Autowired
    private KontoRepo kontoRepo;

    @Autowired
    private KundeService kundeService;

    @Autowired
    private TransaktionService transaktionService;

    public List<Konto> getAllKonten() {
        List<Konto> kontenList = new ArrayList<>();
        kontoRepo.findAll().forEach(kontenList::add);
        return kontenList;
    }

    public List<Konto> getAllKontos() {
        List<Konto> kontenList = new ArrayList<>();
        kontoRepo.findAll().forEach(kontenList::add);
        return kontenList;
    }

    public Konto getKontoById(Long id) {
        if (id != null) {
            Optional<Konto> kontoObject = kontoRepo.findById(id);
            if (kontoObject.isPresent()) {
                return kontoObject.get();
            }
        }
        return null;
    }

    public Optional<Konto> getKontoByKundenId(Long id) {
        if (id != null) {
            Optional<Kunde> kundenObject = kundeService.getKundeById(id);
            if (kundenObject.isPresent()) {
                Kunde kunde = kundenObject.get();
                Long konto_id = kunde.getKonto().getKonto_id();

                if (konto_id != null) {
                    return kontoRepo.findById(konto_id);
                }
            }
        }
        return null;
    }

    @Transactional
    public Kunde addKontoToKunde(Long kundenId) {
        if (kundenId != null) {
            Optional<Kunde> kundeObject = kundeService.getKundeById(kundenId);
            // Kontrolle dass es ein Kunde gibt, der kein Konto hat
            if (kundeObject.isPresent() && kundeObject.get().getKonto() == null) {
                Kunde kunde = kundeObject.get();
                Konto konto = new Konto(0, LocalDate.now());
                konto.setKunde(kunde);
                kunde.setKonto(konto);
                kontoRepo.save(konto);
                return kunde;
            }
        }
        return null;
    }

    @Transactional
    public Transaktion addBetragToKonto(Long kundenId, double betrag) {
        if (kundenId != null) {
            Optional<Kunde> kundenObject = kundeService.getKundeById(kundenId);
            if (kundenObject.isPresent() && kundenObject.get().getKonto() != null) {
                Kunde kunde = kundenObject.get();
                Konto konto = kunde.getKonto();
                Transaktion transaktion = new Transaktion(konto, betrag);
                transaktion.setStatus(TStatus.BESTAETIGT);
                transaktion.setTransaktionstyp(TType.EINZAHLUNG);
                transaktionService.addTransaktion(transaktion);
                konto.addTransaktion(transaktion);
                konto.addBetrag(betrag);
                return transaktion;
            }
        }
        return null;
    }

    @Transactional
    public Transaktion addBetragToKontoByKundenEmail(String kundenEmail, double betrag) {
        Optional<Kunde> kundenObject = kundeService.getKundeByEmail(kundenEmail);
        if (kundenObject.isPresent() && kundenObject.get().getKonto() != null) {
            Kunde kunde = kundenObject.get();
            Konto konto = kunde.getKonto();
            Transaktion transaktion = new Transaktion(konto, betrag);
            transaktion.setStatus(TStatus.BESTAETIGT);
            transaktion.setTransaktionstyp(TType.EINZAHLUNG);
            konto.addTransaktion(transaktion);
            konto.addBetrag(betrag);
            return transaktion;
        }
        return null;
    }

    @Transactional
    public Transaktion addBetragToKontoByKundenEmailWithSpecificDate(String kundenEmail, double betrag, LocalDate date, LocalTime time) {
        Optional<Kunde> kundenObject = kundeService.getKundeByEmail(kundenEmail);
        if (kundenObject.isPresent() && kundenObject.get().getKonto() != null) {
            Kunde kunde = kundenObject.get();
            Konto konto = kunde.getKonto();
            Transaktion transaktion = new Transaktion(konto, betrag);
            transaktion.setStatus(TStatus.BESTAETIGT);
            transaktion.setTransaktionstyp(TType.EINZAHLUNG);
            transaktion.setDatum(date);
            transaktion.setTime(time);
            konto.addTransaktion(transaktion);
            konto.addBetrag(betrag);
            return transaktion;
        }
        return null;
    }

    @Transactional
    public Transaktion removeBetragFromKontoByKundenEmail(String kundenEmail, double betrag) {
        Optional<Kunde> kundenObject = kundeService.getKundeByEmail(kundenEmail);
        if (kundenObject.isPresent() && kundenObject.get().getKonto() != null) {
            Kunde kunde = kundenObject.get();
            Konto konto = kunde.getKonto();

            // Überprüfe, ob der Betrag nicht größer als der Kontostand ist
            if (betrag > konto.getKontostand()) {
                return null;
            }

            Transaktion transaktion = new Transaktion(konto, betrag);
            transaktion.setStatus(TStatus.AUSSTEHEND);
            transaktion.setTransaktionstyp(TType.AUSZAHLUNG);
            transaktionService.addTransaktion(transaktion);
            //konto.removeBetrag(betrag);
            konto.addTransaktion(transaktion);
            return transaktion;
        }
        return null;
    }

    @Transactional
    public Transaktion removeBetragFromKontoByKundenEmailWithSpecificDateAndStatus(String kundenEmail, double betrag, LocalDate date, LocalTime time, TStatus status) {
        Optional<Kunde> kundenObject = kundeService.getKundeByEmail(kundenEmail);
        if (kundenObject.isPresent() && kundenObject.get().getKonto() != null) {
            Kunde kunde = kundenObject.get();
            Konto konto = kunde.getKonto();

            // Überprüfe, ob der Betrag nicht größer als der Kontostand ist
            if (betrag > konto.getKontostand()) {
                return null;
            }

            Transaktion transaktion = new Transaktion(konto, betrag);
            transaktion.setStatus(TStatus.AUSSTEHEND);
            transaktion.setTransaktionstyp(TType.AUSZAHLUNG);
            transaktionService.addTransaktion(transaktion);

            if(status == TStatus.BESTAETIGT){
                transaktion.setStatus(TStatus.BESTAETIGT);
                transaktionService.approveTransaktion(transaktion.getTransaktion_id());
                konto.removeBetrag(betrag);
            }

            konto.addTransaktion(transaktion);
            return transaktion;
        }
        return null;
    }

}
