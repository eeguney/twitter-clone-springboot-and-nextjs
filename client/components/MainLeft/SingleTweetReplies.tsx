import Link from "next/link";
import { useSelector } from "react-redux";
import { ITweet } from "../../pages";
import styles from "../../styles/SingleTweetReplies.module.scss";
import TweetOptions from "../TweetOptions";
import { RootState } from "../../store/store";

type Props = {};

const SingleTweetReplies = (props: Props) => {
  const replies = useSelector((state: RootState) => state.tweet.replies);

  return (
    <div className={styles.singleTweetReplies}>
      {replies.length < 1 && <h1>There is no reply yet.</h1>}
      {replies.map((tweet: ITweet, index: number) => (
        <Link
          key={index}
          href={{
            pathname: "/tweet/" + tweet.id,
          }}
        >
          <a>
            <div className={styles.tweet}>
              <div className={styles.userProfilePhoto}>
                <Link
                  href={{
                    pathname: "/user/" + tweet.user.username,
                  }}
                >
                  <a>
                    <img src="https://pbs.twimg.com/profile_images/1174800194183028736/MWAI7Wa2_400x400.png" />
                  </a>
                </Link>
              </div>
              <div className={styles.content}>
                <label>
                  <h3>
                    <Link
                      href={{
                        pathname: "/user/" + tweet.user.username,
                      }}
                    >
                      <a>{tweet.user.fullname}</a>
                    </Link>
                  </h3>
                  <span>@{tweet.user.username}</span>
                  <span className={styles.time}>5g</span>
                </label>
                <div className={styles.tweetText}>{tweet.text}</div>

                <footer>
                  <TweetOptions
                    comment={0}
                    retweet={tweet.retweetCount}
                    like={tweet.likeCount}
                    tweetID={tweet.id}
                    likedByUser={tweet.likedByUser}
                    retweetedByUser={tweet.retweetedByUser}
                  />
                </footer>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SingleTweetReplies;
