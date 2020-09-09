import styled, { keyframes } from 'styled-components'

export const StyledTerminalWrapper = styled.div`
  position: relative;
  margin: 30px auto 10px !important;
  width: 60%;
  border-radius: 4px;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  @media screen and (max-width: 760px) {  
    width: 100%;
  }

  @media screen and (min-height: 1000px) {  
    margin: 30% auto 10px !important;
  }
`

export const StyledTerminal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 1;
  margin-top: 10px;
  height: 670px;
  max-height: 670px;
  box-shadow: -2px 7px 20px 3px #222;
  background-color: rgb(49, 49, 49);

  @media screen and (max-width: 760px) {
    box-shadow: none;
  }
`

export const StyledTerminalInner = styled.div`
  min-height: 140px;
  padding: 20px;
  font-weight: normal;
  font-family: "Fira Code", "Source Code Pro", Monaco, Menlo, Consolas, monospace;
  color: #fff;
  text-shadow: rgb(160, 156, 155) 0px 0px 1px, rgb(255, 255, 251) 0px 0px 1px;
  @media screen and (max-width: 760px) {
    padding: 5px 5px 0px 5px;
  }
`

export const StyledInputWrapper = styled.p`
  word-spacing: 0;
  letter-spacing: 0;
  word-break: break-all;
  font-size: 15px;
  font-weight: 400;
  font-family: Fira Code,Source Code Pro,Monaco,Menlo,Consolas,monospace;
  color: #fff;
  text-shadow: #a09c9b 0 0 1px, #fffffb 0 0 1px;
  -webkit-font-smoothing: antialias;
`

export const StyledInput = styled.input`
  position: relative;
  background: rgb(49, 49, 49);
  border: none;
  width: 1px;
  opacity: 0;
  cursor: default;
  
  &:focus {
    outline: none;
    border: none;
  }
`

export const StyledPrompt = styled.span`
  word-break: break-all;
  font-size: 15px;
  color: #9bf786;
`

const loadingDots = keyframes`
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: white;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
  }
`

export const StyledLoadingCursor = styled.span`
  font: 300 2.5em Impact;
  animation: ${loadingDots} 500ms steps(5, end) infinite;
`

const blinkDot = keyframes`
  50% {
    visibility: hidden;
  }
`

export const StyledBlinkCursor = styled.span`
  margin: 0 0 0 5px;
  background-color: white;
  animation: ${blinkDot} 1s step-end infinite;
`

export const StyledLine = styled.div`
  font-size: 15px;
  word-break: break-all;
  border-radius: 1px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

  .cmd {
    line-height: 24px;
  }
     
  .info {
    background: #2980b9;
  }
  
  .warning {
    background: #f39c12;
  }

  .success {
    background: #27ae60;
  }
   
  .error {
    background: #c0392b;
  }
   
  .system {
    background: #999;
  }
     
  .time {
    background: rgb(102, 98, 98);
  }
   
  .black {
    background: #212117;
  }

  .time,
  .system,
  .error,
  .success,
  .warning,
  .info,
  .black {
    margin-right: 8px;
    padding: 2px 3px;
  }
`

export const StyledHeader = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  background-color: #222;
  text-align: center;
  padding: 2px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-shadow: rgb(160, 156, 155) 0px 0px 1px, rgb(255, 255, 251) 0px 0px 1px, rgb(255, 255, 251) 0px 0px 1px;
  box-shadow: inset 0px 3px 20px 0px #414141;
`

export const StyledHeaderTitle = styled.h4`
  font-size: 15px;
  margin: 5px;
  letter-spacing: 1px;
  font-weight: 300;
`

export const StyledHeaderDotList = styled.ul`
  position: absolute;
  top: 3px;
  left: 5px;
  padding-left: 0;
  margin: 0;
  cursor: pointer;
`

const backgroundColorMap = {
  red: 'rgb(200, 48, 48)',
  yellow: 'rgb(247, 219, 96)',
  green: 'rgb(46, 201, 113)'
}

export const StyledHeaderDotItem = styled.li`
  display: inline-block;
  width: 12px;
  border-radius: 6px;
  background-color: rgb(49, 49, 49);
  margin-left: 6px;
  height: 12px;
  background-color:${props => backgroundColorMap[props.color]};
`

export const StyledCommand = styled.span`
  font-size: inherit;
`
