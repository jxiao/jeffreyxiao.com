import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Home from "../components/Home"
import ThemeContext from "../context/ThemeContext"
import Helmet from "react-helmet"

const IndexPage = () => (
  <ThemeContext.Consumer>
    {theme => (
      <>
        <Helmet
          bodyAttributes={{
            class: theme.dark ? "dark" : "light",
          }}
        />
        <Layout>
          <SEO title={"Jeffrey Xiao"} />
          <Home />
        </Layout>
      </>
    )}
  </ThemeContext.Consumer>
)

export default IndexPage
