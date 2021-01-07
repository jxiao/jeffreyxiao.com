import React from "react"
import styled from "styled-components"
import { Link } from "react-scroll"
import {
  SCROLL_DURATION,
  SCROLL_SMOOTH_ANIMATION,
  DEVICE,
} from "../constants/measurements"
import ThemeContext from "../context/ThemeContext"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  width: fit-content;
  padding: 0 0.95rem;
  line-height: 2rem;

  @media ${DEVICE.tablet}, (max-height: 480px) {
    display: none;
  }
`

const H4 = styled.h4`
  font-size: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: solid 1px;
  margin-bottom: 0.75rem;
`

const Contents = styled.nav`
  display: flex;
  flex-direction: column;
`

const SectionLink = styled(Link)`
  cursor: pointer;
`

const SCROLL_OFFSET = 0 //-200 //-440 //-200

const TableOfContents = () => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <Wrapper>
          <H4>Contents</H4>
          <Contents>
            <SectionLink
              activeClass="active"
              to="projects"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={SCROLL_OFFSET}
              duration={SCROLL_DURATION}
              //   dark={theme.dark ? 1 : 0}
            >
              Projects
            </SectionLink>
            <SectionLink
              activeClass="active"
              to="education"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={SCROLL_OFFSET}
              duration={SCROLL_DURATION}
              //   dark={theme.dark ? 1 : 0}
            >
              Education
            </SectionLink>
            <SectionLink
              activeClass="active"
              to="experience"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={SCROLL_OFFSET}
              duration={SCROLL_DURATION}
              //   dark={theme.dark ? 1 : 0}
            >
              Experience
            </SectionLink>
            <SectionLink
              activeClass="active"
              to="skills"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={SCROLL_OFFSET}
              duration={SCROLL_DURATION}
              //   dark={theme.dark ? 1 : 0}
            >
              Skills
            </SectionLink>
            <SectionLink
              activeClass="active"
              to="contact"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={SCROLL_OFFSET}
              duration={SCROLL_DURATION}
              //   dark={theme.dark ? 1 : 0}
            >
              Contact
            </SectionLink>
          </Contents>
        </Wrapper>
      )}
    </ThemeContext.Consumer>
  )
}

export default TableOfContents
