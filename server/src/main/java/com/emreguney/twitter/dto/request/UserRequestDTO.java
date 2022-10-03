package com.emreguney.twitter.dto.request;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO implements Serializable {

    private String email;

    private String username;

    private String fullname;

    private String password;

    private String gender;

    private String birthday;

}
