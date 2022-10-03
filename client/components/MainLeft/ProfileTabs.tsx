import { useState, useEffect } from "react";
import styles from "../../styles/ProfileTabs.module.scss";
import { ITweet } from "../../pages";
import { CardList, Cards } from "../UI/Cards";

type Props = {
  tweets?: ITweet[];
};

const ProfileTabs = (props: Props) => {

  const [activeTab, setactiveTab] = useState(1);


  return (
    <div className={styles.profileTabs}>
      <div className={styles.tabHeader}>
        <button
          className={activeTab == 1 ? styles.active : ""}
          onClick={() => setactiveTab(1)}
        >
          <span>Tweets</span>
        </button>
        <button
          className={activeTab == 2 ? styles.active : ""}
          onClick={() => setactiveTab(2)}
        >
          <span>Tweets & replies</span>
        </button>
        <button
          className={activeTab == 3 ? styles.active : ""}
          onClick={() => setactiveTab(3)}
        >
          <span>Media</span>
        </button>
        <button
          className={activeTab == 4 ? styles.active : ""}
          onClick={() => setactiveTab(4)}
        >
          <span>Likes</span>
        </button>
      </div>
      <div className={styles.tabs}>
        {activeTab == 1 && <TweetsTab tweets={props.tweets} />}
        {activeTab == 2 && <RepliesTab  tweets={props.tweets} />}
        {activeTab == 3 && <div>3</div>}
        {activeTab == 4 && <div>4</div>}
      </div>
    </div>
  );
};

const TweetsTab = (props: Props) => {
  return (
    <div>
      {props.tweets &&
        props.tweets.map((tweet, index: number) => (
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
            inSingle={false}
          />
        ))}
    </div>
  );
};

const RepliesTab = (props: Props) => {
    return (
      <div>
        {props.tweets &&
          props.tweets.filter((tweet) => tweet.parentTweetId != null).map((tweet, index: number) => (
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
              inSingle={false}
            />
          ))}
      </div>
    );
  };

export default ProfileTabs;
