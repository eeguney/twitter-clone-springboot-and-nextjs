package com.emreguney.twitter.controller;

import com.emreguney.twitter.dto.response.TweetQuoteResponseDTO;
import com.emreguney.twitter.dto.response.TweetResponseDTO;
import com.emreguney.twitter.mapper.TweetMapper;
import com.emreguney.twitter.model.LikedTweet;
import com.emreguney.twitter.model.Retweet;
import com.emreguney.twitter.model.Tweet;
import com.emreguney.twitter.model.User;
import com.emreguney.twitter.repository.UserRepository;
import com.emreguney.twitter.service.TweetService;
import lombok.Data;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tweet")
public class TweetController {

    Logger logger = LoggerFactory.getLogger(TweetController.class);
    private final TweetService tweetService;

    private final TweetMapper tweetMapper;

    private final UserRepository userRepository;


    public TweetController(TweetService tweetService, TweetMapper tweetMapper, UserRepository userRepository) {
        this.tweetService = tweetService;
        this.tweetMapper = tweetMapper;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<TweetResponseDTO>> getAllTweets(Principal principal) {

        List<TweetResponseDTO> tweets = tweetMapper.getAllTweets();

        User user = userRepository.findByUsername(principal.getName());

        tweets.forEach(tweet -> {
                    tweet.setRetweetCount(tweetService.getRetweetCountByTweetId(tweet.getId()));
                    tweet.setLikeCount(tweetService.getLikeCountByTweetId(tweet.getId()));
                    tweet.setReplyCount(tweet.getReplies().size());

                    LikedTweet likedTweet = tweetService.getLikeByTweetIdAndUserId(tweet.getId(), user.getId());


                    if (likedTweet != null) {
                        tweet.setLikedByUser(true);
                    }
                    Retweet retweet = tweetService.getRetweetByTweetIdAndUserId(tweet.getId(), user.getId());

                    if (retweet != null) {
                        tweet.setRetweetedByUser(true);
                    }

                }

        );
        return ResponseEntity.ok().body(tweets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TweetResponseDTO> getTweetById(@PathVariable long id, Principal principal) {

        User user = userRepository.findByUsername(principal.getName());

        TweetResponseDTO tweet = tweetMapper.getTweetByTweetId(id);

            tweet.setRetweetCount(tweetService.getRetweetCountByTweetId(tweet.getId()));
            tweet.setLikeCount(tweetService.getLikeCountByTweetId(tweet.getId()));
            tweet.setReplyCount(tweet.getReplies().size());

            LikedTweet likedTweet = tweetService.getLikeByTweetIdAndUserId(tweet.getId(), user.getId());


            if (likedTweet != null) {
                tweet.setLikedByUser(true);
            }
            Retweet retweet = tweetService.getRetweetByTweetIdAndUserId(tweet.getId(), user.getId());

            if (retweet != null) {
                tweet.setRetweetedByUser(true);
            }


        return ResponseEntity.ok().body(tweet);
    }

    @GetMapping("/all/username/{username}")
    public ResponseEntity<List<TweetResponseDTO>> getTweetsByUsername(@PathVariable String username) {
        List<TweetResponseDTO> tweets = tweetMapper.getAllTweetsByUsername(username);

        User user = userRepository.findByUsername(username);

        tweets.forEach(tweet -> {
                    tweet.setRetweetCount(tweetService.getRetweetCountByTweetId(tweet.getId()));
                    tweet.setLikeCount(tweetService.getLikeCountByTweetId(tweet.getId()));
                    tweet.setReplyCount(tweet.getReplies().size());

                    LikedTweet likedTweet = tweetService.getLikeByTweetIdAndUserId(tweet.getId(), user.getId());


                    if (likedTweet != null) {
                        tweet.setLikedByUser(true);
                    }
                    Retweet retweet = tweetService.getRetweetByTweetIdAndUserId(tweet.getId(), user.getId());

                    if (retweet != null) {
                        tweet.setRetweetedByUser(true);
                    }

                }

        );
        return ResponseEntity.ok().body(tweets);
    }

    @PostMapping
    public ResponseEntity<TweetResponseDTO> saveTweet(@RequestBody TweetForm tweet) {

        User thatUser = userRepository.findUserById(tweet.getUserId());

        Tweet newTweet = new Tweet();
        newTweet.setText(tweet.getText());
        newTweet.setUser(thatUser);

        TweetResponseDTO createdTweet = tweetMapper.saveTweet(newTweet);

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/tweet/").toUriString());
        return ResponseEntity.created(uri).body(createdTweet);
    }

    @PostMapping("/quote/{tweetId}")
    public ResponseEntity<TweetResponseDTO> newQuote(@PathVariable long tweetId, @RequestBody Tweet tweet, Principal principal) throws Exception {

        User user = userRepository.findByUsername(principal.getName());

        tweet.setUser(user);

        TweetResponseDTO createdQuote = tweetMapper.newQuote(tweetId, tweet);


        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/tweet/quote").toUriString());
        return ResponseEntity.created(uri).body(createdQuote);
    }

    @PostMapping("/reply/{tweetId}")
    public ResponseEntity<TweetResponseDTO> newReply(@PathVariable long tweetId, @RequestBody @NotNull Tweet tweet, @NotNull Principal principal) throws Exception {
        User user = userRepository.findByUsername(principal.getName());

        tweet.setUser(user);

        TweetResponseDTO createdReply = tweetMapper.newReply(tweetId, tweet);

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/tweet/reply").toUriString());
        return ResponseEntity.created(uri).body(createdReply);
    }


    @Data
    static class TweetForm {
        private String text;

        private Long userId;
    }

}
