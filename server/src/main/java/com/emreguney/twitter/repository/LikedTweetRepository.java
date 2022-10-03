package com.emreguney.twitter.repository;

import com.emreguney.twitter.model.LikedTweet;
import com.emreguney.twitter.model.Retweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LikedTweetRepository extends JpaRepository<LikedTweet, Long> {

    @Query("SELECT lt as liked_tweet FROM LikedTweet lt WHERE lt.user.id = :userId ORDER BY lt.likeDate DESC")
    List<LikedTweet> getLikesByUserId(Long userId);

    @Query("SELECT lt as liked_tweet FROM LikedTweet lt WHERE lt.tweet.id = :tweetId ORDER BY lt.likeDate DESC")
    List<LikedTweet> getLikesByTweetId(Long tweetId);

    @Query("SELECT lt as liked_tweet FROM LikedTweet lt WHERE lt.tweet.id = :tweetId AND lt.user.id = :userId")
    Optional<LikedTweet> findLikedTweetsByUserIdAndTweetId(Long tweetId, Long userId);

    @Query("SELECT COUNT(lt) as liked_tweet FROM LikedTweet lt WHERE lt.tweet.id = :tweetId ")
    Integer getLikeCountByTweetId(Long tweetId);

    @Query("SELECT lt as liked_tweet FROM LikedTweet lt WHERE lt.tweet.id = :tweetId AND lt.user.id = :userId")
    LikedTweet getLikeByTweetIdAndUserId(Long tweetId, Long userId);

}
