package com.emreguney.twitter.controller;

import com.emreguney.twitter.dto.response.ReTweetResponseDTO;
import com.emreguney.twitter.dto.response.TweetResponseDTO;
import com.emreguney.twitter.mapper.RetweetMapper;
import com.emreguney.twitter.mapper.TweetMapper;
import com.emreguney.twitter.mapper.UserMapper;
import com.emreguney.twitter.model.User;
import com.emreguney.twitter.repository.UserRepository;
import com.emreguney.twitter.service.TweetService;
import com.emreguney.twitter.service.UserService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/retweet")
public class RetweetController {


    TweetService tweetService;

    UserMapper userMapper;

    TweetMapper tweetMapper;

    RetweetMapper retweetMapper;

    UserRepository userRepository;

    public RetweetController(TweetService tweetService, RetweetMapper retweetMapper, UserMapper userMapper, TweetMapper tweetMapper,
                             UserRepository userRepository) {
        this.tweetService = tweetService;
        this.retweetMapper = retweetMapper;
        this.userMapper = userMapper;
        this.tweetMapper = tweetMapper;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<ReTweetResponseDTO>> getAllRetweets() {


        List<ReTweetResponseDTO> retweets = retweetMapper.getAllRetweets();

        return ResponseEntity.ok().body(retweets);
    }

    @GetMapping("/all/userid/{userId}")
    public ResponseEntity<List<ReTweetResponseDTO>> getAllRetweetsByUserId(@PathVariable Long userId) {
        List<ReTweetResponseDTO> retweets = retweetMapper.getRetweetsByUserId(userId);

        return ResponseEntity.ok().body(retweets);
    }

    @GetMapping("/all/tweetid/{tweetId}")
    public ResponseEntity<List<ReTweetResponseDTO>> getAllRetweetsByTweetId(@PathVariable Long tweetId) {
        List<ReTweetResponseDTO> retweets = retweetMapper.getRetweetsByTweetId(tweetId);
        return ResponseEntity.ok().body(retweets);
    }

    @PostMapping
    public ResponseEntity<ReTweetResponseDTO> newRetweet(Principal principal, @RequestBody RetweetForm retweetModel) {

        User user = userRepository.findByUsername(principal.getName());

        ReTweetResponseDTO retweet = retweetMapper.newRetweet(user.getId(), retweetModel.getTweetId());
        if (retweet == null) {
            return ResponseEntity.ok().body(null);
        }

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/retweet/new/").toUriString());

        return ResponseEntity.created(uri).body(retweet);
    }

    @DeleteMapping("{tweetId}")
    public ResponseEntity<String> deleteRetweet(@PathVariable Long tweetId) {
        if (tweetService.deleteRetweet(1L, tweetId)) {
            return ResponseEntity.ok().body("The retweet successfully deleted");
        } else {
            return ResponseEntity.ok().body("There is no retweet with this information");
        }
    }

    @Data
    static class RetweetForm {

        private Long tweetId;
    }

}
