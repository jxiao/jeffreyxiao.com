import React from "react"
import styled from "styled-components"
import { M1, DEVICE } from "../constants/measurements"
import emailjs from "emailjs-com"

import GitHubIcon from "./icons/GitHub"
import LinkedInIcon from "./icons/LinkedIn"

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  @media ${DEVICE.phone} {
    flex-direction: column;
  }
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0;

  @media ${DEVICE.phone} {
    width: 100%;
  }
`
const EmailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${M1};
`

const ContentSubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${M1};
`

const SubjectInput = styled.input`
  margin-bottom: ${M1};
`

const ContentArea = styled.textarea`
  flex-grow: 1;
  resize: none;
`

const SubmitButton = styled.button`
  margin-left: ${M1};
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-grow: 1;
  padding: 0 2.5%;

  @media ${DEVICE.phone} {
    padding-top: 1rem;
    flex-direction: row;
  }
`

const EMAIL_MARGIN = 2.5
const TO_EMAIL = "jeffrey.xiao1@gmail.com"
const DISABLE_FORM = true

interface EmailState {
  email: string
  subject: string
  content: string
  isVerified: boolean
}

class Contact extends React.Component<{}, EmailState> {
  constructor(props: any) {
    super(props)

    this.state = {
      email: "",
      subject: "",
      content: "",
      isVerified: false,
    }
  }

  sendEmail(e: any) {
    e.preventDefault()

    emailjs
      .sendForm(
        "service_zetya4i",
        "template_aswfhew",
        e.target,
        "user_d4ui4aQoxvohdx9Xls1mT"
      )
      .then(
        result => {
          console.log(result.text)
        },
        error => {
          console.log(error.text)
        }
      )
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  handleSubmit(e: any) {
    e.preventDefault()
    if (this.validateEmail(this.state.email)) {
      console.log(this.state)
      this.sendEmail(e)
      this.setState({
        email: "",
        subject: "",
        content: "",
      })
    }
  }

  render() {
    return (
      <ContactContainer>
        <FormContainer onSubmit={e => this.handleSubmit(e)} autoComplete="off">
          <EmailContainer>
            <input
              type="email"
              placeholder="Your Email (required)"
              name="email"
              value={this.state.email}
              required
              onChange={e => this.setState({ email: e.target.value })}
              style={{ width: `${50 - EMAIL_MARGIN / 2}%` }}
              disabled={DISABLE_FORM}
            />
            <input
              type="text"
              value={`To: ${TO_EMAIL}`}
              disabled
              style={{ width: `${50 - EMAIL_MARGIN / 2}%` }}
            />
          </EmailContainer>
          <SubjectInput
            name="subject"
            type="text"
            value={this.state.subject}
            placeholder="Subject"
            onChange={e => this.setState({ subject: e.target.value })}
            disabled={DISABLE_FORM}
          />
          <ContentSubmitContainer>
            <ContentArea
              name="content"
              placeholder="Content"
              rows={5}
              value={this.state.content}
              onChange={e => this.setState({ content: e.target.value })}
              disabled={DISABLE_FORM}
            />
            <SubmitButton type="submit" disabled={DISABLE_FORM}>
              SEND
            </SubmitButton>
          </ContentSubmitContainer>
        </FormContainer>
        <IconContainer>
          <a
            href="https://github.com/jxiao"
            target="_BLANK"
            rel="noopener noreferrer"
          >
            <GitHubIcon height={"50"} fill={"#000000"} />
          </a>
          <a
            href="https://www.linkedin.com/in/jeffrey-xiao/"
            target="_BLANK"
            rel="noopener noreferrer"
          >
            <LinkedInIcon height={"50"} fill={"#0077B5"} />
          </a>
        </IconContainer>
      </ContactContainer>
    )
  }
}

export default Contact
