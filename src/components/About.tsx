import React from "react"
import styled from "styled-components"
import { LinkedText } from "../constants/fonts"

interface AboutProps {
  dark: boolean
}

const AboutContainer = styled.div`
  font-size: 1.125rem;
  line-height: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`

const About = ({ dark }: AboutProps) => {
  return (
    <AboutContainer>
      I'm a Senior at the University of Pennsylvania studying{" "}
      <LinkedText
        href="https://www.cis.upenn.edu/"
        target="_BLANK"
        rel="noopener noreferrer"
        dark={dark}
      >
        Computer Science
      </LinkedText>
      . I enjoy{" "}
      <LinkedText
        href="http://dashboard.pingryanywhere.org/"
        target="_BLANK"
        rel="noopener noreferrer"
        dark={dark}
      >
        building products to help others
      </LinkedText>
      ,{" "}
      <LinkedText
        href="http://cis1200.org"
        target="_BLANK"
        rel="noopener noreferrer"
        dark={dark}
      >
        teaching people to code
      </LinkedText>
      ,{" "}
      <LinkedText
        href="https://adventofcode.com/"
        target="_BLANK"
        rel="noopener noreferrer"
        dark={dark}
      >
        solving puzzles
      </LinkedText>
      , and{" "}
      <LinkedText
        href="https://github.com/jxiao"
        target="_BLANK"
        rel="noopener noreferrer"
        dark={dark}
      >
        learning new technologies
      </LinkedText>
      .
    </AboutContainer>
  )
}

export default About
