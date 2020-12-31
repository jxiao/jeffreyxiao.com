import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { M2, M3, M4, device } from "../constants/measurements"
import { MEDIUM_FONT_WEIGHT, BOLD_FONT_WEIGHT } from "../constants/fonts"

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
    // height: 100vh;
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

const NavLinks = ({ open, setOpen }) => {
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
    <SectionList open={open} ref={wrapperRef}>
      <li>
        <SectionIndividual to="/#projects" onClick={() => setOpen(false)}>
          projects
        </SectionIndividual>
      </li>
      <li>
        <SectionIndividual to="/#education" onClick={() => setOpen(false)}>
          education
        </SectionIndividual>
      </li>
      <li>
        <SectionIndividual to="/#experience" onClick={() => setOpen(false)}>
          experience
        </SectionIndividual>
      </li>
      <li>
        <SectionIndividual to="/#contact" onClick={() => setOpen(false)}>
          contact
        </SectionIndividual>
      </li>
    </SectionList>
  )
}

export default NavLinks
