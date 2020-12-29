import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { M2, M3, M4 } from "../constants/measurements"
import {
  FONT,
  NORMAL_FONT_WEIGHT,
  MEDIUM_FONT_WEIGHT,
  BOLD_FONT_WEIGHT,
} from "../constants/fonts"

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Title = styled(Link)`
  text-decoration: none;
  font-size: ${M4};
  font-weight: ${BOLD_FONT_WEIGHT};
  margin: ${M2} !important;
`

const SectionList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: ${M2};
`

const SectionIndividual = styled(Link)`
  text-decoration: none;
  font-size: ${M3};
  font-weight: ${MEDIUM_FONT_WEIGHT};
  margin-right: ${M2};
`

const Navbar = () => {
  return (
    <Header>
      <Title to="/">~/jeffreyxiao$</Title>
      <nav>
        <SectionList>
          <li>
            <SectionIndividual to="/">projects</SectionIndividual>
          </li>
          <li>
            <SectionIndividual to="/">education</SectionIndividual>
          </li>
          <li>
            <SectionIndividual to="/">experience</SectionIndividual>
          </li>
          <li>
            <SectionIndividual to="/">contact</SectionIndividual>
          </li>
        </SectionList>
      </nav>
    </Header>
  )
}

export default Navbar
