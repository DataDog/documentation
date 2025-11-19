---
title: Code Security
type: documentation
further_reading:
- link: "/security/code_security/"
  tag: "Documentation"
  text: "Learn about Code Security."
---

## Overview
The [Code Security][4] integration in the plugin promotes better security by:

- flagging library vulnerabilities and runtime code vulnerabilities
- checking your code locally, as you edit it, to detect quality and security issues before they are committed

## Vulnerabilities
The Datadog plugin reports library and runtime code vulnerabilities as Code Insights, for any source code repository that is onboarded for [Datadog Code Security][1]. Issues are highlighted directly in the source code:

{{< img src="/developers/ide_plugins/idea/code_security/library-vulnerability-1.png" alt="A library vulnerability highlighted in the source editor" style="width:100%;" >}}

Full details of each vulnerability are shown in the Datadog tool-window in the **File Insights** and **Project Insights** tabs. Click on the link in the `Code Links` section to navigate to the source location, or click on the vulnerability description to open the summary at Datadog.

## Local Code Analysis
The Datadog plugin runs [Static Analysis][2] rules locally as you edit your source code to detect quality and security issues before you commit your changes.

This local code analysis supports scanning for many programming languages. For a complete list, see [Static Analysis Rules][3]. Issues are shown in the source code editor with the JetBrains inspection system, and suggested fixes can be applied directly:

{{< img src="/developers/ide_plugins/idea/code_security/local-code-analysis.png" alt="Static analysis violation in the source editor" style="width:100%;" >}}

Additionally, all issues detected by this feature are listed in the standard **Problems** view.

### Analyzing Multiple Files
You can run the local code analysis across multiple files. In the Code menu, select **Analyse Code** → **Run Inspection By Name…** and choose Datadog Static Analysis:

{{< img src="/developers/ide_plugins/idea/code_security/inspection-by-name.png" alt="Datadog Static Analysis inspection" style="width:100%;" >}}

Choose the scope, click `OK`, then review the flagged issues in the **Problems** view.

### Configuration
The local code analysis will run automatically if:

1. the repository has been onboarded for [Datadog Code Security][1]
2. you are logged in to Datadog so that the configuration data is available

To see the configuration data in your IDE, run the action **Show Datadog Static Analyzer Config**:

{{< img src="/developers/ide_plugins/idea/code_security/show-sa-config.png" alt="Action to show the Static Analyzer configuration" style="width:100%;" >}}

A local configuration file (`static-analysis.datadog.yml`) can be placed at the root of the repository and will be merged with the remote configuration. When there is no remote configuration available, the local configuration file will be used on its own.

<div class="alert alert-info">Using a local configuration file is a great way to try out the feature and works even without a Datadog login.</div>

{{< img src="/developers/ide_plugins/idea/code_security/local-config.png" alt="A local configuration file for Static Analysis" style="width:100%;" >}}

### Settings
The Datadog Static Analyzer can be activated and deactivated in the IDE settings under **Editor** → **Inspections**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/configuration/code-security/setup
[2]: /security/code_security/static_analysis/setup/?tab=github
[3]: /security/code_security/static_analysis/static_analysis_rules/
[4]: /security/code_security/