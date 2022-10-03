package com.emreguney.twitter.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikedTweetResponseDTO {

    private Long id;

    private Long userId;

    private Long tweetId;

    private UserResponseDTO user;


}
