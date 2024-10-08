package com.ssafy.soltravel.v2.service.account;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.soltravel.v1.dto.user.UserDetailDto;
import com.ssafy.soltravel.v2.common.BankHeader;
import com.ssafy.soltravel.v2.domain.User;
import com.ssafy.soltravel.v2.dto.account.AccountDto;
import com.ssafy.soltravel.v2.dto.account.request.AddMoneyBoxRequestDto;
import com.ssafy.soltravel.v2.dto.account.request.CreateAccountRequestDto;
import com.ssafy.soltravel.v2.dto.account.request.InquireAccountListRequestDto;
import com.ssafy.soltravel.v2.dto.moneyBox.DeleteMoneyBoxResponseDto;
import com.ssafy.soltravel.v2.dto.moneyBox.MoneyBoxDto;
import com.ssafy.soltravel.v2.exception.user.UserNotFoundException;
import com.ssafy.soltravel.v2.mapper.AccountMapper;
import com.ssafy.soltravel.v2.repository.GeneralAccountRepository;
import com.ssafy.soltravel.v2.repository.ParticipantRepository;
import com.ssafy.soltravel.v2.repository.UserRepository;
import com.ssafy.soltravel.v2.service.WebClientService;
import com.ssafy.soltravel.v2.util.LogUtil;
import com.ssafy.soltravel.v2.util.SecurityUtil;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {

    private final Map<String, String> apiKeys;

    private final WebClientService webClientService;

    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final GeneralAccountRepository generalAccountRepository;

    private final AccountMapper accountMapper;
    private final ObjectMapper objectMapper;

    private final SecurityUtil securityUtil;

    private final String BASE_URL = "/accounts/";

    // 신규 계좌 생성
    public AccountDto createGeneralAccount(
        CreateAccountRequestDto requestDto
    ) {

        User user = securityUtil.getUserByToken();

        Map<String, Object> body = new HashMap<>();
        String API_URL = BASE_URL + "postAccount";

        BankHeader header = BankHeader.createHeader(apiKeys.get("API_KEY"), user.getUserKey());

        body.put("Header", header);
        body.put("accountType", requestDto.getAccountType());
        body.put("accountPassword", requestDto.getAccountPassword());
        body.put("bankId", requestDto.getBankId());

        // 일반 계좌 DB 저장 로직 유저 완성 시 추가
        ResponseEntity<Map<String, Object>> response = webClientService.sendRequest(API_URL, body);

        // REC 부분을 Object 타입으로 받기
        Map<String, String> recObject = (Map<String, String>) response.getBody().get("REC");

        // recObject -> AccountDto 매핑
        AccountDto accountDto = objectMapper.convertValue(recObject, AccountDto.class);

        return accountDto;
    }

    // 계좌 단건 조회 (AccountNo로) - 상세 정보 X
    public AccountDto getByAccountNo(String accountNo) {
        User user = securityUtil.getUserByToken();

        String API_URL = BASE_URL + "inquireAccount";

        BankHeader header = BankHeader.createHeader(apiKeys.get("API_KEY"), user.getUserKey());

        Map<String, Object> body = new HashMap<>();

        body.put("Header", header);
        body.put("accountNo", accountNo);

        // 특정 계좌 조회
        ResponseEntity<Map<String, Object>> response = webClientService.sendRequest(API_URL, body);

        // REC 부분을 Object 타입으로 받기
        Map<String, String> recObject = (Map<String, String>) response.getBody().get("REC");

        // recObject -> AccountDto 매핑
        AccountDto accountDto = objectMapper.convertValue(recObject, AccountDto.class);

        // email 로 유저 이름 조회
        String email = recObject.get("credentialId");
        User accountUser = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));

        accountDto.setUserName(accountUser.getName());

        return accountDto;
    }

    // 계좌 소유주 검색 - accountNo 기반
    public UserDetailDto getUserByAccountNo(String accountNo) {

        User user = securityUtil.getUserByToken();

        String API_URL = BASE_URL + "inquireAccount";

        BankHeader header = BankHeader.createHeader(apiKeys.get("API_KEY"), user.getUserKey());

        Map<String, Object> body = new HashMap<>();

        body.put("Header", header);
        body.put("accountNo", accountNo);

        // 특정 계좌 조회
        ResponseEntity<Map<String, Object>> response = webClientService.sendRequest(API_URL, body);

        // REC 부분을 Object 타입으로 받기
        Map<String, String> recObject = (Map<String, String>) response.getBody().get("REC");

        // email 로 유저 이름 조회
        String email = recObject.get("credentialId");

        User accountUser = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));

        return UserDetailDto.builder()
            .id(accountUser.getUserId())
            .name(accountUser.getName())
            .build();
    }

    // 계좌 전체 조회 (userId로)
    public List<AccountDto> getAllByUserId(InquireAccountListRequestDto requestDto) {

        User user = securityUtil.getUserByToken();

        String API_URL = BASE_URL + "inquireAccountList";

        BankHeader header = BankHeader.createHeader(apiKeys.get("API_KEY"), user.getUserKey());

        Map<String, Object> body = new HashMap<>();

        body.put("Header", header);
        body.put("searchType", requestDto.getSearchType());

        // 특정 유저 전체 계좌 조회
        ResponseEntity<Map<String, Object>> response = webClientService.sendRequest(API_URL, body);

        // REC 부분을 Object 타입으로 받기
        List<Map<String, Object>> recObjectList = (List<Map<String, Object>>) response.getBody().get("REC");

        List<AccountDto> accountDtoList = objectMapper.convertValue(recObjectList,
            new TypeReference<List<AccountDto>>() {
            });

        return accountDtoList;
    }

    // 계좌 신규 머니박스 추가
    public List<MoneyBoxDto> addMoneyBox(AddMoneyBoxRequestDto requestDto) {

        User user = securityUtil.getUserByToken();

        String API_URL = BASE_URL + "addMoneyBox";

        BankHeader header = BankHeader.createHeader(apiKeys.get("API_KEY"), user.getUserKey());

        Map<String, Object> body = new HashMap<>();

        body.put("Header", header);
        body.put("accountNo", requestDto.getAccountNo());
        body.put("currencyCode", requestDto.getCurrencyCode());
        body.put("accountPassword", requestDto.getAccountPassword());

        // 머니박스 추가
        ResponseEntity<Map<String, Object>> response = webClientService.sendRequest(API_URL, body);

        // WebClient 응답에서 REC 부분을 가져오기
        List<Map<String, Object>> recObjectList = (List<Map<String, Object>>) response.getBody().get("REC");

        // REC 데이터를 MoneyBoxDto 리스트로 변환
        List<MoneyBoxDto> moneyBoxDtos = objectMapper.convertValue(recObjectList,
            new TypeReference<List<MoneyBoxDto>>() {
            });

        // 변환된 리스트를 반환하거나, 다른 로직에 사용
        return moneyBoxDtos;
    }

    // 머니박스 삭제
    public DeleteMoneyBoxResponseDto deleteMoneyBox(AddMoneyBoxRequestDto requestDto) {

        User user = securityUtil.getUserByToken();

        String API_URL = BASE_URL + "deleteMoneyBox";

        BankHeader header = BankHeader.createHeader(apiKeys.get("API_KEY"), user.getUserKey());

        Map<String, Object> body = new HashMap<>();

        body.put("Header", header);
        body.putAll(objectMapper.convertValue(requestDto, Map.class));

        ResponseEntity<Map<String, Object>> response = webClientService.sendRequest(API_URL, body);

        // WebClient 응답에서 REC 부분을 가져오기
        Map<String, Object> recObject = (Map<String, Object>) response.getBody().get("REC");

        // REC 데이터를 MoneyBoxDto 리스트로 변환
        DeleteMoneyBoxResponseDto responseDto = objectMapper.convertValue(recObject, DeleteMoneyBoxResponseDto.class);

        LogUtil.info("responseDto: " + responseDto);
        LogUtil.info("responseDto: " + responseDto);

        // 변환된 리스트를 반환하거나, 다른 로직에 사용
        return responseDto;

    }

