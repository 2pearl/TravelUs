package com.goofy.tunabank.v1.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDeleteRequestDto {

  private Header header;

  @Data
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class Header {
    private String userKey;
  }
}
