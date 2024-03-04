package com.example.EPay.dto;

import com.example.EPay.Utility.URole;
import com.example.EPay.model.Konto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter

public class KundeDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private URole role;
    private Konto konto;

    public KundeDTO(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = URole.KUNDE;
    }

}
