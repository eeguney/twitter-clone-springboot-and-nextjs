import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { SITE_ADRESS } from "../../constants";
import { NewTweetProps } from "../MainLeft/NewTweet";


type AxiosType = {
  baseURL: string;
  withCredentials: boolean;
  headers?: AxiosRequestHeaders;
};

const APISETTINGSWHEADER: AxiosType = {
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: `Bearer ss`,
  },
};

const APISETTINGS: AxiosType = {
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
};

const APISETTINGSWITHOUTAPI: AxiosType = {
  baseURL: `${SITE_ADRESS}/`,
  withCredentials: false,
};

const APIWHEADER: AxiosInstance = axios.create(APISETTINGSWHEADER);

const API: AxiosInstance = axios.create(APISETTINGS);

const APIWITHOUTAPI: AxiosInstance = axios.create(APISETTINGSWITHOUTAPI);

export interface IUser {
  id: number;
  fullname: string;
  password: string;
  username: string;
}

interface ITweet {
  id: number;
  text: string;
  user: IUser;
}

interface ILoginForm {
  access_token: string;
}

export const getAllTweets = (access_token: string) => axios.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).get<ITweet[]>("tweet");

export const getAllTweetsByUsername = (username: string, access_token: string) => axios.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).get<ITweet[]>("tweet/all/username/" + username);

export const getUserByUsername = (username: string, access_token: string) => axios.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).get<IUser>("user/username/" + username);

export const getTweetById = (id: number, access_token: string) => axios.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).get<ITweet[]>(`tweet/${id}`);

export const login = (form: FormData) =>
  APIWITHOUTAPI.post<ILoginForm>("login", form);

export const getAuthenticatedUser = (username: string, access_token: string) =>  axios
.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).get<IUser[]>(`user/username/${username}`);


export const newTweet = (tweet: NewTweetProps, access_token: string) =>  axios
.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).post<ITweet[]>(`tweet`, tweet);
  
export const newQuote = (quote: NewTweetProps, tweet_id: number, access_token: string) =>  axios
.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).post<ITweet[]>(`tweet/quote/` + tweet_id, quote);

export const newReply = (reply: NewTweetProps, tweet_id: number, access_token: string) =>  axios
.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).post<ITweet[]>(`tweet/reply/` + tweet_id, reply);


export const like = (userId: number, tweetId: number, access_token: string) =>  axios
.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).post(`liked-tweet`, {
  userId,
  tweetId
});

export const getLikesByTweetId = (tweetId: number, access_token: string) => axios.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).get<ITweet[]>(`liked-tweet/all/tweetid/${tweetId}`);

export const retweet = (tweetId: number, access_token: string) =>  axios
.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).post(`retweet`, {
  tweetId
});
  

export const getRetweetsByTweetId = (tweetId: number, access_token: string) => axios.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
}).get<ITweet[]>(`retweet/all/tweetid/${tweetId}`);
