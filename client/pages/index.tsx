import { getAllTweets, getAuthenticatedUser, IUser } from "../components/api";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../store/slices/authSlice";
import { setTweet } from "../store/slices/tweetSlice";
import MainPage from "../components/Pages/MainPage";
import { useRouter } from "next/router";

type IProps = {
  tweets: ITweet;
  authenticatedUser?: IUser;
  router?: any;
};

export type ITweet = {
  user: any;
  tweet: [
    {
      id: number;
      text: string;
      user: {
        id: number;
        email: string;
        fullname: string;
        password: string;
        username: string;
        about: string;
        country: string;
        website: string;
        gender: string;
      };
      retweetCount: number;
      likeCount: number;
      replyCount: number;
      likedByUser: boolean;
      retweetedByUser: boolean;
      quoteTweet: any
    }
  ];
};



const Home = (props: IProps) => {

  const router = useRouter();
  
  const dispatch = useDispatch();

  useEffect(() => {
    
    if(!props.authenticatedUser || props.authenticatedUser == null) {
      router.push("/login")
    }

    dispatch(setUser(props.authenticatedUser));
    dispatch(setTweet(props.tweets));
  }, []);

  return  props.authenticatedUser ? <MainPage /> : null;

};

export const getServerSideProps = async (ctx: any) => {
  // get cookie
  let access_token = ctx.req.headers.cookie;
  // split
  let authenticatedUser = null;
  if (access_token != null) {
    access_token = access_token.split("user=")[1];
    const { sub }: { sub: string } = jwtDecode(access_token);
    authenticatedUser = await getAuthenticatedUser(sub, access_token);
  }
  // make api call with token
  const tweets = await getAllTweets(access_token);
  return {
    props: {
      tweets: tweets.data,
      authenticatedUser: authenticatedUser ? authenticatedUser.data : null,
    },
  };
};

export default Home;
