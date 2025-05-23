package com.ssafy.soltravel.v2.dto.user.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.soltravel.v2.common.BankHeader;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequestBody {

  @JsonProperty("Header")
  private BankHeader header;
  private String userName;
}
