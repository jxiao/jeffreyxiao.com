import React from "react"
import { FluidObject } from "gatsby-image"
import Img from "gatsby-image"
import styled from "styled-components"
import { BOLD_FONT_WEIGHT } from "../constants/fonts"
import { M3 } from "../constants/measurements"
import { MEDIUM_GREY } from "../constants/colors"

const EntryContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const EntryText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  width: 100%;
  flex-grow: 1;
`

const EntryTitle = styled.p`
  font-weight: ${BOLD_FONT_WEIGHT};
  font-size: ${M3};
  margin: 0;
`

const EntrySubtitle = styled.p`
  color: ${MEDIUM_GREY};
  font-size: 1rem;
  margin: 0;
`

const EntryContent = styled.div<{}>`
  li {
    margin-bottom: 0rem;
    overflow-wrap: normal;
  }
`

const NodeSpan = styled.span`
  display: block;
  border-radius: 50%;
  height: 9px;
  width: 9px;
  background-color: #b2b2b2;
  position: relative;
  left: -3.75rem;
  top: 1.1rem;
`

const EntryGroup = styled.li<{ isLast: any }>`
  list-style-type: none;
  position: relative;

  ${({ isLast }: any) =>
    !isLast &&
    `&:before {
    content: "";
    position: absolute;
    height: 100%;
    top: 1.5rem;
    left: -3.54rem;
    width: 2px;
    background-color: #b2b2b2;
    border-radius: 1rem
  }`}
`

interface EntryProps {
  title: string
  image: FluidObject
  subtitle: string
  content: string
  parts: number
  company: string
  titles: string[]
  dates: string[]
  start: string
  end: string
  location: string
  descriptions: string[][]
}

const Entry = ({
  title,
  image,
  subtitle,
  content,
  parts,
  company,
  titles,
  dates,
  start,
  end,
  location,
  descriptions,
}: EntryProps) => {
  const IMG_SIZE = "5rem"
  if (parts && parts > 1) {
    const text = []
    for (var i = 0; i < parts; i++) {
      const description = descriptions[i]
      const tags = []
      description.forEach(tag =>
        tags.push(
          <li key={tag} style={{ listStyleType: "disc" }}>
            {tag}
          </li>
        )
      )
      text.push(
        <div>
          <NodeSpan></NodeSpan>
          <EntryGroup isLast={i == parts - 1}>
            <EntryTitle>{titles[i]}</EntryTitle>
            <EntrySubtitle>{dates[i]}</EntrySubtitle>
            <EntryContent>
              <ul>{tags}</ul>
            </EntryContent>
          </EntryGroup>
        </div>
      )
    }
    return (
      <>
        <EntryContainer style={{ marginBottom: 0 }}>
          <div>
            <Img
              fluid={image}
              style={{ width: IMG_SIZE, height: "auto" }}
              draggable={false}
            />
          </div>
          <EntryText>
            <div>
              <EntryTitle>{company}</EntryTitle>
              <EntrySubtitle>{subtitle}</EntrySubtitle>
            </div>
          </EntryText>
        </EntryContainer>
        <EntryContainer>
          <EntryText style={{ marginLeft: "4.5rem" }}>
            <ul>
              <div style={{ position: "relative" }}>{text}</div>
            </ul>
          </EntryText>
        </EntryContainer>
      </>
    )
  } else {
    return (
      <EntryContainer>
        <div>
          <Img
            fluid={image}
            style={{ width: IMG_SIZE, height: "auto" }}
            draggable={false}
          />
        </div>
        <EntryText>
          <EntryTitle>{title}</EntryTitle>
          <EntrySubtitle>{subtitle}</EntrySubtitle>
          <EntryContent
            dangerouslySetInnerHTML={{ __html: `<div>${content}</div>` }}
          />
        </EntryText>
      </EntryContainer>
    )
  }
}

export default Entry
