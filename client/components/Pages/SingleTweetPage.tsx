import Head from 'next/head'
import React from 'react'
import { PAGE_SINGLE_TWEET } from '../../constants/types'
import { ITweet } from '../../pages'
import Container from '../Container'
import Content from '../Content/Content'
import Navbar from '../Navbar/Navbar'

type Props = {
    tweet: ITweet
}

const SingleTweetPage = (props: Props) => {
  return (
    <div className="main">
    <Head>
      <title>{`${props.tweet.user.fullname} on Twitter: "${props.tweet.text.split(0,30)}..."`}</title>
      <meta name="description" content="Hey Elon, you can buy this!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container>

      <Navbar />

      <Content newTweet={false} label="Tweet" pageContent={PAGE_SINGLE_TWEET} singleTweet={props.tweet} />
      
    </Container>
  </div>
  )
}

export default SingleTweetPage