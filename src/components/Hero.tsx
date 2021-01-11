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

const useMouse = ({ data }) => {
  const [position, setPosition] = useState({ x: null, y: null })
  useEffect(() => {
    function handle(e: MouseEvent) {
      const headshot = document.getElementById("headshot")
      const coords = {
        x: headshot.offsetLeft + headshot.offsetWidth / 2,
        y: headshot.offsetTop + headshot.offsetHeight / 2,
      }
      setPosition({ x: e.pageX - coords.x, y: e.pageY - coords.y })

      // const sub = document.getElementById("sub")
      // const image = document.getElementsByClassName("profile")[0]
      // if (position.x <= 0) {
      //   sub.innerHTML = "LEFT"
      //   // image.style.display = "none"
      // } else {
      //   sub.innerHTML = "RIGHT"
      //   // image.style.display = "block"
      // }
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
        hero: file(relativePath: { eq: "jeffreyxiao.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 256) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        prof: file(relativePath: { eq: "profs.png" }) {
          childImageSharp {
            fluid(maxWidth: 256) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `
  )
  const { fluid } = data.hero.childImageSharp
  const { x, y } = useMouse({ data })
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
          <h1 id={"headshot"}>Hi, I'm Jeffrey Xiao!</h1>
          <h3 id={"sub"}>CS @ UPenn</h3>
          {/* <div className="headshots" style={{ overflow: "hidden" }}>
            <Img
              fluid={data.prof.childImageSharp.fluid}
              draggable={false}
              className={"profile"}
            />
          </div> */}
          {/* <img
            id="image"
            src={
              "./Users/jeffreyxiao/Documents/GitHub/Personal-Website/src/images/prof.png"
            }
            alt={"image"}
            width="100px"
            height="100px"
            style={{ margin: "auto" }}
          /> */}
        </Biography>
      </HeroSection>
    </>
  )
}

export default Hero
