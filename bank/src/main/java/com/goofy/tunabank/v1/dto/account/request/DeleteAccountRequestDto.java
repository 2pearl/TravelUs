package com.goofy.tunabank.v1.dto.account.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.goofy.tunabank.v1.common.Header;
import lombok.Data;

@Data
public class DeleteAccountRequestDto {

    @JsonProperty("Header")
    private Header header;

    private String accountNo;

    private String accountPassword;

}
