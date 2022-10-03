package com.emreguney.twitter.controller;

import com.emreguney.twitter.dto.response.LikedTweetResponseDTO;
import com.emreguney.twitter.dto.response.ReTweetResponseDTO;
import com.emreguney.twitter.dto.response.TweetResponseDTO;
import com.emreguney.twitter.mapper.LikedTweetMapper;
import com.emreguney.twitter.mapper.TweetMapper;
import com.emreguney.twitter.model.LikedTweet;
import com.emreguney.twitter.service.TweetService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/liked-tweet")
public class LikedTweetController {

    TweetService tweetService;

    LikedTweetMapper likedTweetMapper;

    TweetMapper tweetMapper;

    public LikedTweetController(TweetService tweetService, LikedTweetMapper likedTweetMapper, TweetMapper tweetMapper) {
        this.tweetService = tweetService;
        this.likedTweetMapper = likedTweetMapper;
        this.tweetMapper = tweetMapper;
    }


    @GetMapping
    public ResponseEntity<List<LikedTweetResponseDTO>> getAllLikedTweets() {
        List<LikedTweetResponseDTO> likedTweets = likedTweetMapper.getAllLikes();

        return ResponseEntity.ok().body(likedTweets);
    }

    @GetMapping("/all/userid/{userId}")
    public ResponseEntity<List<LikedTweetResponseDTO>> getAllLikedTweetsByUserId(@PathVariable Long userId) {
        List<LikedTweetResponseDTO> likedTweets = likedTweetMapper.getAllLikesOfUserByUserId(userId);
//        likedTweets.forEach(likedTweet ->
//                {
//                    TweetResponseDTO tweet = tweetMapper.getTweetByTweetId(likedTweet.getTweetId());
//                    likedTweet.setTweet(tweet);
//                }
//        );
        return ResponseEntity.ok().body(likedTweets);
    }

    @GetMapping("/all/tweetid/{tweetId}")
    public ResponseEntity<List<LikedTweetResponseDTO>> getAllLikedTweetsByTweetId(@PathVariable Long tweetId) {
        List<LikedTweetResponseDTO> likedTweets = likedTweetMapper.getLikesByTweetId(tweetId);
//        likedTweets.forEach(likedTweet ->
//                {
//                    TweetResponseDTO tweet = tweetMapper.getTweetByTweetId(likedTweet.getTweetId());
//                    likedTweet.setTweet(tweet);
//                }
//        );
        return ResponseEntity.ok().body(likedTweets);
    }

    @PostMapping()
    public ResponseEntity<LikedTweetResponseDTO> like(@RequestBody LikeTweetModel likeModel) {
        LikedTweetResponseDTO likedTweet = likedTweetMapper.like(likeModel.getUserId(), likeModel.getTweetId());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/liked-tweet/").toUriString());

        return ResponseEntity.created(uri).body(likedTweet);

    }

    @DeleteMapping("{tweetId}")
    public ResponseEntity<String> unlike(@PathVariable Long tweetId) {
        if (tweetService.unlike(1L, tweetId)) {
            return ResponseEntity.ok().body("The like successfully deleted");
        } else {
            return ResponseEntity.ok().body("There is no like with this information");
        }
    }

    @Data
    static class LikeTweetModel {
        private Long userId;
        private Long tweetId;
    }


}
