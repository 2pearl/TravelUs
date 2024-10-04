package com.ssafy.soltravel.v2.domain;

import com.ssafy.soltravel.v2.domain.Enum.SettlementStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonalSettlementHistory {

  @Id
  @Column(name = "personal_settlement_history_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "participant_id")
  private Participant participant;


  //정산 금액
  private double amount;

  //남은 금액
  private double remainingAmount;

  //정산 여부
  private SettlementStatus isSettled;

  public static PersonalSettlementHistory createPersonalSettlementHistory(Participant participant, double amount) {
    PersonalSettlementHistory personalSettlementHistory = new PersonalSettlementHistory();
    personalSettlementHistory.participant = participant;
    personalSettlementHistory.amount = amount;
    personalSettlementHistory.remainingAmount = amount;
    personalSettlementHistory.isSettled = SettlementStatus.NOT_COMPLETED;
    return personalSettlementHistory;
  }
}
