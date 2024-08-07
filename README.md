# Copy With Line Numbers for VS Code

Copy selected lines with line number (and file path).

This package is an imitation of [Copy With Line Numbers Reloaded](https://packagecontrol.io/packages/CopyWithLineNumbersReloaded) for Sublime Text.

![Demo](images/demo.gif)

## Requirements
To use the extension in a Linux environment, you'll need to install `xclip`. Here’s how you can do it based on your distribution:

* For Ubuntu, Debian, or Linux Mint, use: `sudo apt install xclip`
* For Fedora, CentOS, AlmaLinux, or Redhat, use: `sudo dnf install xclip`
* For Arch Linux or Manjaro, use: `sudo pacman -S xclip`

## Available commands

* Copy With Line Numbers: Without Path
* Copy With Line Numbers: With Full Path
* Copy With Line Numbers: With Relative Path
* Copy With Line Numbers: With File Name

## Configuration

|Property|Description|Type|Default value|
|---|---|---|---|
|`copyWithLineNumbers.showSuccessMessage`|Show success message.|Boolean|`true`|
