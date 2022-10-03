import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import styles from "../../styles/Modals.module.scss";
import { IconList, Icons } from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CardList, Cards } from "./Cards";
import { ButtonList, Buttons } from "./Buttons";
import { getTweetById, newQuote, newReply } from "../api";
import { useCookies } from "react-cookie";
import {
  addReply,
  addTweet,
  increaseReplyCount,
} from "../../store/slices/tweetSlice";
import {
  removeCenterTopPopup,
  setCenterTopPopup,
} from "../../store/slices/popupSlice";
import { CENTER_TOP_OK } from "../../constants/popup";
import LikedAndRetweetByModal from "./LikedAndRetweetByModal";
import { LIKES_MODAL, RETWEETS_MODAL } from "../../constants/types";
export enum ModalList {
  NewQuote,
  NewReply,
}

interface ModalProps {
  modal: ModalList;
}

Modal.setAppElement("#__next");

export const Modals = (props: ModalProps): JSX.Element => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const [tweetOfQuote, setTweetOfQuote] = useState<any>(null);

  const router = useRouter();

  const [cookie, setCookie] = useCookies(["user"]);

  const [quoteText, setQuoteText] = useState("");

  const getTweet = async () => {
    if (router.query.newquote || router.query.newreply) {
      const { data } = await getTweetById(
        Number(router.query.newquote ?? router.query.newreply),
        cookie.user
      );

      setTweetOfQuote(data);
    }
  };

  useEffect(() => {
    getTweet();
  }, [router.query.newquote, router.query.newreply]);

  const saveQuote = async () => {
    const { data } = await newQuote(
      { userId: user.id, text: quoteText },
      Number(router.query.newquote),
      cookie.user
    );
    if (data) {
      dispatch(addTweet(data));
      dispatch(
        setCenterTopPopup({
          text: "Your tweet is on timeline...",
          type: CENTER_TOP_OK,
        })
      );
      setTimeout(() => {
        dispatch(removeCenterTopPopup());
      }, 3000);
      router.push("/");
    }
  };

  const saveReply = async () => {
    const { data } = await newReply(
      { userId: user.id, text: quoteText },
      Number(router.query.newreply),
      cookie.user
    );
    if (data) {
      dispatch(increaseReplyCount(Number(router.query.newreply)));
      router.push("/")
    }
  };

  return (
    <Modal
      isOpen={
        !!router.query.newquote ||
        !!router.query.newreply ||
        !!router.query.likes ||
        !!router.query.retweets
      }
      onRequestClose={() => router.back()}
      overlayClassName="overlay"
      className="quote_modal"
    >
      {/* like modal */}
      {!!router.query.likes || !!router.query.retweets ? (
        <div className={styles.like_and_retweet_modal_inner}>
          <header>
            <button className={styles.btn__close} onClick={() => router.back()}>
              <Icons icon={IconList.Close} size={20} color="#222" />
            </button>
            <label>
              {!!router.query.likes
                ? "Liked by"
                : !!router.query.retweets
                ? "Retweeted by"
                : ""}
            </label>
          </header>
          <LikedAndRetweetByModal
            tweetId={
              Number(router.query.likes) || Number(router.query.retweets)
            }
            type={
              !!router.query.likes
                ? LIKES_MODAL
                : !!router.query.retweets
                ? RETWEETS_MODAL
                : ""
            }
          />
        </div>
      ) : null}
      {!!router.query.likes == false && !!router.query.retweets == false && (
        <div className={styles.quote_modal_inner}>
          <button className={styles.btn__close} onClick={() => router.back()}>
            <Icons icon={IconList.Close} size={20} color="#222" />
          </button>
          <header>
            <img src="https://pbs.twimg.com/profile_images/1505643178522722304/S3_zal7g_normal.jpg" />
            <input
              type="text"
              onChange={(e) => setQuoteText(e.target.value)}
              placeholder="Add a comment"
            />
          </header>
          <Cards
            card={CardList.QuoteTweet}
            tweet_id={tweetOfQuote?.id}
            user_id={tweetOfQuote?.user.id}
            username={tweetOfQuote?.user.username}
            usertitle={tweetOfQuote?.user.fullname}
            tweet={tweetOfQuote?.text}
            time=""
            commment_count={0}
            retweet_count={tweetOfQuote?.retweetCount}
            like_count={tweetOfQuote?.like_count}
            likedByUser={tweetOfQuote?.likedByUser}
            retweetedByUser={tweetOfQuote?.retweetedByUser}
            inSingle={false}
          />

          <footer>
            <Buttons
              button={ButtonList.Small}
              label="Tweet"
              onClick={
                !!router.query.newquote
                  ? saveQuote
                  : !!router.query.newreply
                  ? saveReply
                  : () => {}
              }
            />
          </footer>
        </div>
      )}
    </Modal>
  );
};
