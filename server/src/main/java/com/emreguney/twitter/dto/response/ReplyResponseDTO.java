package com.emreguney.twitter.dto.response;

import com.emreguney.twitter.enums.ReplyTypes;
import com.emreguney.twitter.model.Tweet;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReplyResponseDTO {

    private Long id;

    private String text;

    private ReplyTypes replyType;

    private String link;

    private Date createDate;

    private UserResponseDTO user;

    private Integer retweetCount = 0;

    private Integer likeCount = 0;

    private boolean isLikedByUser = false;

    private boolean isRetweetedByUser = false;

}
