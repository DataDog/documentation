---
title: Datadog Extension for Visual Studio
is_beta: true
aliases:
- '/developers/ide_integrations/visual_studio/'
further_reading:
- link: "/getting_started/profiler/"
  tag: "Documentation"
  text: "Getting started with the Continuous Profiler"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about Source Code Integration"
- link: "/security/code_security/static_analysis"
  tag: "Documentation"
  text: "Learn about Static Analysis"
- link: "https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio"
  tag: "External Site"
  text: "Visual Studio Marketplace"
- link: "https://www.datadoghq.com/blog/datadog-ide-plugins/"
  tag: "Blog"
  text: "Reduce context switching while troubleshooting with Datadog's IDE plugins"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    The Datadog extension for Visual Studio is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Overview

The Datadog extension for Visual Studio helps you find and fix bugs, security issues, and performance bottlenecks based on real-time observability data from your services and runtime environments.

{{< img src="/developers/ide_plugins/visual_studio/datadog-for-visual-studio.png" alt="Datadog extension for Visual Studio">}}

### Code insights

Stay informed about [Error Tracking][5] issues, [Security Vulnerabilities][6], and [Flaky Tests][10] without leaving Visual Studio.

{{< img src="/developers/ide_plugins/visual_studio/code-insights.png" alt="The Code Insights view" >}}

### Continuous Profiler

Analyze and improve the performance of your applications with real-time profiling metrics for CPU, Memory, I/O, and others.

{{< img src="/developers/ide_plugins/visual_studio/top-list.png" alt="The Code Insights view">}}

### Logs navigation

You can navigate to the [Log Explorer][18] on the Datadog platform directly from your C# source files. Look for the clickable icon preceding message strings from log statements within your source code:

{{< img src="/developers/ide_plugins/visual_studio/logs-navigation.png" alt="A source file showing log lines with clickable icons." style="width:100%;" >}}

Clicking the icon opens the **Log Explorer** with a query that matches the logger name, log level, and log message as closely as possible.

### Open code in Visual Studio from Datadog

Navigate from Datadog to your source code with one click.

{{< img src="/developers/ide_plugins/visual_studio/view-in-visual-studio.png" alt="A stack trace on the Datadog platform showing the View in Visual Studio button.">}}

### Static Analysis

The Datadog extension runs [Static Analysis][19] rules on the source files you have open in your Solution. The goal is to detect and fix problems such as maintainability issues, bugs, or security vulnerabilities in your code before you commit your changes.

Static Analysis supports scanning for many programming languages. For a complete list, see [Static Analysis Rules][20]. For file types belonging to supported languages, rule violations are highlighted in the source code editor, and suggested fixes can be applied directly:

{{< img src="/developers/ide_plugins/visual_studio/static-analysis-issue.png" alt="A static analysis rule violation." style="width:100%;" >}}

When you start editing a source file supported by Static Analysis, the extension checks for `static-analysis.datadog.yml` at your source repository's root. The static analyzer runs automatically in the background.

<div class="alert alert-info">The Static Analysis feature does not require a Datadog account, as source files are analyzed locally.</div>

## Getting started

### Requirements

* Windows operating system 64-bit
* Visual Studio 2022 64-bit Community, Professional, or Enterprise edition
* Datadog account with [Continuous Profiler][8] and [Source Code Integration][12] enabled. For more information, see [Enabling the Profiler][13].

### Setup and installation

1. Download and install the extension from the [Visual Studio Marketplace][17].
1. In Visual Studio, go to **Tools > Options > Datadog** to configure the extension.
1. Sign in to Datadog by clicking the plus (**+**) icon. Changes do not affect existing connections to Datadog.

After you set up this extension, open a solution in Visual Studio. You can go to **Extensions > Datadog > Code Insights** to view the Code Insights for the current solution and git repository. To filter insights by service, go to **Extensions > Datadog > Filter by Service** and select one or more services from your runtime environments.

### Custom subdomains

If your organization uses a [custom sub-domain][23], set the custom URL as the Datadog server address in the extension settings:
1. Click **Tools > Options > Datadog**.
1. If you're editing an existing connection to Datadog, sign out of the connection before you edit the server address. Changes do not affect existing connections.
1. Under **Advanced**, set your custom URL as the Datadog server address.
1. Click the plus (**+**) icon to sign in.

## Feedback

Report a bug, request a new feature, or ask for help on the [Discussion Forum][15] and [Issue Tracker][16] on GitHub. You can also email `team-ide-integration@datadoghq.com`.

## Data and Telemetry
Datadog anonymously collects information about your usage of this IDE, including how you interact with it, whether errors occurred while using it, and what caused those errors, in accordance with the [Datadog Privacy Policy][21] and [Datadog's EULA][22].

If you don't wish to send this data to Datadog, you can opt out at any time in the settings: `Options > Datadog > General > Data Sharing` and disable the `Send usage statistics` option.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[2]: /getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[5]: /tracing/error_tracking/
[6]: /security/code_security/software_composition_analysis/
[8]: /profiler/
[10]: /continuous_integration/guides/flaky_test_management/
[12]: /integrations/guide/source-code-integration/
[13]: /profiler/enabling/dotnet/?tab=linux#enabling-the-profiler
[14]: https://www.datadoghq.com/lpg/
[15]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[16]: https://github.com/DataDog/datadog-for-visual-studio/issues
[17]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[18]: /logs/explorer/
[19]: /security/code_security/static_analysis/
[20]: /security/code_security/static_analysis/static_analysis_rules/
[21]: https://www.datadoghq.com/legal/privacy/
[22]: https://www.datadoghq.com/legal/eula/
[23]: /account_management/multi_organization/#custom-sub-domains
