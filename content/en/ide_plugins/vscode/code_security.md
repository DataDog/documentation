---
title: Code Security
type: documentation
aliases:
    - '/developers/ide_plugins/vscode/code_security/'
further_reading:
    - link: '/security/code_security/'
      tag: 'Documentation'
      text: 'Learn more about Code Security'
    - link: '/security/code_security/static_analysis/static_analysis_rules/'
      tag: 'Documentation'
      text: 'Static Analysis Rules'
---

## Overview

The Code Security features in the Datadog extension for VS Code and Cursor help you identify and fix security vulnerabilities before you commit your changes.

## Static Code Analysis

The extension runs [Static Code Analysis][1] rules on the source files in your workspace, detecting and fixing security vulnerabilities, bugs, and maintainability issues before you commit your changes.

Static Code Analysis supports many programming languages. For a complete list, see [Static Code Analysis Rules][2]. Issues are shown in the source code editor, and you can apply suggested fixes directly.

{{< img src="/developers/ide_plugins/vscode/static_analysis.mp4" alt="Preview of Static Analysis" style="width:100%" video=true >}}

### Get started with Static Code Analysis

When you open a source file, the extension looks for [`static-analysis.datadog.yml`][3] at your repository root and prompts you to create one if it does not exist.

{{< img src="/developers/ide_plugins/vscode/static-analysis-onboard.png" alt="Onboarding banner for setting up Static Code Analysis with Python files" style="width:75%;" >}}

After you create the configuration file, the analyzer runs automatically in the background when you open a file. To enable Static Code Analysis for a specific language, run the `Datadog: Configure Static Analysis Languages` command from the command palette (`Shift` + `Cmd/Ctrl` + `P`).

To analyze an entire folder or workspace, right-click a folder in the file explorer and select **Datadog Static Analysis > Analyze Folder** or **Analyze Workspace**.

<div class="alert alert-info">Static Code Analysis does not require a Datadog account, as source files are analyzed locally.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/static_analysis/
[2]: /security/code_security/static_analysis/static_analysis_rules/
[3]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
