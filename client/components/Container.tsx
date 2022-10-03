import React from 'react'

type Props = {
    children: JSX.Element[] | JSX.Element
}

const Container = (props: Props) => {
  return (
    <div className="container">{props.children}</div>
  )
}

export default Container