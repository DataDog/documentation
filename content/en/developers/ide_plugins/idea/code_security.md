---
title: Code Security
type: documentation
further_reading:
- link: "/security/code_security/"
  tag: "Documentation"
  text: "Learn more about Code Security"
---

## Overview
The [Code Security][4] integration in the Datadog plugin for JetBrains IDEs promotes better security by flagging library vulnerabilities and runtime code vulnerabilities. The local code analyzer checks your code changes locally, as you edit, to detect quality and security issues prior to commit.

The feature is supported for any source code repository that is onboarded for [Datadog Code Security][1].

## Vulnerabilities
The Datadog plugin reports library and runtime code vulnerabilities by highlighting the issues directly in the source editor:

{{< img src="/developers/ide_plugins/idea/code_security/library-vulnerability.png" alt="A library vulnerability highlighted in the source editor" style="width:80%;" >}}

Full details of each vulnerability are shown in the Datadog tool window in the **File Insights** and **Project Insights** tabs. 

{{< img src="/developers/ide_plugins/idea/code_security/library-vulnerability-tool-window.png" alt="A library vulnerability shown in the Datadog tool-window" style="width:100%;" >}}

Click on the link in the **Code Links** section to navigate to the source location, or click on the vulnerability description to open the summary in Datadog.

## Local code analysis

### File editing
As you edit your source files, the Datadog plugin checks the content (locally) against a set of [rules][2] to detect and flag quality and security issues before you commit your changes.

The local analysis engine supports all the file types listed in [Static Analysis Rules][3]. Issues are shown in the source code editor with the JetBrains inspection system, and you can apply suggested fixes directly.

{{< img src="/developers/ide_plugins/idea/code_security/local-code-analysis.png" alt="Static analysis violation in the source editor" style="width:100%;" >}}

Additionally, all issues detected by this feature are listed in the standard **Problems** view.

### Analyzing multiple files
You can run the local code analysis across multiple files. In the **Code** menu, select **Analyze Code** → **Run Inspection By Name…** and choose `Datadog Static Analysis`:

{{< img src="/developers/ide_plugins/idea/code_security/inspection-by-name.png" alt="Datadog Static Analysis inspection" style="width:60%;" >}}

Choose the scope, click **OK**, and review the flagged issues in the **Problems** view.

### Configuration
The code analyzer runs automatically if you meet both of these conditions:

- Your repository has been onboarded for [Datadog Code Security][1].
- You are logged in to Datadog so that the remote configuration data is available.

To see the configuration data in your IDE, run the action **Show Datadog Static Analyzer Config**:

{{< img src="/developers/ide_plugins/idea/code_security/show-sa-config.png" alt="Action to show the Static Analyzer configuration" style="width:80%;" >}}

You can save a local configuration file (`static-analysis.datadog.yml`) at the root of the repository, and its settings will be merged with the remote configuration. When there is no remote configuration available, the local configuration file is used on its own.

<div class="alert alert-tip">Using a local configuration file is a great way to try out the feature, and it works even without a Datadog login.</div>

{{< img src="/developers/ide_plugins/idea/code_security/local-config.png" alt="A local configuration file for Static Analysis" style="width:100%;" >}}

Read more about how to [customize your configuration][5].

### Settings
The Datadog Static Analyzer can be activated and deactivated in the IDE settings under **Editor** → **Inspections**.

{{< img src="/developers/ide_plugins/idea/code_security/inspections-settings.png" alt="Settings to activate and deactivate Static Analysis" style="width:80%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /security/code_security/static_analysis/setup/?tab=github
[3]: /security/code_security/static_analysis/static_analysis_rules/
[4]: /security/code_security/
[5]: /security/code_security/static_analysis/setup/?tab=github#customize-your-configuration