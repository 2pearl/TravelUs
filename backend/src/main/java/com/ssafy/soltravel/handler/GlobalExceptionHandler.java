package com.ssafy.soltravel.handler;

import com.ssafy.soltravel.dto.ResponseDto;
import com.ssafy.soltravel.exception.InvalidCredentialsException;
import com.ssafy.soltravel.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ResponseDto> handleGeneralException(Exception e) {

    ResponseDto errorResponseDto = new ResponseDto();
    errorResponseDto.setStatus("INTERNAL_SERVER_ERROR");
    errorResponseDto.setMessage(e.getMessage());

    return new ResponseEntity<>(errorResponseDto, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(WebClientResponseException.class)
  public ResponseEntity<String> handleWebClientResponseException(WebClientResponseException e) {
    return new ResponseEntity<String>(e.getResponseBodyAsString(), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<ResponseDto> handleUserNotFoundException(UserNotFoundException e) {
    ResponseDto errorResponse = new ResponseDto(
        "NOT_FOUND",
        String.format("DB에 해당 유저가 없습니다: %d", e.getUserId())
    );
    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InvalidCredentialsException.class)
  public ResponseEntity<ResponseDto> handleUserNotFoundException(InvalidCredentialsException e) {
    ResponseDto errorResponse = new ResponseDto(
        "UNAUTHORIZED",
        String.format("아이디 또는 비밀번호가 틀렸습니다.", e.getEmail())
    );
    return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
  }
}
