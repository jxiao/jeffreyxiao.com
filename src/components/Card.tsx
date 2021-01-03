import React, { useState, useEffect } from "react"
import { FluidObject } from "gatsby-image"
import Img from "gatsby-image"
import styled from "styled-components"
import { BOLD_FONT_WEIGHT } from "../constants/fonts"
import { M1, M2, M3, M4, M5, M6 } from "../constants/measurements"
import { device } from "../constants/measurements"
import Modal from "./Modal"

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`

const CardText = styled.div`
  display: flex;
  flex-direction: column;
`

const CardTitle = styled.p`
  font-weight: ${BOLD_FONT_WEIGHT};
  font-size: ${M3};
  margin: 0;
  flex-direction: row;
  flex-grow: 0;
`

const CardSubtitle = styled.p`
  color: #807878;
  font-size: 1rem;
  margin: 0;
  flex-grow: 1;
`

const CardContent = styled.p`
  margin-bottom: 0rem;
  overflow-wrap: normal;
  flex-grow: 1;
`

const CardFooter = styled.p`
  color: #807878;
  font-size: 0.9rem;
  font-style: italic;
  margin: 0;
`

interface CardProps {
  title: string
  image: FluidObject
  subtitle: string
  content: string
  footer: string
  // Boolean indicating whether image is on left (text on right)
  left_image?: boolean
  aspect_ratio: number
  html: string
  link: string
  repo: string
  tech: string[]
  collaborators: string[]
}

const Card = ({
  title,
  image,
  subtitle,
  content,
  footer,
  left_image = true,
  aspect_ratio,
  html,
  link,
  repo,
  tech,
  collaborators,
}: CardProps) => {
  const IMG_SIZE = "15rem"

  // TODO: fix flexbox width and height adjustments
  const width = aspect_ratio < 1 ? "15rem" : IMG_SIZE
  const height = aspect_ratio < 1 ? "10rem" : "auto"

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  useEffect(() => {
    if (showModal) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.top = `-${scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
    }
  }, [showModal])

  return (
    <CardContainer>
      {left_image && (
        <div onClick={openModal}>
          <Img
            fluid={image}
            style={{
              width: width,
              height: height,
              marginRight: "1rem",
            }}
          />
        </div>
      )}
      <CardText>
        <CardTitle onClick={openModal}>{title}</CardTitle>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          image={image}
          subtitle={subtitle}
          content={content}
          tech={tech}
          html={html}
          link={link}
          repo={repo}
          collaborators={collaborators}
        />
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardContent>{content}</CardContent>
        <CardFooter>{footer}</CardFooter>
      </CardText>

      {/* {!left_image && (
        <div>
          <Img
            fluid={image}
            style={{
              width: width,
              height: height,
              marginLeft: "1rem",
            }}
          />
        </div>
      )} */}
    </CardContainer>
  )
}

export default Card
