'use strict'
import * as vscode from 'vscode'
import { EOL } from 'os'
import { copy } from 'copy-paste'
import * as leftPad from 'left-pad'

const COMMAND_WITHOUT_PATH = 'extension.copyWithLineNumbers.withoutPath'
const MULTI_SELECTION_SEPARATOR = '---'

function getLinesWithNumbers() {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  const document = editor.document
  const selections = [...editor.selections].sort((a, b) => a.start.line - b.start.line)
  const lastSelection = selections[selections.length - 1]
  const largestLineNumber = lastSelection.end.line + 1
  const largestLineNumberLength = largestLineNumber.toString().length

  let lines = ''
  selections.forEach((selection, i) => {
    if (i > 0) lines += `${MULTI_SELECTION_SEPARATOR}${EOL}`

    const startLine = selection.start.line
    const endLine = selection.end.line
    for (let n = startLine; n <= endLine; n += 1) {
      const number = leftPad(n + 1, largestLineNumberLength, 0)
      const line = document.lineAt(n).text

      lines += `${number}: ${line}${EOL}`
    }
  })
  return lines
}

function copyWithLineNumbers(filePath?: string) {
  const editor = vscode.window.activeTextEditor
  if (!editor) return

  const str = (filePath ? `File: ${filePath}${EOL}` : '') + getLinesWithNumbers()
  copy(str)
}

function withoutPath() {
  copyWithLineNumbers()
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(COMMAND_WITHOUT_PATH, () => { withoutPath() })
  context.subscriptions.push(disposable)
}

export function deactivate() {
}
