import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { M2, M3, M4, M6, device } from "../constants/measurements"
import { MEDIUM_FONT_WEIGHT } from "../constants/fonts"
import { Link as ScrollLink } from "react-scroll"

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

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
    padding: ${M6} ${M4} ${M4};
    transition: transform 0.125s ease-in-out;
    z-index: 5;
    border-radius: 1rem 0 0 1rem;
    margin: 0;
  }
`

const SectionIndividual = styled(Link)`
  text-decoration: none;
  font-size: ${M3};
  font-weight: ${MEDIUM_FONT_WEIGHT};
  margin-right: ${M2};
  color: #404040;
`

const SectionTag = styled(ScrollLink)`
  text-decoration: none;
  font-size: ${M3};
  font-weight: ${MEDIUM_FONT_WEIGHT};
  margin-right: ${M2};
  color: #404040;
`

const SCROLL_DURATION = 500
const SCROLL_SMOOTH_ANIMATION = "easeInOutQuad"

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
    <>
      {open && <Background />}
      <div ref={wrapperRef}>
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>

        <SectionList open={open}>
          <li>
            <SectionTag
              activeClass="active"
              to="projects"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={0}
              duration={SCROLL_DURATION}
              onClick={() => setOpen(false)}
            >
              projects
            </SectionTag>
          </li>
          <li>
            <SectionTag
              activeClass="active"
              to="education"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={0}
              duration={SCROLL_DURATION}
              onClick={() => setOpen(false)}
            >
              education
            </SectionTag>
          </li>
          <li>
            <SectionTag
              activeClass="active"
              to="experience"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={0}
              duration={SCROLL_DURATION}
              onClick={() => setOpen(false)}
            >
              experience
            </SectionTag>
          </li>
          <li>
            <SectionTag
              activeClass="active"
              to="skills"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={0}
              duration={SCROLL_DURATION}
              onClick={() => setOpen(false)}
            >
              skills
            </SectionTag>
          </li>
          <li>
            <SectionTag
              activeClass="active"
              to="contact"
              spy={true}
              smooth={SCROLL_SMOOTH_ANIMATION}
              offset={0}
              duration={SCROLL_DURATION}
              onClick={() => setOpen(false)}
            >
              contact
            </SectionTag>
          </li>
        </SectionList>
      </div>
    </>
  )
}

export default Burger
