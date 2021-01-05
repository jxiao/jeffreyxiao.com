import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Home from "../components/Home"

const IndexPage = () => (
  <Layout>
    <SEO title={"Jeffrey Xiao"} />
    <Home />
  </Layout>
)

export default IndexPage
