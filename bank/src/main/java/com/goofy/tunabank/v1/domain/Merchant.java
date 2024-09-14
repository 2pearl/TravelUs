package com.goofy.tunabank.v1.domain;

import com.goofy.tunabank.v1.domain.Enum.MerchantCategory;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class Merchant {

  //가맹점 id
  @Id
  @Column(name = "merchant_id")
  private Long id;

  //가맹점 이름
  @Column(name = "merchant_name", length = 100)
  private String name;

  //카테고리
  @Enumerated(EnumType.STRING)
  @Column(name = "category")
  private MerchantCategory category;

  //주소
  @Column(length = 100)
  private String address;

  //위도
  @Column(length = 100)
  private String lat;

  //경도
  @Column(length = 100)
  private String lng;

  //거래기록
  @OneToMany(mappedBy = "merchant", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<TransactionHistory> transactionHistories;
}
