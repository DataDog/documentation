---
title: Code Security
type: documentation
aliases:
- '/developers/ide_plugins/vscode/code_security/'
further_reading:
- link: "/security/code_security/"
  tag: "Documentation"
  text: "Learn more about Code Security"
- link: "/security/code_security/static_analysis/static_analysis_rules/"
  tag: "Documentation"
  text: "Static Analysis Rules"
---

## Overview

The Code Security features in the Datadog extension for VS Code and Cursor analyze your code to detect and fix security issues and vulnerabilities before you commit your changes.

## Static Code Analysis

[Static Code Analysis][1] analyzes your code (locally) against predefined rules to detect and fix problems.

The extension runs Static Code Analysis rules on the source files you have open in your workspace. This allows you to detect and fix problems such as maintainability issues, bugs, or security vulnerabilities in the code before you commit your changes.

Static Code Analysis supports scanning for many programming languages. For a complete list, see [Static Code Analysis Rules][2]. For file types belonging to supported languages, issues are shown in the source code editor, and you can directly apply suggested fixes.

{{< img src="/developers/ide_plugins/vscode/static_analysis.mp4" alt="Preview of Static Analysis" style="width:100%" video=true >}}

### Get started with Static Code Analysis

When you start editing a source file, the extension checks for [`static-analysis.datadog.yml`][3] at your source repository's root. It prompts you to create it if necessary.

{{< img src="/developers/ide_plugins/vscode/static-analysis-onboard.png" alt="Onboarding banner for setting up Static Code Analysis with Python files" style="width:75%;" >}}

After you create the configuration file, the analyzer runs automatically in the background whenever you open a file. If you need to enable Static Code Analysis for a particular language, search for the command `Datadog: Configure Static Analysis Languages` in the command palette (`Shift` + `Cmd/Ctrl` + `P`).

You can also run a batch analysis for individual folders and even the entire workspace. In the IDE's file explorer view, right-click a folder and select **Datadog Static Analysis > Analyze Folder** or **Analyze Workspace**.

<div class="alert alert-info">Static Code Analysis does not require a Datadog account, as source files are analyzed locally.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/static_analysis/?tab=githubactions
[2]: /security/code_security/static_analysis/static_analysis_rules/
[3]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
