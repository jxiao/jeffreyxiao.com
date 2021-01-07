import React from "react"
import styled from "styled-components"
import { M1, DEVICE } from "../constants/measurements"
import Projects from "../components/Projects"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ThemeContext from "../context/ThemeContext"
import Helmet from "react-helmet"

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

const H1 = styled.h1`
  text-align: center;
`

const ProjectsPage = () => (
  <ThemeContext.Consumer>
    {theme => (
      <>
        <Helmet
          bodyAttributes={{
            class: theme.dark ? "dark" : "light",
          }}
        />
        <Layout>
          <SEO title={"Projects"} />
          <H1>My Projects</H1>
          <SectionWrapper>
            <Projects />
          </SectionWrapper>
        </Layout>
      </>
    )}
  </ThemeContext.Consumer>
)

export default ProjectsPage
