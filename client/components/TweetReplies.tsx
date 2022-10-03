import { useState } from 'react'
import { newReply } from './api';
import styles from '../styles/TweetReplies.module.scss'


type Props = {
    userId: number;
    tweetID: number;
    token: string;
}

const TweetReplies = (props: Props) => {

    const [replyText, setReplyText] = useState("");
    
    const addReply = async () => {
        const { data } = await newReply(
          { userId: props.userId, text: replyText },
          Number(props.tweetID),
          props.token
        );
      }

  return (
    <div className={styles.replies}>
        <div className={styles.newReply}>
        <input type="text" onChange={(e) => setReplyText(e.target.value)} />
        <button onClick={addReply}>SEND</button>
      </div> 
      <div className={styles.replyList}></div>
    </div>
  )
}

export default TweetReplies;