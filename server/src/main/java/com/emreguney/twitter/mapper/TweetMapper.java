package com.emreguney.twitter.mapper;

import com.emreguney.twitter.dto.response.TweetQuoteResponseDTO;
import com.emreguney.twitter.dto.response.TweetResponseDTO;
import com.emreguney.twitter.model.Tweet;
import com.emreguney.twitter.service.TweetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class TweetMapper {

    Logger logger = LoggerFactory.getLogger(TweetMapper.class);

    private MainMapper mainMapper;

    private TweetService tweetService;

    public TweetMapper(TweetService tweetService, MainMapper mainMapper) {
        this.tweetService = tweetService;
        this.mainMapper = mainMapper;
    }

    public List<TweetResponseDTO> getAllTweets() {
        List<Tweet> tweets = tweetService.getAllTweets();
        return mainMapper.toDTOList(tweets, TweetResponseDTO.class);
    }

    public List<TweetResponseDTO> getAllTweetsByUsername(String username) {
        List<Tweet> tweets = tweetService.getAllTweetsByUsername(username);
        return mainMapper.toDTOList(tweets, TweetResponseDTO.class);
    }

    public TweetResponseDTO getTweetByTweetId(long userId) {

        Optional<Tweet> tweet = tweetService.getTweetById(userId);
        if(!tweet.isPresent()) {
            return null;
        }
        return mainMapper.toDTO(tweet.get(), TweetResponseDTO.class);
    }

    public TweetResponseDTO saveTweet(Tweet tweet) {
        Tweet tweetEntity = mainMapper.toEntity(tweet, Tweet.class);
        Tweet newTweet = tweetService.saveTweet(tweetEntity);
        return mainMapper.toDTO(newTweet, TweetResponseDTO.class);
    }

    public TweetResponseDTO newQuote(long tweetId, Tweet quote) throws Exception {
        Tweet tweetEntity = mainMapper.toEntity(quote, Tweet.class);
        Tweet newQuote = tweetService.newQuote(tweetId, tweetEntity);
        return mainMapper.toDTO(newQuote, TweetResponseDTO.class);
    }

    public TweetResponseDTO newReply(long tweetId, Tweet reply) throws Exception {
        Tweet tweetEntity = mainMapper.toEntity(reply, Tweet.class);
        Tweet newReply = tweetService.newReply(tweetId, tweetEntity);
        return mainMapper.toDTO(newReply, TweetResponseDTO.class);
    }



}
