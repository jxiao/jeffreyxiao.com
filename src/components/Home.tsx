import React from "react"
import styled from "styled-components"
import Hero from "./Hero"
import Projects from "./Projects"
import Education from "./Education"
import Experience from "./Experience"
import Skills from "./Skills"
import Contact from "./Contact"
import { M1, DEVICE } from "../constants/measurements"

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 25%;
  padding: ${M1} 0;
  width: 50%;

  @media ${DEVICE.tablet} {
    width: 80%;
    margin-left: 10%;
  }

  @media ${DEVICE.phone} {
    width: 90%;
    margin-left: 5%;
  }
`

const SectionHeader = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  position: relative;
`

const SectionTitle = styled.h3`
  margin-bottom: 0;
`

const SectionSubtitle = styled.p`
  font-size: 12px;
  color: #807878;
  margin-bottom: 0;
  display: flex;
  flex-grow: 1;
  margin-left: 0.5rem;
  flex-direction: column-reverse;
  padding-top: 5px;
`

const HR = styled.hr`
  width: 50vw;

  @media ${DEVICE.tablet} {
    width: 80vw;
  }

  @media ${DEVICE.phone} {
    width: 90vw;
  }
`

const Section = ({
  title,
  children,
  id,
  subtitle,
}: {
  title: string
  children: React.ReactNode | React.ReactNodeArray
  id: string
  subtitle?: string
}): React.ReactElement => (
  <SectionWrapper id={id}>
    <SectionHeader>
      <SectionTitle>{title}</SectionTitle>
      <SectionSubtitle>{subtitle}</SectionSubtitle>
    </SectionHeader>
    <HR />
    {children}
  </SectionWrapper>
)

const Home = () => {
  return (
    <>
      <Hero />
      <Section
        title={"Projects"}
        id={"projects"}
        subtitle={"(click for additional info)"}
      >
        <Projects />
      </Section>
      <Section title={"Education"} id={"education"}>
        <Education />
      </Section>
      <Section title={"Experience"} id={"experience"}>
        <Experience />
      </Section>
      <Section title={"Skills"} id={"skills"}>
        <Skills />
      </Section>
      <Section title={"Contact"} id={"contact"}>
        <Contact />
      </Section>
    </>
  )
}

export default Home
