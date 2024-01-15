---
title: Datadog Extension for Visual Studio
kind: documentation
description: Datadog extension for Visual Studio
disable_toc: false
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

Datadog extension for Visual Studio helps you find and fix bugs, security issues, and performance bottlenecks based on real-time observability data from your services and runtime environments.

{{< img src="/developers/ide_integrations/visual_studio/datadog-for-visual-studio.png" alt="Datadog extension for Visual Studio">}}

### Code Insights

Stay informed about [Error Tracking](/tracing/error_tracking/) issues, [Security Vulnerabilities](/visual-studio-docs/security/application_security/vulnerability_management/), [Flaky Tests](/visual-studio-docs/continuous_integration/guides/flaky_test_management/), and [Watchdog](/visual-studio-docs/watchdog/insights) profiling insights without leaving Visual Studio.

{{< img src="/developers/ide_integrations/visual_studio/code-insights.png" alt="The Code Insights view" >}}

### Continuous Profiler

Analyze and improve the performance of your applications with real-time profiling metrics for CPU, Memory, I/O, and others.

{{< img src="/developers/ide_integrations/visual_studio/top-list.png" alt="The Code Insights view">}}

### Open in Visual Studio

Seamless experience for navigating from Datadog to your source code with a single click.

{{< img src="/developers/ide_integrations/visual_studio/view-in-visual-studio.png" alt="A stack trace on the Datadog platform showing the View in Visual Studio button.">}}

## Getting Started

### Requirements

* Windows operating system 64-bit
* Visual Studio 2022 64-bit Community, Professional, or Enterprise edition
* Datadog account with [Continuous Profiler](/profiler/) and [Source Code Integration](/integrations/guide/source-code-integration/) enabled. For more information, see [Enabling the Profiler](/profiler/enabling/dotnet/?tab=linux#enabling-the-profiler)

### Setup and Installation

1. Download and install the extension from the official [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio)
2. In Visual Studio, go to Tools > Options > Datadog
3. Sign-in with your Datadog account, or [sign-up for a free trial](https://www.datadoghq.com/lpg/)
4. Open a solution in Visual Studio
5. Go to Extensions > Datadog > Linked Services
6. Add services and save your solution
7. Go to Extensions > Datadog > Code Insights

## Feedback

Report a bug, request a new feature, or ask for help on our [Discussion Forum](https://github.com/DataDog/datadog-for-visual-studio/discussions) and [Issue Tracker](https://github.com/DataDog/datadog-for-visual-studio/issues) on GitHub. You can also send us an e-mail to `team-ide-integration@datadoghq.com`

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
