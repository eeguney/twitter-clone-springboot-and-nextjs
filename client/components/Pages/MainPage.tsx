import Head from 'next/head'
import React from 'react'
import { PAGE_TIMELINE } from '../../constants/types'
import Container from '../Container'
import Content from '../Content/Content'
import Navbar from '../Navbar/Navbar'
import { ModalList, Modals } from '../UI/Modals'



const MainPage = () => {
  return (
    <div className="main">
    <Head>
      <title>Home / Twitter for Elon Musk</title>
      <meta name="description" content="Hey Elon, you can buy this!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container>

      <Navbar />
      
      <Content newTweet={true} label="Home" pageContent={PAGE_TIMELINE} />

     
      
    </Container>
  </div>
  )
}

export default MainPage