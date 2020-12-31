import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import NavLinks from "./NavLinks"
import { M2, M3, M4, device } from "../constants/measurements"

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

const Burger = () => {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  useEffect(() => {
    function handleOutsideClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [wrapperRef])

  //   useEffect(() => {
  //     if (open) {
  //       const scrollY = window.scrollY
  //       document.body.style.position = "fixed"
  //       document.body.style.top = `-${scrollY}px`
  //     } else {
  //       const scrollY = document.body.style.top
  //       document.body.style.position = ""
  //       document.body.style.top = ""
  //       window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
  //     }
  //   }, [open])

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <NavLinks open={open} setOpen={setOpen} />
    </>
  )
}

export default Burger
