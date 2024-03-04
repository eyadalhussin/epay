package com.example.EPay.init;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.EPay.Utility.TStatus;
import com.example.EPay.model.Kunde;
import com.example.EPay.model.Mitarbeiter;
import com.example.EPay.services.KontoService;
import com.example.EPay.services.KundeService;
import com.example.EPay.services.MitarbeiterService;

@Component
public class DataInitialiser implements CommandLineRunner {
    @Autowired
    private KundeService kundeService;

    @Autowired
    private MitarbeiterService mitarbeiterService;

    @Autowired
    private KontoService kontoService;

    @Override
    public void run(String... args) throws Exception {
        Kunde[] kundenListe = new Kunde[] {
                new Kunde("Frank", "frank@kunde.de", "123456"),
                new Kunde("Max", "max@kunde.de", "123456"),
                new Kunde("Justin", "justin@kunde.de", "123456")
        };

        for (Kunde kunde : kundenListe) {
            kundeService.addKunde(kunde);
        }

        for (Kunde kunde : kundenListe) {
            kontoService.addKontoToKunde(kunde.getId());
        }
        //Frank Transactions
        kontoService.addBetragToKontoByKundenEmailWithSpecificDate(kundenListe[0].getEmail(), 100, LocalDate.of(2024, 1, 5), LocalTime.of(16, 30));
        kontoService.addBetragToKontoByKundenEmailWithSpecificDate(kundenListe[0].getEmail(), 150, LocalDate.of(2024, 1, 7), LocalTime.of(5, 15));
        kontoService.addBetragToKontoByKundenEmailWithSpecificDate(kundenListe[0].getEmail(), 200, LocalDate.of(2024, 1, 10), LocalTime.of(7, 26));
        kontoService.addBetragToKontoByKundenEmailWithSpecificDate(kundenListe[0].getEmail(), 50, LocalDate.of(2024, 2, 25), LocalTime.of(17, 44));
        kontoService.addBetragToKontoByKundenEmailWithSpecificDate(kundenListe[0].getEmail(), 100, LocalDate.of(2024, 2, 28), LocalTime.of(12, 55));
        kontoService.addBetragToKontoByKundenEmailWithSpecificDate(kundenListe[0].getEmail(), 300, LocalDate.of(2024, 3, 1), LocalTime.of(20, 15));
        
        kontoService.removeBetragFromKontoByKundenEmailWithSpecificDateAndStatus(kundenListe[0].getEmail(), 35, LocalDate.of(2024, 3, 3), LocalTime.of(17, 20), TStatus.AUSSTEHEND);
        kontoService.removeBetragFromKontoByKundenEmailWithSpecificDateAndStatus(kundenListe[0].getEmail(), 100, LocalDate.of(2024, 3, 3), LocalTime.of(20, 15), TStatus.AUSSTEHEND);
        kontoService.removeBetragFromKontoByKundenEmailWithSpecificDateAndStatus(kundenListe[0].getEmail(), 75, LocalDate.of(2024, 3, 4), LocalTime.of(9, 20), TStatus.AUSSTEHEND);
        
        //Max Transactions
        kontoService.addBetragToKontoByKundenEmailWithSpecificDate(kundenListe[1].getEmail(), 100, LocalDate.of(2024, 1, 5), LocalTime.of(16, 30));

        kontoService.removeBetragFromKontoByKundenEmailWithSpecificDateAndStatus(kundenListe[1].getEmail(), 35, LocalDate.of(2024, 3, 3), LocalTime.of(17, 20), TStatus.AUSSTEHEND);
        kontoService.removeBetragFromKontoByKundenEmailWithSpecificDateAndStatus(kundenListe[1].getEmail(), 100, LocalDate.of(2024, 3, 3), LocalTime.of(20, 15), TStatus.AUSSTEHEND);
        kontoService.removeBetragFromKontoByKundenEmailWithSpecificDateAndStatus(kundenListe[1].getEmail(), 75, LocalDate.of(2024, 3, 4), LocalTime.of(9, 20), TStatus.AUSSTEHEND);

        Mitarbeiter[] mitarbeiterListe = new Mitarbeiter[] {
                new Mitarbeiter("Eyad", "eyad@agido.de", "123456"),
                new Mitarbeiter("Lars", "lars@agido.de", "123456"),
        };

        for (Mitarbeiter mitarbeiter : mitarbeiterListe) {
            mitarbeiterService.addMitarbeiter(mitarbeiter);
        }
    }
}
