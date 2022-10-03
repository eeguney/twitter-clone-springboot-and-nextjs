import Link from "next/link";
import { IconList, Icons } from "./Icons";
import styles from "../../styles/Links.module.scss";

interface LinksProps {
  icon: IconList;
  bold?: boolean;
  link: string;
  label: string;
  class?: string;
}

interface WidgetTrendsLinkProps {
  trendCause: string;
  title: string;
  tweetCount: string;
}

export const Links = {
  NavbarLinks: (props: LinksProps): JSX.Element => {
    return (
      <Link href={props.link}>
        <a
          role="link"
          className={`${props.bold ? styles.bold : ""} ${props.class}`}
        >
          <Icons icon={props.icon} bold={props.bold} size={26} color="black" />
          <label className={props.bold ? styles.bold : ""}>{props.label}</label>
        </a>
      </Link>
    );
  },
  NewTweetLink: (props: LinksProps): JSX.Element => {
    return (
      <Link href={props.link}>
        <a role="link" className={styles.newTweetLink}>
          <Icons icon={props.icon} bold={props.bold} size={26} color="black" />
          <label className={props.bold ? styles.bold : ""}>{props.label}</label>
        </a>
      </Link>
    );
  },
  WidgetTrendsLink: (props: WidgetTrendsLinkProps): JSX.Element => {
    return(
      <Link href="">
          <a className={styles.widgetTrendsForYou}>
            <div className={styles.item}>
              <div className={styles.left}>
                <span className={styles.desc}>{props.trendCause}</span>
                <span className={styles.hashtag}>#{props.title}</span>
                <span className={styles.count}>{props.tweetCount} Tweets</span>
              </div>
              <div className={styles.options}>
                <Icons
                  icon={IconList.HorizontalThreeDots}
                  size={21}
                  color="#555"
                />
              </div>
            </div>
          </a>
        </Link>
    )
  }
};
