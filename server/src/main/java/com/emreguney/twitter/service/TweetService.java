package com.emreguney.twitter.service;

import com.emreguney.twitter.model.LikedTweet;
import com.emreguney.twitter.model.Retweet;
import com.emreguney.twitter.model.Tweet;
import com.emreguney.twitter.model.User;

import java.util.List;
import java.util.Optional;

public interface TweetService {

    List<Tweet> getAllTweets();

    Optional<Tweet> getTweetById(long id);

    List<Tweet> getAllTweetsByUsername(String username);

    Tweet saveTweet(Tweet tweet);

    // retweets

    List<Retweet> getAllRetweets();

    List<Retweet> getRetweetsByUserId(long id);

    List<Retweet> getRetweetsByTweetId(long id);

    Retweet getRetweetByTweetIdAndUserId(long tweetId, long userId);

    Integer getRetweetCountByTweetId(long id);

    Retweet newRetweet(long userId, long tweetId);

    Boolean deleteRetweet(long userId, long tweetId);

    Retweet deleteOrCreateRetweet(User user, Tweet tweet);

    Optional<Tweet> validateTweetWithId(long id);

    // likes

    List<LikedTweet> getAllLikes();

    List<LikedTweet> getAllLikesOfUserByUserId(long id);

    List<LikedTweet> getLikesByTweetId(long id);

    LikedTweet getLikeByTweetIdAndUserId(long tweetId, long userId);

    Integer getLikeCountByTweetId(long id);

    LikedTweet like(long userId, long tweetId);

    Boolean unlike(long userId, long tweetId);

    LikedTweet likeOrUnlikeTweet(User user, Tweet tweet);

    Tweet newQuote(long tweetId, Tweet quote) throws Exception;

    Integer getQuotesCountByTweetId(long tweetId);

    Tweet newReply(long tweetId, Tweet reply) throws Exception;

}
