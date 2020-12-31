import React from "react"
import styled from "styled-components"
import { M1, device } from "../constants/measurements"

import GitHubIcon from "./icons/GitHub"
import LinkedInIcon from "./icons/LinkedIn"

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  @media ${device.phone} {
    flex-direction: column;
  }
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0;

  @media ${device.phone} {
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

  @media ${device.phone} {
    padding-top: 1rem;
    flex-direction: row;
  }
`

const EMAIL_MARGIN = 2.5
const TO_EMAIL = "jeffrey.xiao1@gmail.com"

interface EmailState {
  email: string
  subject: string
  content: string
}

class Contact extends React.Component<{}, EmailState> {
  constructor(props: any) {
    super(props)

    this.state = {
      email: "",
      subject: "",
      content: "",
    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  handleSubmit(e: any) {
    e.preventDefault()
    if (this.validateEmail(this.state.email)) {
      console.log(this.state)
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
        <FormContainer onSubmit={e => this.handleSubmit(e)}>
          <EmailContainer>
            <input
              type="text"
              placeholder="Your Email"
              name="email"
              value={this.state.email}
              required
              onChange={e => this.setState({ email: e.target.value })}
              style={{ width: `${50 - EMAIL_MARGIN / 2}%` }}
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
          />
          <ContentSubmitContainer>
            <ContentArea
              name="content"
              placeholder="Content"
              rows={5}
              value={this.state.content}
              onChange={e => this.setState({ content: e.target.value })}
            />
            <SubmitButton type="submit">SEND</SubmitButton>
          </ContentSubmitContainer>
        </FormContainer>
        <IconContainer>
          <a
            href="https://github.com/jeffrey-xiao-17"
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
