'use strict'

import * as vscode from 'vscode'
import { COMMAND_IDS, runCommand } from './copy-with-line-numbers'

export function activate(context: vscode.ExtensionContext) {
  const { registerCommand } = vscode.commands
  const { subscriptions } = context
  const {
    WITHOUT_PATH,
    WITH_FULL_PATH,
  } = COMMAND_IDS

  subscriptions.push(registerCommand(WITHOUT_PATH, () => { runCommand(WITHOUT_PATH) }))
  subscriptions.push(registerCommand(WITH_FULL_PATH, () => { runCommand(WITH_FULL_PATH) }))
}

export function deactivate() {
}
