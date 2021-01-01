import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { M2, M3, M4, device } from "../constants/measurements"
import { MEDIUM_FONT_WEIGHT, BOLD_FONT_WEIGHT } from "../constants/fonts"

const StyledBurger = styled.div`
  width: ${M4};
  height: ${M4};
  position: absolute;
  top: ${M2};
  right: ${M2};
  z-index: 100;
  display: none;

  @media ${device.tablet} {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }

  div {
    width: ${M4};
    height: 0.25rem;
    background-color: ${({ open }: any) => (open ? "#ccc" : "#000")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.125s linear;

    &:nth-child(1) {
      transform: ${({ open }: any) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      diplay: ${({ open }: any) => (open ? "none" : "initial")};
      opacity: ${({ open }: any) => (open ? "0" : "1")};
    }
    &:nth-child(3) {
      transform: ${({ open }: any) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`

const SectionList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: ${M2} 0;

  @media ${device.tablet} {
    flex-flow: column nowrap;
    position: absolute;
    background-color: #fff;
    display: ${({ open }: any) => (open ? "flex" : "none")};
    top: 0;
    right: 0;
    width: 30vw;
    min-width: 200px;
    padding: ${M4};
    transition: transform 0.125s ease-in-out;
    z-index: 5;
    border-radius: 1rem;
  }
`

const SectionIndividual = styled(Link)`
  text-decoration: none;
  font-size: ${M3};
  font-weight: ${MEDIUM_FONT_WEIGHT};
  margin-right: ${M2};
  color: #404040;
`

const Burger = () => {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  useEffect(() => {
    function handleOutsideClick(e: { target: any }) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [wrapperRef])

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
    }
  }, [open])

  return (
    <div ref={wrapperRef}>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>

      <SectionList open={open}>
        <li>
          <SectionIndividual
            to="/#projects"
            onClick={e => {
              // e && e.preventDefault()
              // document.getElementById("projects").scrollIntoView()
              setOpen(false)
              e.stopPropagation()
            }}
          >
            projects
          </SectionIndividual>
        </li>
        <li>
          <SectionIndividual
            to="/#education"
            onClick={e => {
              // e && e.preventDefault()
              // document.getElementById("education").scrollIntoView()
              setOpen(false)
              e.stopPropagation()
            }}
          >
            education
          </SectionIndividual>
        </li>
        <li>
          <SectionIndividual
            to="/#experience"
            onClick={e => {
              // e && e.preventDefault()
              // document.getElementById("experience").scrollIntoView()
              setOpen(false)
              e.stopPropagation()
            }}
          >
            experience
          </SectionIndividual>
        </li>
        <li>
          <SectionIndividual
            to="/#skills"
            onClick={e => {
              // e && e.preventDefault()
              // document.getElementById("skills").scrollIntoView()
              setOpen(false)
              e.stopPropagation()
            }}
          >
            skills
          </SectionIndividual>
        </li>
        <li>
          <SectionIndividual
            to="/#contact"
            onClick={e => {
              // e && e.preventDefault()
              // document.getElementById("contact").scrollIntoView()
              setOpen(false)
              e.stopPropagation()
            }}
          >
            contact
          </SectionIndividual>
        </li>
      </SectionList>
    </div>
  )
}

export default Burger
