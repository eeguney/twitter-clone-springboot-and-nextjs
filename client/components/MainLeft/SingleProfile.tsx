import React from "react";
import Link from "next/link";
import styles from "../../styles/SingleProfile.module.scss";
import { ITweet } from "../../pages";
import { IUser } from "../api";
import { ButtonList, Buttons } from "../UI/Buttons";
import ProfileTabs from "./ProfileTabs";


type Props = {
  tweets?: ITweet[];
  user?: IUser;
};

const SingleProfile = (props: Props) => {
    console.log(props.user)
  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <div className={styles.cover}>
          <img src="https://pbs.twimg.com/profile_banners/1505642932325466112/1647811512/600x200" />
        </div>
        <div className={styles.profileHeaderTop}>
          <div className={styles.profilePhoto}>
            <img src="https://pbs.twimg.com/profile_images/1505643178522722304/S3_zal7g_normal.jpg" />
          </div>
          <Buttons button={ButtonList.Pure} label="Edit Profile" />
        </div>
        <div className={styles.profileUserInfo}>
          <div className={styles.profileFullnameAndUsername}>
            <h3>{props.user?.fullname}</h3>
            <span>@{props.user?.username}</span>
          </div>
          <p>
            isFrontendDeveloper ? 'I don't quite believe it': 'Normal person' //
            what is normal?
          </p>
        </div>
        <div className={styles.userFollowerInfo}>
            <Link href="">
                <a>
                    <strong>152</strong>
                    Following
                </a>
            </Link>
            <Link href="">
                <a>
                    <strong>247</strong>
                    Follower
                </a>
            </Link>
        </div>
      </div>

      <ProfileTabs tweets={props.tweets} />

    </div>
  );
};

export default SingleProfile;
