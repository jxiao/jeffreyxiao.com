import { FluidObject } from "gatsby-image"
import React, { useRef, useCallback, useEffect } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { DEVICE } from "../constants/measurements"
import { WHITE, BLACK, COLORS, DARK_GREY } from "../constants/colors"
import ThemeContext from "../context/ThemeContext"

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
  z-index: 20;
  margin: 0;
`

const ModalWrapper = styled.div`
  max-width: 75vw;
  max-height: 95vh;
  overflow-y: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: ${({ color }: any) => color};

  color: ${({ dark }: any) => (dark ? COLORS.text.dark : COLORS.text.light)};
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
  color: string
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
  color,
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
    <ThemeContext.Consumer>
      {theme =>
        showModal ? (
          <Background onClick={closeModal} ref={modalRef}>
            <ModalWrapper showModal={showModal} dark={theme.dark} color={color}>
              <ModalContent>
                <TitleContainer dark={theme.dark}>{title}</TitleContainer>
                <Img
                  fluid={image}
                  style={{
                    minHeight: "25vh",
                    maxHeight: "50vh",
                    width: "50%",
                    height: "auto",
                    flex: "1 0 auto",
                  }}
                  draggable={false}
                />
                <DescriptionContainer>{content}</DescriptionContainer>
                <TableContainer>
                  <tbody>
                    <TableRow>
                      <TableHeader>Time Frame</TableHeader>
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
        ) : null
      }
    </ThemeContext.Consumer>
  )
}

export default Modal
