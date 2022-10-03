import { useState } from "react";
import Link from "next/link";
import { ButtonList, Buttons } from "../UI/Buttons";
import styles from "../../styles/SingleReplyForm.module.scss";
import { newReply } from "../api";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { addReply } from "../../store/slices/tweetSlice";

type Props = {
  tweetID: number;
  userID: number;
};

const SingleReplyForm = (props: Props) => {
  const [cookie, setCookie] = useCookies(["user"]);

  const [reply, setReply] = useState("");

  const dispatch = useDispatch();

  const replyToTweet = async () => {
    if (reply.length > 2) {
      const response = await newReply(
        { userId: props.userID, text: reply },
        props.tweetID,
        cookie.user
      );
      dispatch(addReply(response.data));
      setReply("");
    }
  };

  return (
    <div className={styles.singleReplyForm}>
      <div className={styles.reply}>
        <div className={styles.userProfilePhoto}>
          <img src="https://pbs.twimg.com/profile_images/1174800194183028736/MWAI7Wa2_400x400.png" />
        </div>
        <input
          type="text"
          placeholder="Your reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      </div>
      <div className={styles.replyFooter}>
        <Buttons
          button={ButtonList.Small}
          label="Reply"
          onClick={replyToTweet}
        />
      </div>
    </div>
  );
};

export default SingleReplyForm;
