package com.emreguney.twitter.service.impl;
import com.emreguney.twitter.model.LikedTweet;
import com.emreguney.twitter.model.Retweet;
import com.emreguney.twitter.model.Tweet;
import com.emreguney.twitter.model.User;
import com.emreguney.twitter.repository.LikedTweetRepository;
import com.emreguney.twitter.repository.RetweetRepository;
import com.emreguney.twitter.repository.TweetRepository;
import com.emreguney.twitter.service.TweetService;
import com.emreguney.twitter.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TweetServiceImpl implements TweetService {

    Logger logger = LoggerFactory.getLogger(TweetServiceImpl.class);
    private TweetRepository tweetRepository;
    private RetweetRepository retweetRepository;

    private LikedTweetRepository likedTweetRepository;


    UserService userService;


    public TweetServiceImpl(TweetRepository tweetRepository, RetweetRepository retweetRepository,
                            UserService userService, LikedTweetRepository likedTweetRepository) {
        this.tweetRepository = tweetRepository;
        this.retweetRepository = retweetRepository;
        this.userService = userService;
        this.likedTweetRepository = likedTweetRepository;
    }

    @Override
    public List<Tweet> getAllTweets() {
        List<Tweet> tweets = tweetRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        return tweets;

    }

    @Override
    public Optional<Tweet> getTweetById(long id) {
        return tweetRepository.findById(id);
    }

    @Override
    public List<Tweet> getAllTweetsByUsername(String username) {
        List<Tweet> tweets = tweetRepository.getAllTweetsByUsername(username);
        return tweets;
    }

    @Override
    public Tweet saveTweet(Tweet tweet) {
        return tweetRepository.save(tweet);
    }

    @Override
    public List<Retweet> getAllRetweets() {
        List<Retweet> retweets = retweetRepository.findAll();
        return retweets;
    }

    @Override
    public List<Retweet> getRetweetsByUserId(long id) {
        return retweetRepository.getRetweetsByUserId(id);
    }

    @Override
    public List<Retweet> getRetweetsByTweetId(long id) {
        return retweetRepository.getRetweetsByTweetId(id);
    }

    @Override
    public Retweet getRetweetByTweetIdAndUserId(long tweetId, long userId) {
        return retweetRepository.getRetweetByTweetIdAndUserId(tweetId, userId);
    }

    @Override
    public Integer getRetweetCountByTweetId(long id) {
        return retweetRepository.getRetweetCountByTweetId(id);
    }

    public Retweet newRetweet(long userId, long tweetId) {
        // get current user <! for now just 1 !>
        Optional<User> user = userService.validateUserWithId(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("There is no user with your id");
        } else {
            // get tweet
            Optional<Tweet> tweet = validateTweetWithId(tweetId);
            if (tweet.isEmpty()) {
                throw new RuntimeException("There is no tweet with this Id");
            }
            // if retweet is already exists delete or create
            Retweet retweet = deleteOrCreateRetweet(user.get(), tweet.get());
            if (retweet == null) {
                return null;
            }
            return retweet;

        }

    }

    @Override
    public Retweet deleteOrCreateRetweet(User user, Tweet tweet) {
        if (deleteRetweet(user.getId(), tweet.getId())) {
            return null;
        } else {
            Retweet newRetweet = new Retweet().builder().user(user).tweet(tweet).retweetDate(new Date()).build();
            return retweetRepository.save(newRetweet);
        }
    }

    @Override
    public Boolean deleteRetweet(long userId, long tweetId) {
        Optional<Retweet> retweet = retweetRepository.findRetweetByUserIdAndTweetId(tweetId, userId);
        if (!retweet.isPresent()) {
            return false;
        }
        retweetRepository.deleteById(retweet.get().getId());
        return true;
    }

    @Override
    public Optional<Tweet> validateTweetWithId(long id) {
        Optional<Tweet> tweet = tweetRepository.findById(id);
        if (tweet.isPresent()) {
            return tweet;
        } else {
            return null;
        }
    }

    @Override
    public List<LikedTweet> getAllLikes() {
        List<LikedTweet> likedTweets = likedTweetRepository.findAll();
        return likedTweets;
    }

    @Override
    public List<LikedTweet> getAllLikesOfUserByUserId(long id) {
        return likedTweetRepository.getLikesByUserId(id);
    }

    @Override
    public List<LikedTweet> getLikesByTweetId(long id) {
        return likedTweetRepository.getLikesByTweetId(id);
    }

    @Override
    public LikedTweet getLikeByTweetIdAndUserId(long tweetId, long userId) {
        return likedTweetRepository.getLikeByTweetIdAndUserId(tweetId, userId);
    }

    @Override
    public Integer getLikeCountByTweetId(long id) {
        return likedTweetRepository.getLikeCountByTweetId(id);
    }

    @Override
    public LikedTweet like(long userId, long tweetId) {
        // get current user <! for now just 1 !>
        Optional<User> user = userService.validateUserWithId(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("There is no user with your id");
        } else {
            // get tweet
            Optional<Tweet> tweet = validateTweetWithId(tweetId);
            if (tweet.isEmpty()) {
                throw new RuntimeException("There is no tweet with this Id");
            }
            // if like is already exists delete or create
            LikedTweet likedTweet = likeOrUnlikeTweet(user.get(), tweet.get());
            if (likedTweet == null) {
                return null;
            }
            return likedTweet;

        }
    }


    @Override
    public LikedTweet likeOrUnlikeTweet(User user, Tweet tweet) {

        if (unlike(user.getId(), tweet.getId())) {
            return null;
        } else {
            LikedTweet newLikedTweet = new LikedTweet().builder().user(user).tweet(tweet).likeDate(new Date()).build();
            return likedTweetRepository.save(newLikedTweet);
        }
    }

    @Override
    public Tweet newQuote(long tweetId, Tweet quote) throws Exception {
        Tweet tweet = tweetRepository.findById(tweetId).orElseThrow(() -> new Exception("There is no tweet like this."));
        quote.setQuoteTweet(tweet);
        Tweet newQuoteTweet = saveTweet(quote);
        tweet.getQuotes().add(newQuoteTweet);
        return newQuoteTweet;
    }

    @Override
    public Integer getQuotesCountByTweetId(long tweetId) {
        return tweetRepository.getQuotesCountByTweetId(tweetId);
    }

    @Override
    public Tweet newReply(long tweetId, Tweet reply) throws Exception {
        Tweet tweet = tweetRepository.findById(tweetId).orElseThrow(() -> new Exception("There is no tweet like this."));
        reply.setParentTweetId(tweetId);
        Tweet newReplyTweet = saveTweet(reply);
        tweet.getReplies().add(newReplyTweet);
        return newReplyTweet;
    }

    @Override
    public Boolean unlike(long userId, long tweetId) {
        Optional<LikedTweet> likedTweet = likedTweetRepository.findLikedTweetsByUserIdAndTweetId(tweetId, userId);
        if (!likedTweet.isPresent()) {
            return false;
        }
        likedTweetRepository.deleteById(likedTweet.get().getId());
        return true;
    }


}
