---
title: Datadog Extension for VS Code & Cursor
description: Integrate Datadog telemetry and insights into your source code in VS Code and other code editors.
is_beta: true
aliases:
- '/developers/ide_integrations/vscode/'
further_reading:
- link: "/continuous_testing/"
  tag: "Documentation"
  text: "Learn about Continuous Testing"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about Source Code Integration"
- link: "/bits_ai/mcp_server/"
  tag: "Documentation"
  text: "Learn about the Datadog Model Context Protocol (MCP) Server"
- link: "https://www.datadoghq.com/blog/datadog-ide-plugins/"
  tag: "Blog"
  text: "Reduce context switching while troubleshooting with Datadog's IDE plugins"
- link: "https://www.datadoghq.com/blog/exception-replay-datadog/"
  tag: "Blog"
  text: "Simplify production debugging with Datadog Exception Replay"
- link: "https://www.datadoghq.com/blog/datadog-cursor-extension/"
  tag: "Blog"
  text: "Debug live production issues with the Datadog Cursor extension"
---

<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    The Datadog extension for Visual Studio Code is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Overview

The Datadog extension for VS Code and Cursor brings Datadog to your code editor to accelerate your development.

{{< img src="/developers/ide_plugins/vscode/datadog-vscode-3.png" alt="Datadog extension for VS Code and Cursor" style="width:100%;" >}}

The extension includes these features:

