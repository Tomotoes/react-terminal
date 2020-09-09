export const systemCmdList = {
  clear: {
    type: 'system',
    label: 'System',
    content: 'Type "clear" to clear the terminal screen.',
    aliasList: ['clear', 'cls']
  },
  help: {
    type: 'system',
    label: 'System',
    content: 'Type "help" to get a supporting command list.',
    aliasList: ['help', 'ls']
  },
  exit: {
    type: 'system',
    label: 'System',
    content: 'Type "exit" to return to the main page.',
    aliasList: ['exit', 'back']
  },
  pwd: {
    type: 'system',
    label: 'System',
    content: 'Print name of current directory.',
    aliasList: ['pwd']
  },
  cd: {
    type: 'system',
    label: 'System',
    content: 'Change current directory.',
    aliasList: ['cd']
  },
  version: {
    type: 'system',
    label: 'System',
    content: 'Print version of the current project.',
    aliasList: ['version']
  }
}

export const tipCmdList = {
  jump: {
    type: 'system',
    label: 'System',
    content: 'Jumping page...'
  },
  unknown: {
    type: 'error',
    label: 'Error',
    contentWithCommand: command => `Command '${command}' not found`
  },
  error: {
    type: 'error',
    label: 'Error',
    content: 'Something went wrong!'
  },
  supporting: 'Here is a list of supporting command.'
}
