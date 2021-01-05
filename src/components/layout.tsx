/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { ReactNode, useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Navbar from "./Navbar"
import Footer from "./Footer"
import "./layout.css"
import { FONT } from "../constants/fonts"
import ThemeContext from "../context/ThemeContext"

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: ${FONT};
`

const ContentContainer = styled.div`
  flex-grow: 1;
`

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div className={theme.dark ? "dark" : "light"}>
          <LayoutContainer>
            <ContentContainer>
              <Navbar />
              {children}
            </ContentContainer>
            <Footer />
          </LayoutContainer>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
