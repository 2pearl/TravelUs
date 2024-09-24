package com.goofy.tunabank.v1.repository;

import com.goofy.tunabank.v1.domain.Account;
import com.goofy.tunabank.v1.domain.Enum.AccountType;
import com.goofy.tunabank.v1.repository.transaction.AccountRepositoryCustom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long>, AccountRepositoryCustom {

    // 간단한 JPA 쿼리 메소드
    Optional<Account> findById(Long accountId);

    // 계좌번호로 조회
    Optional<Account> findByAccountNo(String accountNo);

    // 계좌번호로 조회
    Optional<Account> findByAccountNoAndAccountType(String accountNo, AccountType accountType);

}