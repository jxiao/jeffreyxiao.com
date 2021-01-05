import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FluidObject } from "gatsby-image"
import Entry from "./Entry"

interface ExperienceNode {
  node: {
    html: string
    frontmatter: {
      start: string
      end: string
      company: string
      title: string
      location: string
      image: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }
  }
}

const Experience = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(experience)/" } }
        sort: { order: ASC, fields: [frontmatter___order] }
      ) {
        edges {
          node {
            frontmatter {
              start
              end
              company
              title
              location
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
      {(edges as ExperienceNode[]).map(
        (
          {
            node: {
              html,
              frontmatter: { start, end, company, title, image, location },
            },
          },
          i
        ) => {
          const fluid = image?.childImageSharp?.fluid

          const mergedTitle = [title, company].filter(Boolean).join(", ")
          const subtitle = [location, start && end && `${start} - ${end}`]
            .filter(Boolean)
            .join(" --- ")

          // NOTE: SKIP THE FIRST EXPERIENCE HERE
          return (
            i != 0 && (
              <Entry
                key={mergedTitle}
                title={mergedTitle}
                image={fluid}
                subtitle={subtitle}
                content={html}
              />
            )
          )
        }
      )}
    </>
  )
}

export default Experience
