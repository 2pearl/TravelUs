package com.goofy.tunabank.v1.service;

import com.goofy.tunabank.v1.exception.CustomException;

public class UserKeyNotFoundException extends CustomException {

  private static final String DEFAULT_MESSAGE = "User key not found";
  private static final String DEFAULT_CODE = "USER_KEY_NOT_FOUND";
  private static final int DEFAULT_STATUS = 404;  // HTTP 404 Not Found

  public UserKeyNotFoundException(String email) {
    super(
        DEFAULT_MESSAGE,
        DEFAULT_CODE,
        DEFAULT_STATUS,
        String.format("%s: %s", DEFAULT_MESSAGE, email)
    );
  }
}
