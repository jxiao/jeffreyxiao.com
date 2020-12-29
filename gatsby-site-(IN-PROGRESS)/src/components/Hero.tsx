import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

const IMG_SIZE = "12.5rem"

const HeroSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
`

const HeadshotWrapper = styled.div<{}>`
  border-radius: 50%;
  height: ${IMG_SIZE};
  width: ${IMG_SIZE};
  overflow: hidden;
`

const Biography = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`

const Hero = () => {
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "jeffreyxiao.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 256) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  const { fluid } = data.file.childImageSharp

  return (
    <>
      <HeroSection>
        <HeadshotWrapper>
          <Img fluid={fluid} style={{ width: IMG_SIZE, height: IMG_SIZE }} />
        </HeadshotWrapper>
        {/* <img src="../images/jeffreyxiao.jpg" alt="jeffrey-xiao-headshot" /> */}
        <Biography>
          <h1>Hi, I'm Jeffrey Xiao!</h1>
          <h3>CS @ UPenn</h3>
        </Biography>
      </HeroSection>
    </>
  )
}

export default Hero
