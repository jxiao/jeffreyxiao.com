import React from "react"
import { Link } from "gatsby"

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
