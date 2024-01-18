---
title: Datadog Extension for Visual Studio
kind: documentation
is_beta: true
further_reading:
- link: "/getting_started/profiler/"
  tag: "Documentation"
  text: "Getting started with the Continuous Profiler"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about Source Code Integration"
- link: "https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio"
  tag: "External Site"
  text: "Visual Studio Marketplace"  
---

## Overview

The Datadog extension for Visual Studio helps you find and fix bugs, security issues, and performance bottlenecks based on real-time observability data from your services and runtime environments.

{{< img src="/developers/ide_integrations/visual_studio/datadog-for-visual-studio.png" alt="Datadog extension for Visual Studio">}}

### Code insights

Stay informed about [Error Tracking][5] issues, [Security Vulnerabilities][6], [Flaky Tests][10], and [Watchdog][7] profiling insights without leaving Visual Studio.

{{< img src="/developers/ide_integrations/visual_studio/code-insights.png" alt="The Code Insights view" >}}

### Continuous Profiler

Analyze and improve the performance of your applications with real-time profiling metrics for CPU, Memory, I/O, and others.

{{< img src="/developers/ide_integrations/visual_studio/top-list.png" alt="The Code Insights view">}}

### Open code in Visual Studio from Datadog

Navigate from Datadog to your source code with one click.

{{< img src="/developers/ide_integrations/visual_studio/view-in-visual-studio.png" alt="A stack trace on the Datadog platform showing the View in Visual Studio button.">}}

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
[7]: /watchdog/insights
[8]: /profiler/
[10]: /continuous_integration/guides/flaky_test_management/
[12]: /integrations/guide/source-code-integration/
[13]: /profiler/enabling/dotnet/?tab=linux#enabling-the-profiler
[14]: https://www.datadoghq.com/lpg/
[15]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[16]: https://github.com/DataDog/datadog-for-visual-studio/issues
[17]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio