import Head from "next/head";
import React from "react";
import { PAGE_SINGLE_TWEET, PAGE_USER_PROFILE } from "../../constants/types";
import { ITweet } from "../../pages";
import { IUser } from "../api";
import Container from "../Container";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";

type Props = {
  tweets: ITweet[];
  user: IUser;
};

const ProfilePage = (props: Props) => {
  return (
    <div className="main">
      <Head>
        <title>{`${props.user.fullname} (@${props.user.username}) / Twitter`}</title>
        <meta name="description" content="Hey Elon, you can buy this!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Navbar />

        <Content
          newTweet={false}
          label={props.user.fullname}
          userTweetCount={100}
          pageContent={PAGE_USER_PROFILE}
          tweets={props.tweets}
          user={props.user}
        />
      </Container>
    </div>
  );
};

export default ProfilePage;
