---
title: Datadog Extension for Visual Studio
kind: documentation
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
- link: "/code_analysis/static_analysis"
  tag: "Documentation"
  text: "Learn about Static Analysis"
- link: "https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio"
  tag: "External Site"
  text: "Visual Studio Marketplace"  
- link: "https://www.datadoghq.com/blog/datadog-ide-plugins/"
  tag: "Blog"
  text: "Reduce context switching while troubleshooting with Datadog's IDE plugins"
---

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

1. Download and install the extension from the official [Visual Studio Marketplace][17].
2. In Visual Studio, go to **Tools > Options > Datadog**.
3. Sign in with your Datadog account, or [sign up for a free trial][14].
4. Open a solution in Visual Studio.
5. Go to **Extensions > Datadog > Linked Services**.
6. Add services, and save your solution.
7. Go to **Extensions > Datadog > Code Insights**.

## Feedback

Report a bug, request a new feature, or ask for help on the [Discussion Forum][15] and [Issue Tracker][16] on GitHub. You can also email `team-ide-integration@datadoghq.com`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[2]: /getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[5]: /tracing/error_tracking/
[6]: /security/application_security/vulnerability_management/
[8]: /profiler/
[10]: /continuous_integration/guides/flaky_test_management/
[12]: /integrations/guide/source-code-integration/
[13]: /profiler/enabling/dotnet/?tab=linux#enabling-the-profiler
[14]: https://www.datadoghq.com/lpg/
[15]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[16]: https://github.com/DataDog/datadog-for-visual-studio/issues
[17]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[18]: /logs/explorer/
[19]: /code_analysis/static_analysis/
[20]: /code_analysis/static_analysis_rules/
