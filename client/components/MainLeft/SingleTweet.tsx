import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setReply } from "../../store/slices/tweetSlice";
import { RootState } from "../../store/store";
import styles from "../../styles/SingleTweet.module.scss";
import { like, retweet } from "../api";
import { CardList, Cards } from "../UI/Cards";
import { IconList, Icons } from "../UI/Icons";
import SingleReplyForm from "./SingleReplyForm";
import SingleTweetReplies from "./SingleTweetReplies";

type Props = {
  singleTweet?: any;
};

const SingleTweet = (props: Props) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);

  const [cookie, setCookie] = useCookies(["user"]);

  const [retweetSelector, setretweetSelector] = useState(false);

  const [retweetedByUser, setRetweetedByUser] = useState(false);

  const [likedByUser, setLikedByUser] = useState(false);

  useEffect(() => {
    if (props.singleTweet) {
      dispatch(setReply(props.singleTweet.replies));
      setRetweetedByUser(props.singleTweet.retweetedByUser);
      setLikedByUser(props.singleTweet.likedByUser);
    }
  }, [router.query.tweetID]);

  const likeTweet = async () => {
    const { data } = await like(user.id, props.singleTweet.id, cookie.user);

    if (data) {
      setLikedByUser(true);
    } else {
      setLikedByUser(false);
    }
  };

  const retweetTweet = async () => {
    const response = await retweet(props.singleTweet.id, cookie.user);
    if (response.data) {
      setRetweetedByUser(true);
    } else {
      setRetweetedByUser(false);
    }

    setretweetSelector(false);
  };

  if (!props.singleTweet) {
    return <h1>There is no tweet like this.</h1>;
  } else {
    return (
      <div className={styles.tweet}>
        <div className={styles.tweetUser}>
          <div className={styles.userProfilePhoto}>
            <Link
              href={{
                pathname: "/user/" + props.singleTweet.user.username,
              }}
            >
              <a>
                <img src="https://pbs.twimg.com/profile_images/1174800194183028736/MWAI7Wa2_400x400.png" />
              </a>
            </Link>
          </div>
          <label>
            <h3>
              <Link
                href={{
                  pathname: "/user/" + props.singleTweet.user.username,
                }}
              >
                <a>{props.singleTweet.user.fullname}</a>
              </Link>
            </h3>
            <span>@{props.singleTweet.user.username}</span>
          </label>
        </div>
        <div className={styles.content}>
          <div className={styles.tweetText}>{props.singleTweet.text}</div>
        </div>
        {props.singleTweet.quoteTweet != null && (
          <Link
            href={{
              href: "/tweet/",
              query: {
                tweetID: props.singleTweet.quoteTweet.quoteTweet.id,
              },
            }}
          >
            <a>
              <Cards
                card={CardList.QuoteTweet}
                inSingle={true}
                tweet_id={props.singleTweet.quoteTweet.quoteTweet.id}
                user_id={props.singleTweet.quoteTweet.quoteTweet.user.id}
                username={props.singleTweet.quoteTweet.quoteTweet.user.username}
                usertitle={
                  props.singleTweet.quoteTweet.quoteTweet.user.fullname
                }
                tweet={props.singleTweet.quoteTweet.quoteTweet.text}
                time=""
                commment_count={0}
                retweet_count={
                  props.singleTweet.quoteTweet.quoteTweet.retweetCount
                }
                like_count={props.singleTweet.quoteTweet.quoteTweet.like_count}
                likedByUser={
                  props.singleTweet.quoteTweet.quoteTweet.likedByUser
                }
                retweetedByUser={
                  props.singleTweet.quoteTweet.quoteTweet.retweetedByUser
                }
              />
            </a>
          </Link>
        )}
        <div className={styles.tweetDate}>9:53 AM · Sep 9, 2022</div>
        <div className={styles.tweetLikeRetweetInfo}>
          <span>
            <Link
              href={{
                query: {
                  tweetID: props.singleTweet.id,
                  retweets: props.singleTweet.id,
                },
              }}
            >
              <a>
                <strong>{props.singleTweet.retweetCount}</strong> Retweet
              </a>
            </Link>
          </span>
          <span>
            <Link
              href={{
                query: {
                  tweetID: props.singleTweet.id,
                  likes: props.singleTweet.id,
                },
              }}
            >
              <a>
                <strong>{props.singleTweet.likeCount}</strong> Likes
              </a>
            </Link>
          </span>
        </div>
        <div className={styles.tweetOptions}>
          <button type="button" className={styles.comment}>
            <Link
              href={{
                query: {
                  tweetID: props.singleTweet.id,
                  newreply: props.singleTweet.id,
                },
              }}
            >
              <a>
                <Icons icon={IconList.Comment} size={23} color="#444" />
              </a>
            </Link>
          </button>

          <button
            type="button"
            className={styles.retweet}
            onClick={(e) => {
              e.preventDefault();
              retweetedByUser
                ? retweetTweet()
                : setretweetSelector(!retweetSelector);
            }}
          >
            <Icons
              icon={IconList.Retweet}
              size={24}
              color={`${retweetedByUser ? "#00ba7c" : "#444"}`}
            />
          </button>

          <button
            type="button"
            className={styles.like}
            onClick={(e) => {
              e.preventDefault();
              likeTweet();
            }}
          >
            <Icons
              icon={likedByUser ? IconList.LikeBold : IconList.Like}
              size={24}
              color="#444"
            />
          </button>

          <button type="button" className={styles.share}>
            <Icons icon={IconList.Share} size={23} color="#444" />
          </button>

          <div
            className={styles.retweetSelector}
            style={!retweetSelector ? { display: "none" } : {}}
          >
            <button onClick={retweetTweet}>Retweet</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setretweetSelector(false);
              }}
            >
              <Link
                href={{
                  pathname: "/tweet/" + props.singleTweet.id,
                  query: {
                    newquote: props.singleTweet.id,
                  },
                }}
              >
                <a>Quote Tweet</a>
              </Link>
            </button>
          </div>
        </div>
        <SingleReplyForm
          tweetID={props.singleTweet.id}
          userID={props.singleTweet.user.id}
        />
        <SingleTweetReplies />
      </div>
    );
  }
};

export default SingleTweet;
