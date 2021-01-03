import { FluidObject } from "gatsby-image"
import React, { useRef, useCallback, useEffect } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { device } from "../constants/measurements"

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  margin: 0;
`

const ModalWrapper = styled.div`
  width: 75vw;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  z-index: 10;
  border-radius: 10px;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #202020;
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
`

const DescriptionContainer = styled.div`
  text-align: center;
  width: 75%;
  padding-top: 0.5rem;

  @media ${device.tablet} {
    width: 90%;
  }

  @media ${device.phone} {
    width: 95%;
  }
`

const TableContainer = styled.table`
  text-align: center;
  width: 75%;
  margin-bottom: 0;

  @media ${device.tablet} {
    width: 90%;
  }

  @media ${device.phone} {
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
  border-radius: 3px;
  color: #222;
  line-height: 1;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  background: none 0 0 repeat scroll rgb(242, 248, 255);
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px,
    rgb(180, 231, 248) 0px 0px 0px 1px inset;
`

interface ModalProps {
  showModal: boolean
  setShowModal: any // TODO: fix type of setShowModal Dispatch<SetStateAction<boolean>>
  title: string
  image: FluidObject
  subtitle: string
  content: string
  tech: string[]
  html: string
  link?: string
  repo: string
  collaborators?: string[]
}

const Modal = ({
  showModal,
  setShowModal,
  title,
  image,
  subtitle,
  content,
  tech,
  html,
  link,
  repo,
  collaborators,
}: ModalProps) => {
  const modalRef = useRef()

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }

  const keyPress = useCallback(
    e => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false)
      }
    },
    [setShowModal, showModal]
  )

  useEffect(() => {
    document.addEventListener("keydown", keyPress)
    return () => document.removeEventListener("keydown", keyPress)
  }, [keyPress])

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              <TitleContainer>{title}</TitleContainer>
              <Img
                fluid={image}
                style={{
                  minHeight: "25vh",
                  maxHeight: "50vh",
                  width: "50vw",
                  height: "auto",
                }}
              />
              <DescriptionContainer>{content}</DescriptionContainer>
              <TableContainer>
                <tbody>
                  <TableRow>
                    <TableHeader>Date Built</TableHeader>
                    <TableInfo>{subtitle}</TableInfo>
                  </TableRow>
                  <tr>
                    <TableHeader>Tech Stack</TableHeader>
                    <TableInfo>{tech.join(", ")}</TableInfo>
                  </tr>
                  {collaborators && collaborators.length > 0 && (
                    <tr>
                      <TableHeader>Collaborators</TableHeader>
                      <TableInfo>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<div>${collaborators}</div>`,
                          }}
                        />
                      </TableInfo>
                    </tr>
                  )}
                </tbody>
              </TableContainer>
              <ButtonContainer>
                {link && (
                  <A href={link} target="_BLANK" rel="noopener noreferrer">
                    <StyledButton>Live Project</StyledButton>
                  </A>
                )}
                <A href={repo} target="_BLANK" rel="noopener noreferrer">
                  <StyledButton>Repository</StyledButton>
                </A>
              </ButtonContainer>
            </ModalContent>
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  )
}

export default Modal
