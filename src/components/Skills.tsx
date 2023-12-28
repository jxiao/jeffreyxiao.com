import React from "react"
import styled from "styled-components"
import { M5 } from "../constants/measurements"
import { LIGHT_GREY } from "../constants/colors"
import ThemeContext from "../context/ThemeContext"

// Icons
import TypeScriptIcon from "./icons/TypeScript"
import JavaIcon from "./icons/Java"
import OCamlIcon from "./icons/OCaml"
import PythonIcon from "./icons/Python"
// import CIcon from "./icons/C"
import NodeIcon from "./icons/Node"
import ReactIcon from "./icons/React"
import GatsbyIcon from "./icons/Gatsby"
import HTMLIcon from "./icons/HTML"
import CSSIcon from "./icons/CSS"
import SQLIcon from "./icons/SQL"
import MongoDBIcon from "./icons/MongoDB"
import FirebaseIcon from "./icons/Firebase"
import CPlusPlusIcon from "./icons/CPlusPlus"

const Combined = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  margin-bottom: 1rem;
`
const H4 = styled.h4`
  font-size: 1.15rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.2);
  border-color: ${({ dark }: any) => (dark ? "#dfdfdf" : LIGHT_GREY)};
`

const P = styled.p`
  margin-bottom: 0;
  display: flex;
  flex-direction: column-reverse;
  margin-left: 0.5rem;
  text-align: left;
  flex-grow: 1;
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
`

const Skill = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`

const Skills = () => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <Combined>
          <Group>
            <H4 dark={theme.dark}>General</H4>
            <Skill>
              <PythonIcon height={M5} />
              <P>Python</P>
            </Skill>
            <Skill>
              <JavaIcon height={M5} />
              <P>Java</P>
            </Skill>
            <Skill>
              <TypeScriptIcon height={M5} />
              <P>TypeScript</P>
            </Skill>
            <Skill>
              <CPlusPlusIcon height={M5} />
              <P>C / C++</P>
            </Skill>
            <Skill>
              <OCamlIcon height={M5} />
              <P>OCaml</P>
            </Skill>
          </Group>
          <Group dark={theme.dark}>
            <H4>Web</H4>
            <Skill>
              <NodeIcon height={M5} />
              <P>Node</P>
            </Skill>
            <Skill>
              <ReactIcon height={M5} />
              <P>React</P>
            </Skill>
            <Skill>
              <GatsbyIcon height={M5} />
              <P>Gatsby</P>
            </Skill>
            <Skill>
              <HTMLIcon height={M5} />
              <P>HTML</P>
            </Skill>
            <Skill>
              <CSSIcon height={M5} />
              <P>CSS</P>
            </Skill>
          </Group>
          <Group dark={theme.dark}>
            <H4>Data(bases)</H4>
            <Skill>
              <SQLIcon height={M5} />
              <P>SQL</P>
            </Skill>
            <Skill>
              <MongoDBIcon height={M5} />
              <P>MongoDB</P>
            </Skill>
            <Skill>
              <FirebaseIcon height={M5} />
              <P>Firebase</P>
            </Skill>
          </Group>
        </Combined>
      )}
    </ThemeContext.Consumer>
  )
}

export default Skills
