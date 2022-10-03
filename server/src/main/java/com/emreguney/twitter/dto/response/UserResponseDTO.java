package com.emreguney.twitter.dto.response;

import com.emreguney.twitter.model.Role;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO implements Serializable {

    private Long id;

    private String email;

    private String username;

    private String fullname;

    private String about;

    private String website;

    private String country;

    private String gender;

    private String birthday;

    private Boolean privateProfile;

    private Boolean banned;

    private Date createDate;

    private Integer tweetCount;

    private Integer likeCount;


}
