import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { M1, DEVICE } from "../constants/measurements"
import { HighlightedButton } from "../constants/fonts"
import { WHITE, BLACK, COLORS, DARK_GREY } from "../constants/colors"
import ThemeContext from "../context/ThemeContext"
import Helmet from "react-helmet"

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25%;
  padding: ${M1} 0;
  height: 100%;
  width: 50%;

  @media ${DEVICE.desktop} {
    width: 70%;
    margin-left: 15%;
  }

  @media ${DEVICE.tablet} {
    width: 80%;
    margin-left: 10%;
  }

  @media ${DEVICE.phone} {
    width: 90%;
    margin-left: 5%;
  }
`

const ModalWrapper = styled.div`
  background: ${({ color }: any) => color};

  color: ${({ dark }: any) => (dark ? COLORS.text.dark : COLORS.text.light)};
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  z-index: 10;
  border-radius: 10px;
  margin-bottom: 1rem;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${COLORS.text.light};
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 75%;
  margin: 1rem;
`

const TitleContainer = styled.h1`
  text-align: center;
  color: ${DARK_GREY};
  // color: ${({ dark }: any) => (dark ? COLORS.text.dark : BLACK)};
`

const DescriptionContainer = styled.div`
  text-align: center;
  width: 75%;
  padding-top: 0.5rem;

  @media ${DEVICE.tablet} {
    width: 90%;
  }

  @media ${DEVICE.phone} {
    width: 95%;
  }
`

const TableContainer = styled.table`
  text-align: center;
  width: 75%;
  margin-bottom: 0;

  @media ${DEVICE.tablet} {
    width: 90%;
  }

  @media ${DEVICE.phone} {
    width: 95%;
  }
`

const TableRow = styled.tr`
  text-align: center;
`

const TableHeader = styled.th`
  text-align: center;
  font-size: 0.9rem;
`

const TableInfo = styled.th`
  font-weight: normal;
  text-align: center;
  font-size: 0.9rem;
`

const A = styled.a`
  color: ${COLORS.text.dark};
  text-decoration: none;
`

const StyledButton = styled.button`
  user-select: none;
  transition: background 100ms ease-in 0s;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  white-space: nowrap;
  height: 36px;
  border-width: 2px;
  border-radius: 3px;
  color: ${BLACK};
  line-height: 1;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  background: none 0 0 repeat scroll rgb(242, 248, 255);
  font-weight: 500;
`

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
`

const AllProjectsLink = styled(Link)`
  margin-bottom: 1rem;
  text-decoration: none;
  width: fit-content;
  padding: 0.05rem 0.25rem;
  border-radius: 3px;
  background: ${({ dark }: { dark: boolean }) =>
    dark ? "rgb(180, 231, 248)" : "rgba(4, 167, 242, 0.1)"};
  border: 1px solid
    ${({ dark }: { dark: boolean }) =>
      dark ? "rgb(180, 231, 248)" : "rgb(23, 113, 143)"};
  &:hover {
    background: ${({ dark }: { dark: boolean }) =>
      dark ? "rgb(200, 241, 255)" : "rgb(180, 231, 248)"};
  }
`

const ProjectTemplate = props => {
  const data = props.data.markdownRemark.frontmatter
  return (
    <ThemeContext.Consumer>
      {theme => (
        <Layout>
          <Helmet
            bodyAttributes={{
              class: theme.dark ? "dark" : "light",
            }}
          />
          <SEO title={data.title} />
          <OuterWrapper name={"OuterWrapper"}>
            <ModalWrapper dark={theme.dark} color={data.color}>
              <ModalContent>
                <TitleContainer dark={theme.dark}>{data.title}</TitleContainer>
                <Img
                  fluid={data.image?.childImageSharp?.fluid}
                  style={{
                    width: "98%",
                    height: "auto",
                    flex: "1 0 auto",
                  }}
                  draggable={false}
                />
                <DescriptionContainer>{data.content}</DescriptionContainer>
                <TableContainer>
                  <tbody>
                    <TableRow>
                      <TableHeader>Time Frame</TableHeader>
                      <TableInfo>
                        {[
                          data.start &&
                            data.end &&
                            (data.start != data.end
                              ? `${data.start} - ${data.end}`
                              : `${data.start}`),
                        ]
                          .filter(Boolean)
                          .join("")}
                      </TableInfo>
                    </TableRow>
                    <tr>
                      <TableHeader>Tech Stack</TableHeader>
                      <TableInfo>{data.tech_stack.join(", ")}</TableInfo>
                    </tr>
                    {data.collaborators && data.collaborators.length > 0 && (
                      <tr>
                        <TableHeader>Collaborators</TableHeader>
                        <TableInfo>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `<div>${data.collaborators}</div>`,
                            }}
                          />
                        </TableInfo>
                      </tr>
                    )}
                  </tbody>
                </TableContainer>
                <ButtonContainer>
                  {data.link && (
                    <A
                      href={data.link}
                      target="_BLANK"
                      rel="noopener noreferrer"
                    >
                      <StyledButton>Live Project</StyledButton>
                    </A>
                  )}
                  <A href={data.repo} target="_BLANK" rel="noopener noreferrer">
                    <StyledButton>Repository</StyledButton>
                  </A>
                </ButtonContainer>
              </ModalContent>
            </ModalWrapper>
            <div
              dangerouslySetInnerHTML={{
                __html: `<div>${props.data.markdownRemark.html}</div>`,
              }}
            />

            <AllProjectsLink to={"/projects"} dark={theme.dark}>
              Back to Projects
            </AllProjectsLink>
          </OuterWrapper>
        </Layout>
      )}
    </ThemeContext.Consumer>
  )
}

export default ProjectTemplate
