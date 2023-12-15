---
title: Datadog Extension for Visual Studio
kind: documentation
description: The Datadog extension for .NET developers
disable_toc: false
is_beta: true
further_reading:
- link: "/getting_started/profiler/"
  tag: "Documentation"
  text: "Getting started with Continuous Profiler."
---

{{< callout url="#" btn_hidden="true">}}
  The Datadog extension for Visual Studio is in public beta. It is intended for .NET developers who use the <a href="https://docs.datadoghq.com/profiler/#pagetitle">Continuous Profiler</a> for their .NET services. If the extension stops working unexpectedly, check for updates or <a href=#feedback>reach out to the team</a>.
{{< /callout >}}

## Overview

The Datadog extension for Visual Studio helps you to improve software performance by providing meaningful code-level insights in the IDE based on real-time observability data.

The **Code Insights** view keeps you informed about:

- Issues from [Error Tracking][5]
- [Vulnerability][6] reports from Application Security Management
- Profiling insights from [Watchdog Insights][7]

The **Continuous Profiler** helps you to reduce latency and lower cloud costs by highlighting code lines that:

- Consume the most CPU
- Allocate the most memory
- Spend the most time on locks, disk I/O, and socket I/O

## Requirements

- Windows 10 or higher
- .NET Framework 4.7.2 or higher
- Visual Studio 2022 Community, Professional or Enterprise edition (64-bit)
- **Datadog Account**: The extension requires a Datadog account. If you're new to Datadog, go to the [Datadog website][3] to learn more about Datadog's observability tools and sign up for a free trial.
- **Continuous Profiler**: To display profiling data and insights, the extension requires the Continuous Profiler to be configured for your services. For more information, see [Getting Started with the Continuous Profiler][2]

## Getting Started

### Download and install the extension

1. In Visual Studio, go to **Extensions** > **Manage Extensions**.
2. Search for `Datadog`.
3. Click **Download**.
4. Restart Visual Studio.

Alternatively, you can download the extension from the official [Visual Studio Marketplace][4]

### Sign-in with your Datadog account

1. In Visual Studio, go to **Tools** > **Options** > **Datadog**.
2. Click **Sign In**.
3. In the browser window that opens, select your site and organization and authorize access to the platform.

### Link services

1. Open a .NET solution file with Visual Studio.
2. Go to **Extensions** > **Datadog** > **Linked Services**.
3. Click **Add Service**.
4. Select the services that are related to your .NET solution.
5. Save the .NET solution file.

## Feedback

Let us know what you think about the extension! Provide feedback on our [discussion forum][1], or send an e-mail to `team-ide-integration@datadoghq.com`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[2]: /getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[5]: https://docs.datadoghq.com/tracing/error_tracking/
[6]: https://docs.datadoghq.com/security/application_security/vulnerability_management/
[7]: https://docs.datadoghq.com/watchdog/insights
