package com.sq.system.usercore.dto;

import lombok.Data;

@Data
public class UserRegisterDTO {
    private String username;
    private String password;
    private String securePassword;
    private String nickname;
    private String captchaUuid;
    private String captchaInput;
    private String captchaType;
    private String email;
    private Long role;
    private Long type;
}
