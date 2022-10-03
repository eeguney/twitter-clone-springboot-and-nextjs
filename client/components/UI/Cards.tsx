import Link from "next/link";
import styles from "../../styles/Cards.module.scss";
import TweetOptions from "../TweetOptions";

export enum CardList {
  BasicTweet,
  QuoteTweet,
}

interface CardProps {
  card: CardList;
  inSingle: boolean;
  tweet_id: number;
  user_id: number;
  username: string;
  usertitle: string;
  profilephoto?: string;
  time: string;
  tweet: string;
  commment_count: number;
  retweet_count: number;
  like_count: number;
  photos?: [string];
  likedByUser: boolean;
  retweetedByUser: boolean;
  quoteTweet?: any;
}

export const Cards = (props: CardProps): JSX.Element => {
  switch (props.card) {
    case CardList.BasicTweet:
      return (
        <Link
          href={{
            pathname: "/tweet/" + props.tweet_id,
          }}
        >
          <a>
            <div className={styles.tweet}>
              <div className={styles.userProfilePhoto}>
                <Link
                  href={{
                    pathname: "/user/" + props.username,
                  }}
                >
                  <a>
                    <img src={props.profilephoto} />
                  </a>
                </Link>
              </div>
              <div className={styles.content}>
                <label>
                  <Link
                    href={{
                      pathname: "/user/" + props.username,
                    }}
                  >
                    <a>
                      <h3>{props.usertitle}</h3>
                    </a>
                  </Link>
                  <span>@{props.username}</span>
                  <span className={styles.time}>{props.time}</span>
                </label>
                <div className={styles.tweetText}>{props.tweet}</div>

                {props.quoteTweet != null && (
                  <Cards
                    card={CardList.QuoteTweet}
                    tweet_id={props.quoteTweet.quoteTweet.id}
                    user_id={props.quoteTweet.quoteTweet.user.id}
                    username={props.quoteTweet.quoteTweet.user.username}
                    usertitle={props.quoteTweet.quoteTweet.user.fullname}
                    tweet={props.quoteTweet.quoteTweet.text}
                    time=""
                    commment_count={0}
                    retweet_count={props.quoteTweet.quoteTweet.retweetCount}
                    like_count={props.quoteTweet.quoteTweet.like_count}
                    likedByUser={props.quoteTweet.quoteTweet.likedByUser}
                    retweetedByUser={
                      props.quoteTweet.quoteTweet.retweetedByUser
                    }
                    inSingle={false}
                  />
                )}

                <footer>
                  <TweetOptions
                    comment={props.commment_count}
                    retweet={props.retweet_count}
                    like={props.like_count}
                    tweetID={props.tweet_id}
                    likedByUser={props.likedByUser}
                    retweetedByUser={props.retweetedByUser}
                  />
                </footer>
              </div>
            </div>
          </a>
        </Link>
      );
    case CardList.QuoteTweet:
      return (
        <div
          className={
            `${styles.quote_tweet} ` + `${props.inSingle && styles.inSingle}`
          }
        >
          <div className={styles.inner}>
            <header>
              <Link
                href={{
                  pathname: "/user/" + props.username,
                }}
              >
                <a>
                  <img src="https://pbs.twimg.com/profile_images/1505643178522722304/S3_zal7g_normal.jpg" />
                </a>
              </Link>
              <span className={styles.name}>
                <Link
                  href={{
                    pathname: "/user/" + props.username,
                  }}
                >
                  <a>{props.usertitle}</a>
                </Link>
              </span>
              <span className={styles.username}>@{props.username}</span>
              <span className={styles.date}>5h</span>
            </header>
            <div className={styles.tweet}>{props.tweet}</div>
          </div>
        </div>
      );
    default:
      return <></>;
  }
};
