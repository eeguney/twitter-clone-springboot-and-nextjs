import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import {
  getAuthenticatedUser,
  getTweetById,
  IUser,
} from "../../components/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { ITweet } from "..";
import { useRouter } from "next/router";
import SingleTweetPage from "../../components/Pages/SingleTweetPage";

type Props = {
  authenticatedUser?: IUser;
  tweet: ITweet;
};

const SingleTweet = (props: Props) => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.authenticatedUser || props.authenticatedUser == null) {
      router.push("/login");
    }

    dispatch(setUser(props.authenticatedUser));
  }, []);

  return (
    props.authenticatedUser ? <SingleTweetPage tweet={props.tweet} /> : null
  );
};

export const getServerSideProps = async (ctx: any) => {
  // get cookie
  let access_token = ctx.req.headers.cookie;

  const id = ctx.params.tweetID;
  // split
  let authenticatedUser = null;
  if (access_token != null || access_token != undefined) {
    access_token = access_token.split("user=")[1];
    const { sub }: { sub: string } = jwtDecode(access_token);
    authenticatedUser = await getAuthenticatedUser(sub, access_token);
  }

  const tweet = await getTweetById(Number(id), access_token);

  return {
    props: {
      authenticatedUser: authenticatedUser ? authenticatedUser.data : null,
      tweet: tweet.data,
    },
  };
};

export default SingleTweet;
