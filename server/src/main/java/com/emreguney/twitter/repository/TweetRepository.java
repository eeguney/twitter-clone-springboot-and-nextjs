package com.emreguney.twitter.repository;

import com.emreguney.twitter.model.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface TweetRepository extends JpaRepository<Tweet, Long> {

    @Query("SELECT COUNT(t) as tweet FROM Tweet t WHERE t.id = :tweetId ")
    Integer getQuotesCountByTweetId(Long tweetId);

    @Query("SELECT t as tweet FROM Tweet t WHERE t.user.username = :username")
    List<Tweet> getAllTweetsByUsername(String username);

}
