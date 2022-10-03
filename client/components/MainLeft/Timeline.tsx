import React from "react";
import { useSelector } from "react-redux";
import { ITweet } from "../../pages";
import { RootState } from "../../store/store";
import { CardList, Cards } from "../UI/Cards";

const Timeline = () => {
  const tweets: ITweet = useSelector((state: RootState) => state.tweet);
  return (
    <>
      {tweets.tweet.length > 0 &&
        tweets.tweet.map((tweet, index: number) => (
          <Cards
            key={index}
            card={CardList.BasicTweet}
            commment_count={tweet.replyCount}
            like_count={tweet.likeCount}
            profilephoto="https://pbs.twimg.com/profile_images/1174800194183028736/MWAI7Wa2_400x400.png"
            retweet_count={tweet.retweetCount}
            time="1h"
            tweet={tweet.text}
            tweet_id={tweet.id}
            user_id={tweet.user.id}
            username={tweet.user.username}
            usertitle={tweet.user.fullname}
            likedByUser={tweet.likedByUser}
            retweetedByUser={tweet.retweetedByUser}
            quoteTweet={tweet.quoteTweet}
          />
        ))}
    </>
  );
};

export default Timeline;