- [**Model Context Protocol (MCP) Server**](?tab=cursor#installation): Connect the editor's AI agent to production telemetry, tools, and contexts from Datadog.

- [**Log Annotations**](#log-annotations): Gauge log volumes and search logs from your code.

- [**Code Insights**](#code-insights): Stay informed about runtime errors, vulnerabilities, and flaky tests without leaving the code.

- [**View in IDE**](#view-in-ide): Jump directly from code references in Datadog to your source files.

- [**Static Code Analysis**](#static-code-analysis): Detect and fix problems before you commit changes.

- [**Exception Replay**](#exception-replay): Debug your production code.

- [**Fix in Chat**](?tab=cursor#fix-in-chat): (Cursor only) Fix code errors, vulnerabilities, and flaky tests with AI-powered suggestions and explanations.

<div class="alert alert-info">Unless stated otherwise, all extension features are available for both VS Code and any other IDEs based on VS Code forks, such as Cursor.</div>

## Requirements

- **Datadog account**: Most features require a Datadog account.  
  - New to Datadog? [Learn more][3] about Datadog's monitoring and security tools and sign up for a free trial.  
  - If your organization uses a [custom sub-domain][18] such as `myorg.datadoghq.com`, you must indicate it using the `datadog.connection.oauth.setup.domain` setting in the IDE.

- **Git**: The extension works better when Git is enabled in the IDE. Ensure this is enabled by checking the `git.enabled` setting.

## Installation

Installation procedures may vary among other integrated development environments (IDEs).

{{< tabs >}}
{{% tab "VS Code" %}}
Install the extension either directly in the IDE, or from the web:

- **In VS Code**: Open the Extensions view (`Shift` + `Cmd/Ctrl` + `X`), search for `datadog`, and select the official extension from Datadog. 

- **From the web**: Install from the extension's page on [Visual Studio Marketplace][1].

### MCP Server setup

<div class="alert alert-info">The Datadog MCP Server is in Preview. Complete <a href="https://www.datadoghq.com/product-preview/datadog-mcp-server">this form</a> to request access.</div>

The extension includes access to the [Datadog Model Context Protocol (MCP) Server][3]. Ensure the MCP Server is enabled to enhance the editor's AI capabilities with your specific Datadog environment:

1. Open the chat panel, select agent mode, and click the **Configure Tools** button.
    {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Configure Tools button in VS Code" style="width:60%;" >}}

1. Find the Datadog server and tools in the list and check the boxes to enable them (expand or refresh if necessary).

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /bits_ai/mcp_server/
{{% /tab %}}

{{% tab "Cursor" %}}
Install the extension either directly in the IDE, or from the web:

- **In Cursor**: Open the Extensions view (`Shift` + `Cmd/Ctrl` + `X`), search for `datadog`, and select the official extension from Datadog. 

- **From the web**: Download the VSIX file from [Open VSX Registry][2], and install with `Extensions: Install from VSIX` in the command palette (`Shift` + `Cmd/Ctrl` + `P`).

### MCP Server setup

<div class="alert alert-info">The Datadog MCP Server is in Preview. Complete <a href="https://www.datadoghq.com/product-preview/datadog-mcp-server">this form</a> to request access.</div>

The extension includes access to the [Datadog Model Context Protocol (MCP) Server][3]. Ensure the MCP Server is enabled to enhance the editor's AI capabilities with your specific Datadog environment:

1. Go to **Cursor Settings** (`Shift` + `Cmd/Ctrl` + `J`), and select the **MCP** tab.
1. Find the Datadog server and turn on the toggle to enable it. A list of available tools is displayed (expand or refresh if necessary).

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /bits_ai/mcp_server/
{{% /tab %}}
{{< /tabs >}}

## Log annotations

Use **Log Annotations** to gauge the volume of logs generated by a given log line in your code. The extension adds annotations above your code to detected logging patterns that match log records in Datadog. Click an annotation to open the [Log Explorer][4] in Datadog and view the matching logs.

{{< img src="/developers/ide_plugins/vscode/logs_navigation.mp4" alt="Preview of Logs Navigation" style="width:100%" video=true >}}

You can also search Datadog logs from within the IDE. Select any text in the code editor, then right-click and select **Datadog \> Search Logs With Selected Text**.

{{< img src="developers/ide_plugins/vscode/log_search.png" alt="Using the Datadog Log explorer feature" style="width:100%;" >}}

## Code insights

**Code insights** keep you informed with Datadog-generated insights that are relevant to your code base:

- Runtime errors collected by [Error Tracking][5]  
- Code and library vulnerabilities reported by [Code Security][6]  
- Flaky tests detected by [Test Optimization][7]

The extension identifies errors and vulnerabilities in the code with colored squiggles; hover over the line for more details.

{{< img src="/developers/ide_plugins/vscode/code-insights-inline-hover.mp4" alt="Hovering over inline code insights" style="width:100%" video=true >}}

The **Code Insights** view in the Datadog sidebar lists all the issues found in the repository. Select an item to view the full insight, and use the links to jump to the related source code location or open the code insight in Datadog.

You can group code insights by kind, file, priority, or service. You can also ignore individual code insights and set filters to view the ones you're most interested in.

{{< img src="/developers/ide_plugins/vscode/code-insights-2.png" alt="The Code Insights view." style="width:100%;" >}}

For specific insights about the file currently open in the active editor, check the **File Insights** view in the IDE's file explorer. This view also lists issues discovered by [Static Code Analysis](#static-code-analysis) within the file.

{{< img src="/developers/ide_plugins/vscode/file_insights_view.mp4" alt="File Insights view" style="width:100%" video=true >}}

## View in IDE

<div class="alert alert-info">This feature is only available for VS Code and Cursor. Other forks of VS Code are not supported.</div>

The **View in VS Code** or **View in Cursor** feature provides a link from Datadog directly to your source files. Look for the button next to frames in stack traces displayed in the UI (for example, in [Error Tracking][5]):

{{< img src="/developers/ide_plugins/vscode/view-in-vscode-2.png" alt="A stack trace in Datadog showing the View in VS Code button" style="width:100%;" >}}

You can also use this feature to open your source files from an insight (such as an error from Error Tracking):

{{< img src="/developers/ide_plugins/vscode/view-in-vscode-error.png" alt="An Error Tracking issue in the Datadog showing the View in VS Code button" style="width:100%;" >}}

<div class="alert alert-info">To use this feature, first configure <a href="/integrations/guide/source-code-integration/">source code integration</a> for your service.</div>

## Static Code Analysis

[Static Code Analysis][8] analyzes your code (locally) against predefined rules to detect and fix problems.

The extension runs Static Code Analysis rules on the source files you have open in your workspace. This allows you to detect and fix problems such as maintainability issues, bugs, or security vulnerabilities in the code before you commit your changes.

Static Code Analysis supports scanning for many programming languages. For a complete list, see [Static Code Analysis Rules][9]. For file types belonging to supported languages, issues are shown in the source code editor, and you can directly apply suggested fixes.

{{< img src="/developers/ide_plugins/vscode/static_analysis.mp4" alt="Preview of Static Analysis" style="width:100%" video=true >}}

### Get started with Static Code Analysis

When you start editing a source file, the extension checks for [`static-analysis.datadog.yml`][10] at your source repository's root. It prompts you to create it if necessary.

{{< img src="/developers/ide_plugins/vscode/static-analysis-onboard.png" alt="Onboarding banner for setting up Static Code Analysis with Python files" style="width:75%;" >}}

After you create the configuration file, the analyzer runs automatically in the background whenever you open a file. If you need to enable Static Code Analysis for a particular language, search for the command `Datadog: Configure Static Analysis Languages` in the command palette (`Shift` + `Cmd/Ctrl` + `P`).

You can also run a batch analysis for individual folders and even the entire workspace. In the IDE's file explorer view, right-click a folder and select **Datadog Static Analysis > Analyze Folder** or **Analyze Workspace**.

<div class="alert alert-info">Static Code Analysis does not require a Datadog account, as source files are analyzed locally.</div>

## Exception Replay

**Exception Replay** allows you to inspect the stack trace frames of any Error Tracking code insight and get information about the values of the variables of the code running in production.

To access this feature, you must enable [Error Tracking Exception Replay][11] on Datadog.

After the feature has been enabled, you can see an **Exception Replay** button next to the stack trace section of any instrumented Error Tracking code insight. Click the button to:

- Access all the information Datadog has about the different frames.
- Navigate through the production code.
- Review the value of the different variables involved.

Select an Error Tracking code insight from the Code Insights view. Go to the stack trace and click the Exception Replay button. The IDE shows a new activity with two new views:

- **Variables**: Displays the variables related to a particular stack trace frame.
- **Stack Trace**: Lists the stack frames for navigation.

Select a stack trace frame and inspect the values of all the variables that Datadog captured from your production code.

{{< img src="/developers/ide_plugins/vscode/exception_replay.mp4" alt="Preview of Exception Replay" style="width:100%" video=true >}}

## Fix in Chat

{{< tabs >}}
{{% tab "VS Code" %}}
This extension feature is not supported in VS Code.
{{% /tab %}}

{{% tab "Cursor" %}}
The **Fix in Chat** button appears in several contexts when the extension identifies errors or issues. Click the button to generate an AI chat prompt that summarizes the problem, includes relevant details and context, and gives specific instructions for the agent.

{{< img src="/developers/ide_plugins/vscode/cursor_fix_in_chat.mp4" alt="Using Fix in Chat to fix an inline code error" style="width:100%" video=true >}}

{{% /tab %}}
{{< /tabs >}}

## License

Read the [End-User License Agreement][12] carefully before downloading or using this extension.

## Data and telemetry

Datadog collects certain information about your usage of this IDE, including how you interact with it, whether errors occurred while using it, what caused those errors, and user identifiers in accordance with the [Datadog Privacy Policy][13] and Datadog's [VS Code extension EULA][12]. This data is used to help improve the extension's performance and features, including transitions to and from the extension and the applicable Datadog login page for accessing the Services.

If you don't wish to send this data to [Datadog][3], you can disable this at any time in the extension's settings: `Datadog > Telemetry > Setup > Enable Telemetry` and select `disabled`.

<div class="alert alert-info">The Datadog extension also honors the <a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">VS Code telemetry</a> setting.</div>

## Help and feedback

To share your feedback, email [team-ide-integration@datadoghq.com][14] or create an issue in the extension's [public repository][15].

Check out the [issues][16] section to discover known issues.

Do you use [Cursor][17], or another fork of VS Code? Find the extension on the [Open VSX Registry][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: https://www.datadoghq.com/
[4]: /logs/explorer/
[5]: /tracing/error_tracking/
[6]: /security/code_security/
[7]: /tests/explorer/
[8]: /continuous_integration/static_analysis/?tab=githubactions
[9]: /security/code_security/static_analysis/static_analysis_rules/
[10]: /security/code_security/static_analysis/setup/
[11]: /tracing/error_tracking/exception_replay
[12]: https://www.datadoghq.com/legal/eula/
[13]: https://www.datadoghq.com/legal/privacy/
[14]: mailto:team-ide-integration@datadoghq.com
[15]: https://github.com/DataDog/datadog-for-vscode
[16]: https://github.com/DataDog/datadog-for-vscode/issues?q=is%3Aissue+label%3A%22known+issue%22
[17]: https://www.cursor.com/
[18]: /account_management/multi_organization/#custom-sub-domains
