package com.example.EPay.dto;

import java.time.LocalDate;
import java.util.List;

import com.example.EPay.model.Kunde;
import com.example.EPay.model.Transaktion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter

public class KontoDTO {
    private Long konto_id;
    private double kontostand;
    private LocalDate erstellungsdatum;
    private Kunde kunde;
    private List<Transaktion> transaktionen;
}
