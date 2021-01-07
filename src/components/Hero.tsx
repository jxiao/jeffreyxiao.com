import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

const IMG_SIZE = "12.5rem"

const HeroSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 690px) {
    flex-direction: column;
    align-items: center;
  }
`

const HeadshotWrapper = styled.div<{}>`
  border-radius: 50%;
  height: ${IMG_SIZE};
  width: ${IMG_SIZE};
  overflow: hidden;

  @media (max-width: 690px) {
    margin-bottom: 0.5rem;
  }
`

const Biography = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;

  @media (max-width: 690px) {
    h3 {
      margin-bottom: 0rem;
    }
  }
`

const useMouse = () => {
  const [position, setPosition] = useState({ x: null, y: null })
  useEffect(() => {
    function handle(e: MouseEvent) {
      setPosition({ x: e.pageX, y: e.pageY })
    }
    document.addEventListener("mousemove", handle)
    return () => document.removeEventListener("mousemove", handle)
  })

  return position
}

const Hero = () => {
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "jeffreyxiao.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 256) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `
  )
  const { fluid } = data.file.childImageSharp
  const { x, y } = useMouse()
  return (
    <>
      <HeroSection>
        <HeadshotWrapper>
          <Img
            fluid={fluid}
            style={{ width: IMG_SIZE, height: IMG_SIZE }}
            draggable={false}
          />
        </HeadshotWrapper>
        <Biography>
          <h1>Hi, I'm Jeffrey Xiao!</h1>
          <h3>CS @ UPenn</h3>
          {/* <h4>
            {x}, {y}
          </h4> */}
        </Biography>
      </HeroSection>
    </>
  )
}

export default Hero
