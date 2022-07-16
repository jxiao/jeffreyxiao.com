import React from "react"
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
import TableOfContents from "./TableOfContents"
import { Link } from "gatsby"

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

const AllProjectsLink = styled(Link)`
  margin-left: auto;
  margin-bottom: 1rem;
  text-decoration: none;
  width: fit-content;
  padding: 0.05rem 0.25rem;
  border-radius: 3px;
  background: ${({ dark }: { dark: boolean }) =>
    dark ? "rgb(180, 231, 248)" : "rgba(4, 167, 242, 0.1)"};
  border: 1px solid
    ${({ dark }: { dark: boolean }) =>
      dark ? "rgb(180, 231, 248)" : "rgb(23, 113, 143)"};
  &:hover {
    background: ${({ dark }: { dark: boolean }) =>
      dark ? "rgb(200, 241, 255)" : "rgb(180, 231, 248)"};
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
          {/* <TableOfContents /> */}
          <Section id={"About"} dark={theme.dark} excludeHeader={true}>
            <About dark={theme.dark ? 1 : 0} />
          </Section>
          <Section
            title={"Projects"}
            id={"projects"}
            subtitle={"(click for additional info)"}
            dark={theme.dark}
          >
            <Projects />
            <AllProjectsLink to={"/projects"} dark={theme.dark ? 1 : 0}>
              See all projects
            </AllProjectsLink>
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
