import React from "react";
import { ITweet } from "../../pages";
import styles from "../../styles/Content.module.scss";
import { IUser } from "../api";
import MainLeft from "../MainLeft/MainLeft";
import MainRight from "../MainRight/MainRight";

type Props = {
  newTweet: boolean;
  label: string;
  pageContent: string;
  singleTweet?: ITweet;
  tweets?: ITweet[];
  user?: IUser;
  userTweetCount?: number;
};

const Content = (props: Props) => {
  return (
    <section className={styles.content}>
      <div className={styles.wrapper}>
        <MainLeft
          newTweet={props.newTweet}
          label={props.label}
          pageContent={props.pageContent}
          singleTweet={props.singleTweet}
          tweets={props.tweets}
          user={props.user}
          userTweetCount={props.userTweetCount}
        />
        <MainRight />
      </div>
    </section>
  );
};

export default Content;
