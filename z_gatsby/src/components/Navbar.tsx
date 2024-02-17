import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled, { keyframes } from "styled-components"
import { M2, M4 } from "../constants/measurements"
import { BOLD_FONT_WEIGHT } from "../constants/fonts"
import Burger from "./Burger"
import { GREEN } from "../constants/colors"

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const Blink = keyframes`
0% {
  opacity: 1;
}
50% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`

const Title = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  font-size: ${M4};
  font-weight: ${BOLD_FONT_WEIGHT};
  margin: ${M2} !important;
  color: var(--color-title);
  &:after {
    content: "";
    position: absolute;
    display: inline-block;
    background-color: ${GREEN};
    vertical-align: top;
    width: 12px;
    height: ${M4};
    margin-left: 2px;
    border-radius: 1px;
    animation: ${Blink};
    animation-duration: 1.75s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
  }
`

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          navTitle
        }
      }
    }
  `)
  return (
    <Header>
      <Title to="/">{data.site.siteMetadata.navTitle}</Title>
      <nav>
        <Burger />
      </nav>
    </Header>
  )
}

export default Navbar
