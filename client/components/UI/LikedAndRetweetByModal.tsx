import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getLikesByTweetId, getRetweetsByTweetId } from "../api";
import { useCookies } from "react-cookie";
import styles from "../../styles/LikedAndRetweetByModal.module.scss";
import { LIKES_MODAL, RETWEETS_MODAL } from "../../constants/types";

type Props = {
  tweetId: number;
  type: string;
};

const LikedAndRetweetByModal = (props: Props) => {
  const router = useRouter();

  const [list, setList] = useState<any>([]);

  const [cookie, setCookie] = useCookies(["user"]);

  const getRetweets = async () => {
    const response = await getRetweetsByTweetId(props.tweetId, cookie.user);
    setList(response.data);
  };

  const getLikes = async () => {
    const response = await getLikesByTweetId(props.tweetId, cookie.user);
    setList(response.data);
  };

  useEffect(() => {
    props.type == LIKES_MODAL
      ? getLikes()
      : props.type == RETWEETS_MODAL
      ? getRetweets()
      : () => {};
  }, [router.query.likes]);

  return (
    <div className={styles.likedByList}>
      {list.length < 1 && <h3>There is no data.</h3>}

      {list.map((like: any, index: number) => (
        <Link
          key={index}
          href={{
            pathname: "/user/" + like.user.username,
          }}
        >
          <a>
            <div className={styles.likeItem}>
              <img src="https://pbs.twimg.com/profile_images/1505643178522722304/S3_zal7g_normal.jpg" />
              <div className={styles.likeItemUser}>
                <h3>{like.user.fullname}</h3>
                <span>@{like.user.username}</span>
                <p>
                  Writer, creator, artist. ✨ I write guides and build tools for
                  part-time creators. I Tweet about: ✏️ Writing 🚀 Notion 🧠
                  Mindful productivity
                </p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default LikedAndRetweetByModal;
