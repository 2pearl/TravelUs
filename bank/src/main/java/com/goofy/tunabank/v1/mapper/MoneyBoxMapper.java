package com.goofy.tunabank.v1.mapper;

import com.goofy.tunabank.v1.domain.MoneyBox;
import com.goofy.tunabank.v1.dto.moneyBox.MoneyBoxDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MoneyBoxMapper {

    @Mapping(source = "id", target = "moneyBoxId")
    @Mapping(source = "currency.currencyCode", target = "currencyCode")
    MoneyBoxDto toDto(MoneyBox moneyBox);


//
//    MoneyBoxDto toDto(MoneyBox moneyBox){
//
//        MoneyBoxDto moneyBoxDto = MoneyBoxDto.builder()
//            .moneyBoxId(moneyBox.getId())
//            .balance(moneyBox.getBalance())
//            .currencyType(moneyBox.getCurrency().getCurrencyCode())
//            .build();
//
//        return moneyBoxDto;
//    }


}
