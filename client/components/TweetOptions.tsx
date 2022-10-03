import React, { useState } from "react";
import { IconList, Icons } from "./UI/Icons";
import styles from "../styles/TweetOptions.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCookies } from "react-cookie";
import { like, retweet } from "./api";
import {
  likeTweetFromStore,
  retweetStore,
  unlikeTweetFromStore,
  unRetweetStore,
} from "../store/slices/tweetSlice";
import Link from "next/link";

interface TweetOptionsProps {
  tweetID: number;
  retweet: number;
  comment: number;
  like: number;
  likedByUser: boolean;
  retweetedByUser: boolean;
}

const TweetOptions = (props: TweetOptionsProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const [retweetSelector, setretweetSelector] = useState(false);

  const [cookie, setCookie] = useCookies(["user"]);

  const retweetTweet = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const { data } = await retweet(props.tweetID, cookie.user);

    if (data) {
      dispatch(retweetStore(props.tweetID));
    } else {
      dispatch(unRetweetStore(props.tweetID));
    }

    setretweetSelector(false);
  };

  const likeTweet = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const { data } = await like(user.id, props.tweetID, cookie.user);

    if (data) {
      dispatch(likeTweetFromStore(props.tweetID));
    } else {
      dispatch(unlikeTweetFromStore(props.tweetID));
    }
  };

  return (
    <>
      <div className={styles.options}>
        <div className={`${`${styles.tweetOption} ${styles.comment}`}`}>
          <button type="button">
            <Link
              href={{
                query: {
                  newreply: props.tweetID,
                },
              }}
            >
              <a>
                <Icons icon={IconList.Comment} size={18} color="#444" />
              </a>
            </Link>
          </button>
          <label>{props.comment}</label>
        </div>
        <div className={`${styles.tweetOption} ${styles.retweet}`}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              props.retweetedByUser
                ? retweetTweet
                : setretweetSelector(!retweetSelector);
            }}
          >
            <Icons
              icon={IconList.Retweet}
              size={18}
              color={`${props.retweetedByUser ? "#00ba7c" : "#444"}`}
            />
          </button>
          <label style={props.retweetedByUser ? { color: "#00ba7c" } : {}}>
            {props.retweet}
          </label>
        </div>
        <div className={`${styles.tweetOption} ${styles.like}`}>
          <button type="button" onClick={likeTweet}>
            <Icons
              icon={props.likedByUser ? IconList.LikeBold : IconList.Like}
              size={18}
              color="#444"
            />
          </button>
          <label>{props.like}</label>
        </div>
        <div className={`${styles.tweetOption} ${styles.share}`}>
          <button type="button">
            <Icons icon={IconList.Share} size={18} color="#444" />
          </button>
        </div>
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
                query: {
                  newquote: props.tweetID,
                },
              }}
            >
              <a>Quote Tweet</a>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default TweetOptions;
