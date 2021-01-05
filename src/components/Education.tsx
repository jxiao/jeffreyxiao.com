import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FluidObject } from "gatsby-image"
import Entry from "./Entry"

interface EducationNode {
  node: {
    html: string
    frontmatter: {
      title: string
      location: string
      start: string
      end: string
      image: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }
  }
}

const Education = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(education)/" } }
        sort: { order: ASC, fields: [frontmatter___order] }
      ) {
        edges {
          node {
            frontmatter {
              title
              location
              start
              end
              image {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
            html
          }
        }
      }
    }
  `)
  const { edges } = data.allMarkdownRemark
  return (
    <>
      {(edges as EducationNode[]).map(
        ({
          node: {
            html,
            frontmatter: { start, end, title, image, location },
          },
        }) => {
          const fluid = image?.childImageSharp?.fluid

          const subtitle = [location, start && end && `${start} - ${end}`]
            .filter(Boolean)
            .join(" --- ")

          return (
            <Entry
              key={title}
              title={title}
              image={fluid}
              subtitle={subtitle}
              content={html}
            />
          )
        }
      )}
    </>
  )
}

export default Education
