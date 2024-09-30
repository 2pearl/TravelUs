package com.ssafy.soltravel.v2.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import com.ssafy.soltravel.v2.domain.User;
import com.ssafy.soltravel.v2.domain.redis.RedisFcm;
import com.ssafy.soltravel.v2.dto.ResponseDto;
import com.ssafy.soltravel.v2.dto.notification.PushNotificationRequestDto;
import com.ssafy.soltravel.v2.dto.notification.RegisterNotificationRequestDto;
import com.ssafy.soltravel.v2.dto.transaction.request.TransactionRequestDto;
import com.ssafy.soltravel.v2.exception.notification.FcmTokenNotFound;
import com.ssafy.soltravel.v2.repository.redis.FcmTokenRepository;
import com.ssafy.soltravel.v2.util.LogUtil;
import com.ssafy.soltravel.v2.util.SecurityUtil;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private static final String DEFAULT_ICON_URL = "/sol_favicon.ico"; // 아이콘 상수

    private final FcmTokenRepository fcmTokenRepository;
    private final RedisTemplate<String, SseEmitter> redisTemplate; // RedisTemplate을 사용하여 Redis에 접근
    private final SecurityUtil securityUtil;

    // 토큰 레디스 저장
    public ResponseDto saveFcmToken(RegisterNotificationRequestDto requestDto) {

        LogUtil.info("requestDto", requestDto);

        User user = securityUtil.getUserByToken();

        fcmTokenRepository.save(new RedisFcm(user.getUserId(), requestDto.getFcmToken()));

        return new ResponseDto();
    }


    // 공통 푸시 알림 메서드
    private Message createMessage(String token, String title, String body) {
        return Message.builder()
            .setToken(token)
            .setWebpushConfig(WebpushConfig.builder()
                .putHeader("ttl", "300")
                .setNotification(new WebpushNotification(title, body, DEFAULT_ICON_URL))
                .build())
            .build();
    }

    // 사용자에게 푸시 알림 전송
    public ResponseEntity<?> pushNotification(PushNotificationRequestDto requestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        try {
            // FCM 토큰 조회
            RedisFcm redisFcm = fcmTokenRepository.findById(requestDto.getTargetUserId())
                .orElseThrow(() -> new FcmTokenNotFound(requestDto.getTargetUserId()));

            // 메시지 생성 및 전송
            Message message = createMessage(
                redisFcm.getFcmToken(),
                requestDto.getTitle(),
                requestDto.getMessage());

            String response = FirebaseMessaging.getInstance().sendAsync(message).get();
            status = HttpStatus.OK;
            resultMap.put("response", response);

        } catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
        }

        return new ResponseEntity<>(resultMap, status);
    }

    // 입출금 알림 전송
    public ResponseEntity<?> sendDepositNotification(Long userId, TransactionRequestDto requestDto) {
        String title;
        String message;
        String icon = "/icons/favicon.ico"; // 아이콘은 동일하게 사용

        // 트랜잭션 타입에 따라 switch-case로 알림 제목 및 메시지 설정
        switch (requestDto.getTransactionType()) {
            case D -> {
                title = "입금 완료";
                message = "입금 금액: " + requestDto.getTransactionBalance() + "원이 입금되었습니다.";
            }
            case W -> {
                title = "출금 완료";
                message = "출금 금액: " + requestDto.getTransactionBalance() + "원이 출금되었습니다.";
            }
            default -> {
                throw new IllegalArgumentException("지원되지 않는 트랜잭션 타입입니다.");
            }
        }

        // 알림 전송을 위한 Dto 생성 및 전송
        PushNotificationRequestDto notificationRequestDto = new PushNotificationRequestDto(userId, title, message, icon);
        return pushNotification(notificationRequestDto);
    }

    //    // 사용자에게 push 알림
//    public ResponseEntity<?> pushNotification(PushNotificationRequestDto requestDto) {
//        Map<String, Object> resultMap = new HashMap<>();
//        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
//
//        try {
//
//            // FCM 토큰 조회
//            RedisFcm redisFcm = fcmTokenRepository.findById(requestDto.getTargetUserId())
//                .orElseThrow(() -> new FcmTokenNotFound(requestDto.getTargetUserId()));
//
//            // FCM 메시지 생성
//            Message message = Message.builder()
//                .setToken(redisFcm.getFcmToken())
//                .setWebpushConfig(WebpushConfig.builder()
//                    .putHeader("ttl", "300")
//                    .setNotification(
//                        new WebpushNotification(requestDto.getTitle(), requestDto.getMessage(), requestDto.getIcon()))
//                    .build())
//                .build();
//
//            String response = FirebaseMessaging.getInstance().sendAsync(message).get();
//            status = HttpStatus.OK;
//            resultMap.put("response", response);
//        } catch (Exception e) {
//            resultMap.put("message", "요청 실패");
//            resultMap.put("exception", e.getMessage());
//        }
//
//        return new ResponseEntity<>(resultMap, status);
//    }

}


