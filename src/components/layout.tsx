/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Navbar from "./Navbar"
import Footer from "./Footer"
import "./layout.css"
import { FONT } from "../constants/fonts"

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: ${FONT};
`

const ContentContainer = styled.div`
  flex-grow: 1;
`

const Layout = ({ children }: any) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <LayoutContainer>
      <ContentContainer>
        <Navbar />
        {children}
      </ContentContainer>
      <Footer />
    </LayoutContainer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
