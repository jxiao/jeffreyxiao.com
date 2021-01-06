import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FluidObject } from "gatsby-image"
import Card from "./Card"

interface ProjectsNode {
  node: {
    html: string
    frontmatter: {
      title: string
      description: string
      link: string
      repo: string
      tech_stack: string[]
      start: string
      end: string
      color: string
      image: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
      collaborators: string[]
    }
  }
}

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(projects)/" } }
        sort: { order: ASC, fields: [frontmatter___order] }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
              link
              repo
              tech_stack
              start
              end
              color
              image {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
              collaborators
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
      {(edges as ProjectsNode[]).map(
        (
          {
            node: {
              html,
              frontmatter: {
                title,
                description,
                link,
                repo,
                tech_stack,
                start,
                end,
                image,
                color,
                collaborators,
              },
            },
          },
          index
        ) => {
          const fluid = image?.childImageSharp?.fluid

          const subtitle = [
            start && end && (start != end ? `${start} - ${end}` : `${start}`),
          ]
            .filter(Boolean)
            .join("")

          let stack = tech_stack.join(", ")
          stack = "Tech Stack: " + stack

          return (
            <Card
              key={title}
              title={title}
              image={fluid}
              subtitle={subtitle}
              content={description}
              footer={stack}
              tech={tech_stack}
              left_image={true} //{index % 2 == 0}  // <-- enable left and right
              aspect_ratio={fluid.aspectRatio}
              html={html}
              link={link}
              repo={repo}
              color={color}
              collaborators={collaborators}
            />
          )
        }
      )}
    </>
  )
}

export default Projects
