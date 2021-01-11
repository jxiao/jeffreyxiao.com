import React, { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"
import {
  M2,
  M3,
  M4,
  M6,
  DEVICE,
  SCROLL_DURATION,
  SCROLL_SMOOTH_ANIMATION,
} from "../constants/measurements"
import { MEDIUM_FONT_WEIGHT } from "../constants/fonts"
import { Link } from "gatsby"
import { BLACK, WHITE, LIGHT_GREY, DARK_GREY } from "../constants/colors"

import ThemeContext from "../context/ThemeContext"

const RIGHT_MARGIN = "0.6rem"

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
  right: ${RIGHT_MARGIN};
  z-index: 11;
  display: none;
`

// @media ${DEVICE.tablet} {
//   display: flex;
//   justify-content: space-around;
//   flex-direction: column;
// }

// div {
//   width: ${M4};
//   height: 0.25rem;
//   background-color: ${({ dark, open }: any) => dark ? (open ? LIGHT_GREY : "#c5c5c9") : open ? LIGHT_GREY : BLACK};
//   border-radius: 10px;
//   transform-origin: 1px;
//   transition: all 0.125s linear;

//   &:nth-child(1) {
//     transform: ${({ open }: any) => (open ? "rotate(45deg)" : "rotate(0)")};
//   }
//   &:nth-child(2) {
//     diplay: ${({ open }: any) => (open ? "none" : "initial")};
//     opacity: ${({ open }: any) => (open ? "0" : "1")};
//   }
//   &:nth-child(3) {
//     transform: ${({ open }: any) => (open ? "rotate(-45deg)" : "rotate(0)")};
//   }
// }

const SectionList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: ${M2} 0;
`

// @media ${DEVICE.tablet} {
//   flex-flow: column nowrap;
//   position: absolute;
//   background-color: ${({ dark }: any) => (dark ? "#2a2b2d" : "#fff")};
//   display: ${({ open }: any) => (open ? "flex" : "none")};
//   top: 0;
//   right: 0;
//   width: 30vw;
//   min-width: 200px;
//   padding: ${M6} ${M4} ${M4};
//   transition: transform 0.125s ease-in-out;
//   z-index: 5;
//   border-radius: 1rem 0 0 1rem;
//   margin: 0;
// }

const SectionTag = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  font-size: ${M3};
  font-weight: ${MEDIUM_FONT_WEIGHT};
  margin-right: ${RIGHT_MARGIN};
  color: ${({ dark }: any) => (dark ? "#dfdfdf" : DARK_GREY)};
`

const LightDarkButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  padding-left: 0;
  margin-right: ${RIGHT_MARGIN};
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

  const keyPress = useCallback(
    e => {
      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    },
    [setOpen, open]
  )

  useEffect(() => {
    document.addEventListener("keydown", keyPress)
    return () => document.removeEventListener("keydown", keyPress)
  }, [keyPress])

  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <>{open && <Background />}</>
          <div ref={wrapperRef}>
            <StyledBurger
              open={open}
              onClick={() => setOpen(!open)}
              dark={theme.dark}
            >
              <div />
              <div />
              <div />
            </StyledBurger>
            <SectionList open={open} dark={theme.dark}>
              <li>
                <SectionTag
                  to="/"
                  onClick={() => setOpen(false)}
                  dark={theme.dark ? 1 : 0}
                >
                  home
                </SectionTag>
              </li>
              <li>
                <SectionTag
                  to="/projects"
                  onClick={() => setOpen(false)}
                  dark={theme.dark ? 1 : 0}
                >
                  projects
                </SectionTag>
              </li>
              <li>
                <LightDarkButton onClick={theme.toggleDark}>
                  {theme.dark ? <span>☀</span> : <span>🌑</span>}
                </LightDarkButton>
              </li>
            </SectionList>
          </div>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

export default Burger
