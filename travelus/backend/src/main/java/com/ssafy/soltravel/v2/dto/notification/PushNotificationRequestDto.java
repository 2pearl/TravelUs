package com.ssafy.soltravel.v2.dto.notification;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PushNotificationRequestDto {

    private Long targetUserId;

    private String title;

    private String message;
}