//  public ResponseEntity<DeleteAccountResponseDto> deleteAccount(
//      String accountNo,
//      boolean isForeign,
//      DeleteAccountRequestDto dto
//  ) {
//    Long userId = SecurityUtil.getCurrentUserId();
//    User user = userRepository.findByUserId(userId)
//        .orElseThrow(() -> new IllegalArgumentException("The userId does not exist: " + userId));
//    String API_NAME = "deleteDemandDepositAccount";
//    String API_URL = BASE_URL + "/" + API_NAME;
//    Double refundAmount = 0.0;
//    if (isForeign) {
//      API_NAME = "deleteForeignCurrencyDemandDepositAccount";
//      API_URL = BASE_URL + "/foreignCurrency/" + API_NAME;
//      ForeignAccount foreignAccount = foreignAccountRepository.findByAccountNo(accountNo)
//          .orElseThrow(() -> new IllegalArgumentException(
//              "The foreignAccountNo does not exist: " + accountNo)
//          );
//      refundAmount = foreignAccount.getBalance();
//      if (refundAmount > 0) {
//        if (dto == null) {
//          throw new RefundAccountNotFoundException();
//        } else if (dto.getRefundAccountNo() == null || dto.getRefundAccountNo().isBlank()) {
//          throw new RefundAccountNotFoundException();
//        }
//      }
//    } else {
//      GeneralAccount generalAccount = generalAccountRepository.findByAccountNo(accountNo)
//          .orElseThrow(() -> new IllegalArgumentException(
//              "The generalAccountNo does not exist: " + accountNo));
//
//      LogUtil.info("refundAmount: ", refundAmount);
//      LogUtil.info("refundAmount > 0: ", refundAmount > 0);
//
//      // 잔액이 남아 있으면
//      if (refundAmount > 0) {
//        if (dto == null) {
//          throw new RefundAccountNotFoundException();
//        } else if (dto.getRefundAccountNo() == null || dto.getRefundAccountNo().isBlank()) {
//          throw new RefundAccountNotFoundException();
//        }
//      }
//    }
//
//    Header header = Header.builder()
//        .apiName(API_NAME)
//        .apiServiceCode(API_NAME)
//        .apiKey(apiKeys.get("API_KEY"))
//        .userKey(user.getUserKey())
//        .build();
//
//    Map<String, Object> body = new HashMap<>();
//
//    body.put("Header", header);
//    body.put("accountNo", accountNo);
//
//    if (refundAmount > 0) {
//      body.put("refundAccountNo", dto.getRefundAccountNo());
//    }
//
//    try {
//      ResponseEntity<Map<String, Object>> response = webClient.post()
//          .uri(API_URL)
//          .contentType(MediaType.APPLICATION_JSON)
//          .bodyValue(body)
//          .retrieve()
//          .toEntity(new ParameterizedTypeReference<Map<String, Object>>() {
//          })
//          .block();
//
//      // REC 부분을 Object 타입으로 받기
//      Object recObject = response.getBody().get("REC");
//      ModelMapper modelMapper = new ModelMapper();
//
//      // REC 데이터를 GeneralAccount 엔티티로 변환
//      DeleteAccountResponseDto responseDto = modelMapper.map(recObject,
//          DeleteAccountResponseDto.class);
//
//      if (isForeign) {
//        foreignAccountRepository.deleteByAccountNo(accountNo);
//      } else {
//        generalAccountRepository.deleteByAccountNo(accountNo);
//      }
//
//      if (refundAmount > 0) {
//        GeneralAccount generalAccount = generalAccountRepository.findByAccountNo(
//                responseDto.getRefundAccountNo())
//            .orElseThrow(() -> new RuntimeException(
//                "The RefundAccount Does Not Exist : " + responseDto.getRefundAccountNo()));
//
//      }
//
//      return ResponseEntity.status(HttpStatus.OK).body(responseDto);
//    } catch (WebClientResponseException e) {
//      throw e;
//    }
//  }
//
}
