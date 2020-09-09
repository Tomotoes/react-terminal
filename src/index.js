import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  StyledTerminalWrapper,
  StyledTerminal,
  StyledTerminalInner,
  StyledInputWrapper,
  StyledInput,
  StyledPrompt,
  StyledLoadingCursor,
  StyledBlinkCursor,
  StyledCommand,
  StyledLine,
  StyledHeader,
  StyledHeaderTitle,
  StyledHeaderDotList,
  StyledHeaderDotItem,
} from './style'

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'

import { systemCmdList, tipCmdList } from './commands'

class Terminal extends PureComponent {
  static propTypes = {
    cmd: PropTypes.shape({
      dynamicList: PropTypes.object,
      staticList: PropTypes.object
    }).isRequired,
    config: PropTypes.shape({
      initialDirectory: PropTypes.string,
      prompt: PropTypes.string,
      version: PropTypes.string,
      bootCmd: PropTypes.string
    }),
    className: PropTypes.string
  }

  static defaultProps = {
    className: 'react-terimnal-app',
    config: {
      initialDirectory: 'src',
      prompt: '➜  ~ ',
      version: '1.0.0',
      bootCmd: 'intro'
    }
  }

  historyCmdList = []
  historyCmdIndex = 0

  constructor(props) {
    super(props)
    this.$terminal = React.createRef()
    this.$inputWrapper = React.createRef()
    this.$inputEl = React.createRef()

    const { config, cmd } = props

    this.state = {
      cmdList: [],
      command: '',
      directory: config.initialDirectory,
      isPrinting: true
    }

    this.supportedCmdList = [
      ...Object.keys(cmd.staticList),
      ...Object.keys(cmd.dynamicList),
    ]
  }

  componentDidMount() {
    const { config: { bootCmd } } = this.props
    this.run(bootCmd).then(() => {
      const { help, clear, exit } = systemCmdList
      this.print([help, clear, exit])
      this.inputFocus()
    })
  }

  run = (command, inputCommand = this.state.command) => {
    const { cmd } = this.props
    this.setState({ isPrinting: true })
    return cmd.dynamicList[command]
      .run(this.print, inputCommand)
      .then(this.print)
      .catch(error => {
        console.error(error)
        this.print(tipCmdList.error)
      }).finally(() => {
        this.setState({ isPrinting: false })
      })
  }

  print = cmd => {
    this.setState(prevState =>
      ({ cmdList: [...prevState.cmdList, ...(Array.isArray(cmd) ? cmd : [cmd])] }))
    this.autoScroll()
  }

  inputFocus = () => {
    this.$inputEl.current.focus()
  }

  autoScroll = () => {
    this.$terminal.current.scrollTop = this.$inputWrapper.current.offsetTop
  }

  handleKeyCommand = e => {
    const { config: { prompt } } = this.props
    const isDownKey = e.keyCode === 40
    const isUpKey = e.keyCode === 38
    const isTabKey = e.keyCode === 9
    const isCKey = e.keyCode === 67
    const isDKey = e.keyCode === 68
    const isLKey = e.keyCode === 76
    const isCtrlCKey = isCKey && e.ctrlKey && !e.shiftKey
    const isCtrlDKey = isDKey && e.ctrlKey && !e.shiftKey
    const isCtrlLKey = isLKey && e.ctrlKey && !e.shiftKey

    if (isDownKey) {
      this.historyCmdIndex = Math.min(this.historyCmdIndex + 1, this.historyCmdList.length - 1)
    } else if (isUpKey) {
      this.historyCmdIndex = Math.max(this.historyCmdIndex - 1, 0)
    }
    if (isUpKey || isDownKey) {
      const historyCmd = this.historyCmdList[this.historyCmdIndex]
      historyCmd && this.setState({ command: historyCmd })
    }

    const { command, isPrinting } = this.state
    if (isPrinting) { return }

    if (isTabKey) {
      if (!command) {
        this.setState({ command: 'help' })
      }
      const canExtendCmdList = this.supportedCmdList.filter(c => c.startsWith(command))
      this.setState({ command: canExtendCmdList[Math.floor(Math.random() * canExtendCmdList.length)] })
      e.preventDefault()
    }

    if (isCtrlCKey) {
      this.print(`${prompt}${command}`)
      this.setState({ command: '' })
      e.preventDefault()
    }

    if (isCtrlDKey) {
      this.print(tipCmdList.jump)
      e.preventDefault()
      window.history.go(-1)
    }

    if (isCtrlLKey) {
      this.setState({ cmdList: [] })
      e.preventDefault()
    }

    this.autoScroll()
    this.inputFocus()
  }

