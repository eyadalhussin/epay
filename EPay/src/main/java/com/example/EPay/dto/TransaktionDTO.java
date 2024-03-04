package com.example.EPay.dto;
import java.time.LocalDate;
import java.time.LocalTime;

import com.example.EPay.Utility.TStatus;
import com.example.EPay.Utility.TType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class TransaktionDTO {
    private Long transaktionId;
    private double betrag;
    private LocalDate datum;
    private LocalTime time;
    private TStatus status;
    private TType transaktionstyp;

    // Informationen zum Konto
    private Long kontoId;
    private double kontoStand;

    // Informationen zum Kunden
    private Long kundenId;
    private String kundenName;
    private String kundenEmail;
}
