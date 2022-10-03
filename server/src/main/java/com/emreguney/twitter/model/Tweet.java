package com.emreguney.twitter.model;

import com.emreguney.twitter.enums.ReplyTypes;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tweet")
public class Tweet implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text")
    private String text;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "tweet")
    private List<Retweet> retweets;

    @OneToMany(mappedBy = "tweet")
    private List<LikedTweet> likedTweets;

    @Column(name = "reply_type")
    private ReplyTypes replyType;

    @Column(name = "link")
    private String link;

    @Column(name = "parent_tweet_id")
    private Long parentTweetId;

    @ManyToMany
    @OrderBy("id DESC")
    @JoinTable(
            name = "reply",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "reply_id")
    )
    private List<Tweet> replies;

    @OneToOne
    @JoinTable(name = "tweet_quote",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "quote_tweet_id"))
    private Tweet quoteTweet;

    @OneToMany
    @JoinTable(
            name = "quote",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "quote_id")
    )
    private List<Tweet> quotes;

    @Column(name = "create_date")
    private Date createDate;

}
