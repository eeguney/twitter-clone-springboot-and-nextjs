package com.emreguney.twitter.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReTweetResponseDTO {

    private Long id;

    private Long userId;

    private Long tweetId;

    private UserResponseDTO user;

}
