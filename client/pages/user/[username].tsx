import React from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { ITweet } from "..";
import {
  getAllTweetsByUsername,
  getAuthenticatedUser,
  getUserByUsername,
  IUser,
} from "../../components/api";
import { setUser } from "../../store/slices/authSlice";
import ProfilePage from "../../components/Pages/ProfilePage";

type Props = {
  authenticatedUser?: IUser;
  user: IUser;
  tweets: ITweet[];
};

const Profile = (props: Props) => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.authenticatedUser || props.authenticatedUser == null) {
      router.push("/login");
    }

    dispatch(setUser(props.authenticatedUser));
  }, []);

  return props.authenticatedUser ? (
    <ProfilePage tweets={props.tweets} user={props.user} />
  ) : null;
};

export const getServerSideProps = async (ctx: any) => {
  // get cookie
  let access_token = ctx.req.headers.cookie;

  const username = ctx.params.username;
  // split
  let authenticatedUser = null;
  if (access_token != null || access_token != undefined) {
    access_token = access_token.split("user=")[1];
    const { sub }: { sub: string } = jwtDecode(access_token);
    authenticatedUser = await getAuthenticatedUser(sub, access_token);
  }

  const [user, tweets] = await Promise.all([
    getUserByUsername(username, access_token),
    getAllTweetsByUsername(username, access_token),
  ]);

  return {
    props: {
      authenticatedUser: authenticatedUser ? authenticatedUser.data : null,
      tweets: tweets.data,
      user: user.data,
    },
  };
};

export default Profile;
