package com.example.EPay.model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.EPay.Utility.TStatus;
import com.example.EPay.Utility.TType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "transaktionen")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Transaktion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long transaktion_id;

    private double betrag;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate datum;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime time;
    private TStatus status;

    private TType transaktionstyp;
    
    @ManyToOne
    @JoinColumn(name = "konto_id")
    @JsonBackReference
    private Konto konto;

    public Transaktion(Konto konto, double betrag){
        this.konto = konto;
        this.betrag = betrag;
        this.datum = LocalDate.now();
        this.time = LocalTime.now();
        this.status = TStatus.AUSSTEHEND;
    }
}
