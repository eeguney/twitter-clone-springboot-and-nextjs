package com.emreguney.twitter.repository;

import com.emreguney.twitter.model.Retweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RetweetRepository extends JpaRepository<Retweet, Long> {

    @Query("SELECT r as retweet FROM Retweet r WHERE r.user.id = :userId ORDER BY r.retweetDate DESC")
    List<Retweet> getRetweetsByUserId(Long userId);

    @Query("SELECT r as retweet FROM Retweet r WHERE r.tweet.id = :tweetId ORDER BY r.retweetDate DESC")
    List<Retweet> getRetweetsByTweetId(Long tweetId);

    @Query("SELECT r as retweet FROM Retweet r WHERE r.tweet.id = :tweetId AND r.user.id = :userId")
    Optional<Retweet> findRetweetByUserIdAndTweetId(Long tweetId, Long userId);

    @Query("SELECT COUNT(r) as retweet FROM Retweet r WHERE r.tweet.id = :tweetId ")
    Integer getRetweetCountByTweetId(Long tweetId);

    @Query("SELECT rt as retweet FROM Retweet rt WHERE rt.tweet.id = :tweetId AND rt.user.id = :userId")
    Retweet getRetweetByTweetIdAndUserId(Long tweetId, Long userId);


}
