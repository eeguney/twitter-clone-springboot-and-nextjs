import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { CENTER_TOP_OK } from "../../constants/popup";
import { PAGE_SINGLE_TWEET, PAGE_TIMELINE, PAGE_USER_PROFILE } from "../../constants/types";
import { ITweet } from "../../pages";
import { RootState } from "../../store/store";
import styles from "../../styles/MainLeft.module.scss";
import popupStyles from "../../styles/Popup.module.scss";
import NewTweet from "./NewTweet";
import SingleTweet from "./SingleTweet";
import Timeline from "./Timeline";
import { IconList, Icons } from "../UI/Icons";
import { IUser } from "../api";
import SingleProfile from "./SingleProfile";

type Props = {
  newTweet: boolean;
  label: string;
  pageContent: string;
  singleTweet?: ITweet;
  tweets?: ITweet[],
  user?: IUser,
  userTweetCount?: number
};

const MainLeft = (props: Props) => {

  const router = useRouter();
  
  const popup = useSelector((state: RootState) => state.popup);

  console.log(router.pathname)

  return (
    <section className={styles.mainLeft}>
      <div className={styles.pageHeader}>
        <div className={styles.left}>
          <button type="button" className={styles.mobileMenuButton}>
            <img src="https://pbs.twimg.com/profile_images/1505643178522722304/S3_zal7g_normal.jpg" />
          </button>
          {
            router.pathname == "/tweet/[tweetID]" || router.pathname == "/user/[username]" ?
            <button type="button" className={styles.pageHeaderGoBack} onClick={() => router.back()}>
              <Icons icon={IconList.Back} size={19} color="#222" />
            </button> : null
          }
          {
            props.userTweetCount ?
            <div className={styles.pageHeaderWithCount}>
              <label>{props.label}</label>
              <span>{props.userTweetCount} Tweets</span>
            </div>
            :
            <label>{props.label}</label>
          }
          
        </div>
        <div></div>
      </div>
      <div className={styles.wrapper}>
        {props.newTweet && <NewTweet />}

        {popup.centerTopPopup !== null && (
          <div
            className={
              popup.centerTopPopup.type == CENTER_TOP_OK
                ? popupStyles.centerOk
                : popupStyles.centerError
            }
          >
            {popup.centerTopPopup.text}
          </div>
        )}

        {props.pageContent == PAGE_TIMELINE ? (
          <Timeline />
        ) : props.pageContent == PAGE_SINGLE_TWEET ? (
          <SingleTweet singleTweet={props.singleTweet} />
        ) : props.pageContent == PAGE_USER_PROFILE ?
        <SingleProfile user={props.user} tweets={props.tweets} />
         : null}

      </div>
    </section>
  );
};

export default MainLeft;
