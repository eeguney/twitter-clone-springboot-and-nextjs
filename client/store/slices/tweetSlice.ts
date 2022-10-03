import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  tweet: [],
  replies: []
};

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    setTweet: (state, action: PayloadAction<any>) => {
      state.tweet = action.payload;
    },
    likeTweetFromStore: (state, action: PayloadAction<number>) => {
      const index = state.tweet.findIndex(
        (tweet: any) => tweet.id == action.payload
      );
      state.tweet[index] = {
        ...state.tweet[index],
        likeCount: state.tweet[index].likeCount + 1,
        likedByUser: true
      };
    },
    unlikeTweetFromStore: (state, action: PayloadAction<number>) => {
      const index = state.tweet.findIndex(
        (tweet: any) => tweet.id == action.payload
      );
      state.tweet[index] = {
        ...state.tweet[index],
        likeCount: state.tweet[index].likeCount - 1,
        likedByUser: false
      };
    },
    addTweet: (state, action: PayloadAction<any>) => {
      state.tweet.unshift(action.payload);
    },
    retweetStore: (state, action: PayloadAction<number>) => {
      const index = state.tweet.findIndex(
        (tweet: any) => tweet.id == action.payload
      );
      state.tweet[index] = {
        ...state.tweet[index],
        retweetCount: state.tweet[index].retweetCount + 1,
        retweetedByUser: true
      };
    },
    unRetweetStore: (state, action: PayloadAction<number>) => {
      const index = state.tweet.findIndex(
        (tweet: any) => tweet.id == action.payload
      );
      state.tweet[index] = {
        ...state.tweet[index],
        retweetCount: state.tweet[index].retweetCount - 1,
        retweetedByUser: false
      };
    },
    setReply: (state, action: PayloadAction<any>) => {
      state.replies = action.payload;
    },
    addReply: (state, action: PayloadAction<any>) => {
      state.replies.unshift(action.payload)
    },
    increaseReplyCount: (state, action: PayloadAction<number>) => {
      const index = state.tweet.findIndex(
        (tweet: any) => tweet.id == action.payload
      );
      state.tweet[index] = {
        ...state.tweet[index],
        replyCount: state.tweet[index].replyCount + 1,
      };
    }
  },
});

export const { setTweet, likeTweetFromStore, unlikeTweetFromStore, addTweet, retweetStore, unRetweetStore, setReply, addReply, increaseReplyCount } =
  tweetSlice.actions;

export default tweetSlice.reducer;
