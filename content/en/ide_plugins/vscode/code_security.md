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
    - link: '/security/code_security/secret_scanning/'
      tag: 'Documentation'
      text: 'Learn more about Secret Scanning'
---

## Overview

The Datadog extension for VS Code and Cursor helps you detect and fix security issues before you commit your changes. [Static Code Analysis](#static-code-analysis) catches vulnerabilities, bugs, and maintainability issues. [Secret Scanning](#secret-scanning) finds exposed credentials such as API keys, tokens, and passwords.

## Static Code Analysis

The extension runs [Static Code Analysis][1] rules on the source files in your workspace. It flags security vulnerabilities, bugs, and maintainability issues before you commit your changes.

Static Code Analysis supports many programming languages. For a complete list, see [Static Code Analysis Rules][2]. Issues are shown in the source code editor, and you can apply suggested fixes directly.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Preview of Static Analysis" style="width:100%" video=true >}}

### Get started with Static Code Analysis

When you open a source file, the extension looks for [`static-analysis.datadog.yml`][3] at your repository root and prompts you to create one if it does not exist.

{{< img src="/ide_plugins/vscode/static-analysis-onboard.png" alt="Onboarding banner for setting up Static Code Analysis with Python files" style="width:75%;" >}}

After you create the configuration file, the analyzer runs automatically in the background when you open a file. To enable Static Code Analysis for a specific language, run the `Datadog: Configure Static Analysis Languages` command from the command palette (`Shift` + `Cmd/Ctrl` + `P`).

To analyze an entire folder or workspace, right-click a folder in the file explorer and select **Datadog Static Analysis > Analyze Folder** or **Analyze Workspace**.

<div class="alert alert-info">Static Code Analysis does not require a Datadog account, as source files are analyzed locally.</div>

## Secret Scanning

The extension runs [Secret Scanning][4] on the source files in your workspace. It flags exposed credentials such as API keys, tokens, and passwords before you commit your changes. File contents are scanned locally, and findings are shown in the editor as you type.

{{< img src="/ide_plugins/vscode/secret_scanning.mp4" alt="Preview of Secret Scanning" style="width:100%" video=true >}}

### Get started with Secret Scanning

Secret Scanning is enabled by default and runs in the background whenever you open a source file. To scan an entire folder or workspace, right-click a folder in the file explorer and select **Datadog Static Analysis > Analyze Folder** or **Analyze Workspace**.

{{< img src="/ide_plugins/vscode/secret-scanning-batch-analysis.png" alt="Batch analysis report with a Secret Scanning section listing findings per file" style="width:100%;" >}}

Unlike Static Code Analysis, Secret Scanning does not require a [`static-analysis.datadog.yml`][3] file in your repository, and it scans all text files regardless of programming language. Likely-binary files are skipped automatically.

<div class="alert alert-info">Secret Scanning requires you to be signed in to Datadog, because detection rules are fetched from your Datadog organization.</div>

### Review findings

Detected secrets are shown in three places:

- **Inline in the editor**: Each finding appears as an underline on the detected secret, with severity derived from the rule's priority.
- **Problems panel**: All findings are listed with the source `Datadog`.
- **File Insights view**: Findings are grouped alongside other Code Security issues.

{{< img src="/ide_plugins/vscode/secret-scanning-findings.png" alt="A detected secret shown inline in the editor with a hover diagnostic, alongside the Problems panel and the File Insights view" style="width:100%;" >}}

### Suppress a finding

To suppress an individual detection, use the code action for the flagged secret to insert a `no-dd-secrets` comment on the line above. The comment suppresses all secret findings on the following line.

### Turn Secret Scanning on or off

To toggle Secret Scanning, run the `Datadog: Turn on Secret Scanning` or `Datadog: Turn off Secret Scanning` command from the command palette (`Shift` + `Cmd/Ctrl` + `P`), or change the `datadog.codeSecurity.setup.secretScanning.enabled` setting.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/static_analysis/
[2]: /security/code_security/static_analysis/static_analysis_rules/
[3]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[4]: /security/code_security/secret_scanning/
