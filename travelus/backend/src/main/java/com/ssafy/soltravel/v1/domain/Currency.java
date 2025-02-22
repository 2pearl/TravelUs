package com.ssafy.soltravel.v1.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Data;

@Entity
@Data
public class Currency {

    @Id
    private Long id;

    private String currencyCode;

    private String currencyName;

    @OneToMany(mappedBy = "currency")
    private List<ForeignAccount> foreignAccounts;
}
