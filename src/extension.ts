'use strict'

import * as vscode from 'vscode'
import { COMMAND_IDS, runCommand } from './copy-with-line-numbers'

export function activate(context: vscode.ExtensionContext) {
  const { registerCommand } = vscode.commands
  const { subscriptions } = context

  Object.keys(COMMAND_IDS).forEach((key) => {
    const commandId = COMMAND_IDS[key]
    subscriptions.push(registerCommand(commandId, () => { runCommand(commandId) }))
  })
}

export function deactivate() {
}
