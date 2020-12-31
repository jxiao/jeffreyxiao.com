import React from "react"
import styled from "styled-components"
import Hero from "./Hero"
import Projects from "./Projects"
import Education from "./Education"
import Experience from "./Experience"
import Contact from "./Contact"
import { M1, M2, M3, M4, M5, M6, device } from "../constants/measurements"

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 25%;
  padding: ${M1} 0;
  width: 50%;

  @media ${device.tablet} {
    width: 80%;
    margin-left: 10%;
  }

  @media ${device.phone} {
    width: 90%;
    margin-left: 5%;
  }
`

const SectionTitle = styled.h3`
  margin-bottom: 0.5rem;
`

const HR = styled.hr`
  width: 50vw;

  @media ${device.tablet} {
    width: 80vw;
  }

  @media ${device.phone} {
    width: 90vw;
  }
`

const Section = ({
  title,
  children,
  id,
}: {
  title: string
  children: React.ReactNode | React.ReactNodeArray
  id: string
}): React.ReactElement => (
  <SectionWrapper id={id}>
    <SectionTitle>{title}</SectionTitle>
    <HR />
    {children}
  </SectionWrapper>
)

const Home = () => {
  return (
    <>
      <Hero />
      <Section title={"Projects"} id={"projects"}>
        <Projects />
      </Section>
      <Section title={"Education"} id={"education"}>
        <Education />
      </Section>
      <Section title={"Experience"} id={"experience"}>
        <Experience />
      </Section>
      <Section title={"Contact"} id={"contact"}>
        <Contact />
      </Section>
    </>
  )
}

export default Home
