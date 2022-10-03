import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "../../styles/Navbar.module.scss";
import { IconList, Icons } from "../UI/Icons";
import { Links } from "../UI/Links";

type Props = {};

const Navbar = (props: Props): JSX.Element => {


  const authenticatedUser = useSelector((state: RootState) => state.auth.user);

  return (
    <header className={styles.navbar}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Icons icon={IconList.TwitterLogo} size={30} color="#1d9bf0" />
        </div>
        <nav className={styles.nav}>
          <Links.NavbarLinks
            icon={IconList.Homepage}
            label="Home"
            link="http://google.com"
            bold
          />
          <Links.NavbarLinks
            icon={IconList.Search}
            label="Search"
            link="http://google.com"
          />
          <Links.NavbarLinks
            icon={IconList.Notification}
            label="Notification"
            link="http://google.com"
          />
          <Links.NavbarLinks
            icon={IconList.Messages}
            label="Messages"
            link="http://google.com"
          />
          <Links.NavbarLinks
            icon={IconList.Bookmark}
            label="Bookmarks"
            class={styles.hiddenOnMobile}
            link="http://google.com"
          />
          <Links.NavbarLinks
            icon={IconList.Profile}
            label="Profile"
            class={styles.hiddenOnMobile}
            link="http://google.com"
          />
          <Links.NavbarLinks
            icon={IconList.SettingsMore}
            label="More"
            class={styles.hiddenOnMobile}
            link="http://google.com"
          />
        </nav>
        <Links.NewTweetLink
          icon={IconList.NewTweet}
          label="Tweet"
          link="http://google.com"
        />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.left}>
          <img src="https://pbs.twimg.com/profile_images/1505643178522722304/S3_zal7g_normal.jpg" />
          <div className={styles.username}>
            <h3>
              {authenticatedUser
                ? authenticatedUser.fullname
                : "You are not authenticated."}
            </h3>
            <p>
              @
              {authenticatedUser
                ? authenticatedUser.username
                : "You are not authenticated."}
            </p>
          </div>
        </div>
        <div className={styles.right}></div>
      </div>
    </header>
  );
};

export default Navbar;
