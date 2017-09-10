'use strict'

import * as vscode from 'vscode'
import * as path from 'path'
import { EOL } from 'os'
import { copy } from 'copy-paste'
import * as leftPad from 'left-pad'

const MULTI_SELECTION_SEPARATOR = '---'

export const COMMAND_IDS = {
  WITHOUT_PATH: 'extension.copyWithLineNumbers.withoutPath',
  WITH_FULL_PATH: 'extension.copyWithLineNumbers.withFullPath',
  WITH_FILE_NAME: 'extension.copyWithLineNumbers.withFileName',
}

function getLinesWithNumbers() {
  const editor = vscode.window.activeTextEditor
  const document = editor.document
  const selections = [...editor.selections].sort((a, b) => a.start.line - b.start.line)
  const lastSelection = selections[selections.length - 1]
  const largestLineNumber = lastSelection.end.line + 1
  const largestLineNumberLength = largestLineNumber.toString().length

  let lines = ''
  selections.forEach((selection, i) => {
    if (i > 0) lines += `${MULTI_SELECTION_SEPARATOR}${EOL}`

    for (let n = selection.start.line; n <= selection.end.line; n += 1) {
      const number = leftPad(n + 1, largestLineNumberLength, 0)
      const line = document.lineAt(n).text

      lines += `${number}: ${line}${EOL}`
    }
  })
  return lines
}

function copyWithLineNumbers(filePath?: string) {
  const str = (filePath ? `File: ${filePath}${EOL}` : '') + getLinesWithNumbers()
  copy(str)
  vscode.window.showInformationMessage('Copied!')
}

const commands = {
  [COMMAND_IDS.WITHOUT_PATH]: () => {
    copyWithLineNumbers()
  },
  [COMMAND_IDS.WITH_FULL_PATH]: () => {
    const fullPath = vscode.window.activeTextEditor.document.fileName
    copyWithLineNumbers(fullPath)
  },
  [COMMAND_IDS.WITH_FILE_NAME]: () => {
    const fullPath = vscode.window.activeTextEditor.document.fileName
    const fileName = path.basename(fullPath)
    copyWithLineNumbers(fileName)
  },
}

export function runCommand(commandId) {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    vscode.window.showInformationMessage('No editor is active')
    return
  }

  const command = commands[commandId]
  if (command) command()
}
