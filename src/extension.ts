'use strict'

import * as vscode from 'vscode'
import { commands } from './copy-with-line-numbers'

export function activate(context: vscode.ExtensionContext) {
  const { registerCommand } = vscode.commands
  const { subscriptions } = context

  Object.keys(commands).forEach((key) => {
    const command = commands[key]
    subscriptions.push(registerCommand(key, () => { command() }))
  })
}

export function deactivate() {
}
