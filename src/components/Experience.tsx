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
      parts: number
      titles: string[]
      dates: string[]
      descriptions: string[][]
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
              parts
              titles
              dates
              descriptions
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
              frontmatter: {
                start,
                end,
                company,
                title,
                image,
                location,
                parts,
                titles,
                dates,
                descriptions,
              },
            },
          },
          i
        ) => {
          const fluid = image?.childImageSharp?.fluid

          const mergedTitle = [title, company].filter(Boolean).join(", ")
          const subtitle = [location, start && end && `${start} - ${end}`]
            .filter(Boolean)
            .join(" --- ")

          return (
            <Entry
              key={mergedTitle}
              title={mergedTitle}
              image={fluid}
              subtitle={subtitle}
              content={html}
              parts={parts}
              start={start}
              end={end}
              location={location}
              company={company}
              titles={titles}
              dates={dates}
              descriptions={descriptions}
            />
          )
        }
      )}
    </>
  )
}

export default Experience
