package com.example.EPay.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "konten")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Konto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "konto_id")
    private Long konto_id;
    private double kontostand;
    private LocalDate erstellungsdatum;

    @OneToOne
    @JoinColumn(name = "kunde_id")
    @JsonBackReference
    private Kunde kunde;

    @OneToMany(mappedBy = "konto", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Transaktion> transaktionen = new ArrayList<>();

    public Konto(double kontostand, LocalDate erstellungsdatum){
        this.kontostand = kontostand;
        this.erstellungsdatum = erstellungsdatum;
    }

    public void addBetrag(double betrag){
        this.kontostand += betrag;
    }

    public void addTransaktion(Transaktion transaktion){
        this.transaktionen.add(transaktion);
    }

    public double removeBetrag(double betrag){
        if(betrag <= kontostand){
            this.kontostand -= betrag;
        }
        return kontostand;
    }

}