  handleCommand = e => {
    const { cmd, config: { prompt, version: versionNumber } } = this.props
    const isEnterKey = e.keyCode === 13

    if (!isEnterKey) {
      this.handleKeyCommand(e)
      return
    }

    if (!this.state.command) {
      this.print(prompt)
      return
    }

    const command = this.state.command.toLowerCase().trim()

    this.historyCmdList.push(command)
    this.historyCmdIndex = this.historyCmdList.length

    this.print(`${prompt}${command}`)
    const cmdList = []

    const [action, commandKey] = command.split(' ')
    const isStaticCommand = !!cmd.staticList[command]
    const isDynamicCommand = !!cmd.dynamicList[action]

    const { exit, help, clear, pwd, cd, version } = systemCmdList
    const { unknown, jump, supporting } = tipCmdList

    if (exit.aliasList.includes(action)) {
      cmdList.push(jump)
      this.print(cmdList)
      window.history.go(-1)
    } else if (help.aliasList.includes(action)) {
      if (commandKey) {
        const command = cmd.staticList[commandKey] || cmd.dynamicList[commandKey]
        cmdList.push(command.description)
        this.print(cmdList)
      } else {
        cmdList.push(supporting)
        const supportedCmdList = this.supportedCmdList.map(commandKey => {
          const command = cmd.staticList[commandKey] || cmd.dynamicList[commandKey]
          return ({ type: 'success', label: commandKey, content: `() => ${command.description}` })
        })
        cmdList.push(...supportedCmdList)
        cmdList.push(clear, exit)
        this.print(cmdList)
      }
    } else if (clear.aliasList.includes(action)) {
      this.setState({ cmdList: [] })
    } else if (pwd.aliasList.includes(action)) {
      this.print(this.state.directory)
    } else if (cd.aliasList.includes(action)) {
      const directory = commandKey.trim()
      if (directory && directory.length < 20) {
        this.setState({ directory })
      }
    } else if (version.aliasList.includes(action)) {
      this.print(versionNumber)
    } else if (isStaticCommand) {
      this.print(cmd.staticList[command].list)
    } else if (isDynamicCommand) {
      this.run(action, commandKey)
    } else if (action.trim()) {
      unknown.content = unknown.contentWithCommand(action)
      this.print([unknown, help])
    }

    this.setState({ command: '' })
    this.autoScroll()
    this.inputFocus()
  }

  render() {
    const { className, config: { prompt } } = this.props
    const { cmdList, isPrinting, command, directory } = this.state
    return (
      <StyledTerminalWrapper className={className}>
        <StyledHeader>
          <StyledHeaderTitle>{directory}</StyledHeaderTitle>
          <StyledHeaderDotList>
            <StyledHeaderDotItem color="red" />
            <StyledHeaderDotItem color="yellow" />
            <StyledHeaderDotItem color="green" />
          </StyledHeaderDotList>
        </StyledHeader>
        <StyledTerminal ref={this.$terminal}>
          <StyledTerminalInner onClick={this.inputFocus}>
            <TransitionGroup>
              {cmdList.map((item, index) => (
                <CSSTransition key={index} timeout={500} >
                  <StyledLine>
                    {typeof item === 'string'
                      ? (<StyledCommand className="cmd">{item}</StyledCommand>)
                      : (<>
                        {item.time && (<StyledCommand className="time">{item.time}</StyledCommand>)}
                        {item.label && (<StyledCommand className={item.type}>{item.label}</StyledCommand>)}
                        {item.content && (<StyledCommand className="cmd">{item.content}</StyledCommand>)}
                      </>)}
                  </StyledLine>
                </CSSTransition>
              ))}
            </TransitionGroup>
            <StyledInputWrapper ref={this.$inputWrapper} onClick={this.inputFocus} >
              {isPrinting
                ? (<StyledLoadingCursor>.</StyledLoadingCursor>)
                : (<>
                  <StyledPrompt>{prompt}</StyledPrompt>
                  <StyledCommand>{command}</StyledCommand>
                  <StyledBlinkCursor>&nbsp;</StyledBlinkCursor>
                </>)}
              <StyledInput value={command} onChange={e => { this.setState({ command: e.target.value }) }}
                onKeyDown={this.handleCommand} autoFocus ref={this.$inputEl} />
            </StyledInputWrapper >
          </StyledTerminalInner >
        </StyledTerminal >
      </StyledTerminalWrapper >
    )
  }
}

export default Terminal
