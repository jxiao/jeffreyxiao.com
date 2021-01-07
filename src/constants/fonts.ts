import styled from "styled-components"
import { Link } from "gatsby"

export const NORMAL_FONT_WEIGHT = 400
export const MEDIUM_FONT_WEIGHT = 500
export const BOLD_FONT_WEIGHT = 600

export const FONT = `Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI',
Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
'Segoe UI Symbol'`

export const LinkedText = styled.a`
  background: ${({ dark }: { dark: boolean }) =>
    dark ? "rgba(23, 113, 143, 0.3)" : "rgba(4, 167, 242, 0.1)"};
  border-bottom: 1px solid
    ${({ dark }: { dark: boolean }) =>
      dark ? "rgb(180, 231, 248)" : "rgb(23, 113, 143)"};
  text-decoration: none !important;
  transition: background 200ms ease 0s;
  color: inherit;
  &:hover {
    background: ${({ dark }: { dark: boolean }) =>
      dark ? "rgb(23, 113, 143)" : "rgb(180, 231, 248)"};
  }
`

export const HighlightedButton = styled(Link)`
  text-decoration: none;
  width: fit-content;
  padding: 0.05rem 0.25rem;
  border-radius: 3px;
  font-size: 0.95rem;
  margin-left: auto;

  background: ${({ dark }: { dark: boolean }) =>
    dark ? "rgba(23, 113, 143, 0.3)" : "rgba(4, 167, 242, 0.1)"};
  border: 1px solid
    ${({ dark }: { dark: boolean }) =>
      dark ? "rgb(180, 231, 248)" : "rgb(23, 113, 143)"};
  &:hover {
    background: ${({ dark }: { dark: boolean }) =>
      dark ? "rgb(23, 113, 143)" : "rgb(180, 231, 248)"};
  }
`
