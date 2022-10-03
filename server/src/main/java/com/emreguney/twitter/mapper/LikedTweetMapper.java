package com.emreguney.twitter.mapper;

import com.emreguney.twitter.dto.response.LikedTweetResponseDTO;
import com.emreguney.twitter.dto.response.ReTweetResponseDTO;
import com.emreguney.twitter.model.LikedTweet;
import com.emreguney.twitter.model.Retweet;
import com.emreguney.twitter.service.TweetService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class LikedTweetMapper {

    Logger logger = LoggerFactory.getLogger(LikedTweetMapper.class);
    private ModelMapper modelMapper;

    private MainMapper mainMapper;

    private TweetService tweetService;

    public LikedTweetMapper(ModelMapper modelMapper, TweetService tweetService, MainMapper mainMapper) {
        this.modelMapper = modelMapper;
        this.tweetService = tweetService;
        this.mainMapper = mainMapper;
    }

    public List<LikedTweetResponseDTO> getAllLikes() {

        List<LikedTweet> likedTweets = tweetService.getAllLikes();

        return mainMapper.toDTOList(likedTweets, LikedTweetResponseDTO.class);
    }

    public List<LikedTweetResponseDTO> getAllLikesOfUserByUserId(long userId) {

       List<LikedTweet> likedTweets = tweetService.getAllLikesOfUserByUserId(userId);

        return mainMapper.toDTOList(likedTweets, LikedTweetResponseDTO.class);
    }

    public List<LikedTweetResponseDTO> getLikesByTweetId(long userId) {

        List<LikedTweet> likedTweets = tweetService.getLikesByTweetId(userId);

        return mainMapper.toDTOList(likedTweets, LikedTweetResponseDTO.class);
    }

    public LikedTweetResponseDTO like(long userId, long tweetId) {

        LikedTweet likedTweet = tweetService.like(userId, tweetId);

        return mainMapper.toDTO(likedTweet, LikedTweetResponseDTO.class);
    }

}
