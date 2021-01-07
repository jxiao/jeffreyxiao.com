import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Hero from "./Hero"
import About from "./About"
import Projects from "./Projects"
import Education from "./Education"
import Experience from "./Experience"
import Skills from "./Skills"
import Contact from "./Contact"
import { M1, DEVICE } from "../constants/measurements"
import { LIGHT_GREY, MEDIUM_GREY } from "../constants/colors"
import ThemeContext from "../context/ThemeContext"

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 25%;
  padding: ${M1} 0;
  width: 50%;

  @media ${DEVICE.desktop} {
    width: 70%;
    margin-left: 15%;
  }

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
  color: ${MEDIUM_GREY};
  margin-bottom: 0;
  display: flex;
  flex-grow: 1;
  margin-left: 0.5rem;
  flex-direction: column-reverse;
  padding-top: 5px;
`

const HR = styled.hr`
  width: 50vw;
  background-color: ${({ dark }: any) => (dark ? "#dfdfdf" : LIGHT_GREY)};

  @media ${DEVICE.desktop} {
    width: 70vw;
  }

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
  dark,
  excludeHeader,
}: {
  title?: string
  children: React.ReactNode | React.ReactNodeArray
  id: string
  subtitle?: string
  dark: boolean
  excludeHeader?: boolean
}): React.ReactElement => (
  <SectionWrapper id={id}>
    {!excludeHeader && (
      <>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
          <SectionSubtitle>{subtitle}</SectionSubtitle>
        </SectionHeader>
        <HR dark={dark} />
      </>
    )}
    {children}
  </SectionWrapper>
)

const Home = () => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <Hero />
          <Section id={"About"} dark={theme.dark} excludeHeader={true}>
            <About dark={theme.dark} />
          </Section>
          <Section
            title={"Projects"}
            id={"projects"}
            subtitle={"(click for additional info)"}
            dark={theme.dark}
          >
            <Projects />
          </Section>
          <Section title={"Education"} id={"education"} dark={theme.dark}>
            <Education />
          </Section>
          <Section title={"Experience"} id={"experience"} dark={theme.dark}>
            <Experience />
          </Section>
          <Section title={"Skills"} id={"skills"} dark={theme.dark}>
            <Skills />
          </Section>
          <Section title={"Contact"} id={"contact"} dark={theme.dark}>
            <Contact />
          </Section>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

export default Home
