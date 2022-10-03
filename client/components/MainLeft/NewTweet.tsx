import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "../../styles/NewTweet.module.scss";
import { newTweet } from "../api";
import { ButtonList, Buttons } from "../UI/Buttons";
import { useCookies } from "react-cookie"
import { addTweet } from "../../store/slices/tweetSlice";
import { removeCenterTopPopup, setCenterTopPopup } from "../../store/slices/popupSlice";
import { CENTER_TOP_ERROR, CENTER_TOP_OK } from "../../constants/popup";

type Props = {};

export type NewTweetProps = {
  userId: number
  text: string
}

const NewTweet = (props: Props) => {

  const user = useSelector((state: RootState) => state.auth.user)

  const dispatch = useDispatch();

  const [cookie, setCookie] = useCookies(["user"])

  const [newTweetForm, setnewTweetForm] = useState<NewTweetProps>({userId: 0, text: ""});

  const handleTweet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewTweetForm({ text: event.target.value, userId: user ? user.id : 0 })
  }

  const sendTweetToApi = async() => {
    
    const response = await newTweet(newTweetForm, cookie.user)
    
    if(response.data) {
      setnewTweetForm({ userId: 0, text: "" })
      dispatch(addTweet(response.data));
      dispatch(setCenterTopPopup({text: "Your tweet is on timeline...", type: CENTER_TOP_OK}));
      setTimeout(() => {
        dispatch(removeCenterTopPopup());
      }, 3000);
    } else {
      dispatch(setCenterTopPopup({text:"Something went wrong...", type: CENTER_TOP_ERROR}));
    }

  }

  

  return (
    <div className={styles.newTweet}>
      <div className={styles.top}>
        <img src="https://pbs.twimg.com/profile_images/1505643178522722304/S3_zal7g_normal.jpg" />
        <div className={styles.tweetInputs}>
          <div
            className={`${styles.selectButtonForTweetAudience} ${styles.hidden}`}
          >
            Everyone
          </div>
          <input type="text" name="text" value={newTweetForm.text} onChange={handleTweet} placeholder="What's happening?" autoComplete="off" />
          <div
            className={`${styles.selectButtonForWhoCanReply} ${styles.hidden}`}
          >
            Everyone can reply
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.options}>
          <Buttons button={ButtonList.Image} color="#1d9bf0" />
          <Buttons button={ButtonList.Gif} color="#1d9bf0" />
          <Buttons button={ButtonList.Emoji} color="#1d9bf0" />
        </div>
        <Buttons button={ButtonList.Small} onClick={sendTweetToApi} background="#1d9bf0" label="Tweet" />
      </div>
    </div>
  );
};

export default NewTweet;
