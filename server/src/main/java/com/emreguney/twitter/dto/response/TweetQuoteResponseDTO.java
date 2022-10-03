package com.emreguney.twitter.dto.response;

import com.emreguney.twitter.enums.ReplyTypes;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TweetQuoteResponseDTO implements Serializable {

    private Long id;

    private String text;

    private ReplyTypes replyType;

    private String link;

    private Date createDate;

    private UserResponseDTO user;

    private TweetResponseDTO quoteTweet;

    private Long parentTweetId;

    private Integer retweetCount = 0;

    private Integer likeCount = 0;

    private Integer replyCount = 0;

    private boolean isLikedByUser = false;

    private boolean isRetweetedByUser = false;

}
