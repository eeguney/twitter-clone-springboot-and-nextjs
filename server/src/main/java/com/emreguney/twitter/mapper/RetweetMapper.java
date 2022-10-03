package com.emreguney.twitter.mapper;

import com.emreguney.twitter.dto.response.ReTweetResponseDTO;
import com.emreguney.twitter.dto.response.TweetResponseDTO;
import com.emreguney.twitter.model.Retweet;
import com.emreguney.twitter.model.Tweet;
import com.emreguney.twitter.service.TweetService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class RetweetMapper {

    Logger logger = LoggerFactory.getLogger(RetweetMapper.class);
    private ModelMapper modelMapper;

    private MainMapper mainMapper;

    private TweetService tweetService;

    public RetweetMapper(ModelMapper modelMapper, TweetService tweetService, MainMapper mainMapper) {
        this.modelMapper = modelMapper;
        this.tweetService = tweetService;
        this.mainMapper = mainMapper;
    }

    public List<ReTweetResponseDTO> getAllRetweets() {
        List<Retweet> retweets = tweetService.getAllRetweets();

        if(retweets == null) {
            return null;
        }

        return mainMapper.toDTOList(retweets, ReTweetResponseDTO.class);
    }

    public List<ReTweetResponseDTO> getRetweetsByUserId(long userId) {

       List<Retweet> retweets = tweetService.getRetweetsByUserId(userId);

        if(retweets == null) {
            return null;
        }

        return mainMapper.toDTOList(retweets, ReTweetResponseDTO.class);
    }

    public List<ReTweetResponseDTO> getRetweetsByTweetId(long userId) {

        List<Retweet> retweets = tweetService.getRetweetsByTweetId(userId);

        if(retweets == null) {
            return null;
        }

        return mainMapper.toDTOList(retweets, ReTweetResponseDTO.class);
    }

    public ReTweetResponseDTO newRetweet(Long userId, long tweetId) {
        Retweet retweet = tweetService.newRetweet(userId, tweetId);
        if(retweet == null) {
            return null;
        }
        return mainMapper.toDTO(retweet, ReTweetResponseDTO.class);
    }

}
