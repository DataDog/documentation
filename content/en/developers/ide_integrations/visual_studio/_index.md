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
  The Datadog extension for Visual Studio is in public beta. It is intended for .NET developers who use the <a href="https://docs.datadoghq.com/profiler/#pagetitle">Continuous Profiler</a> for their .NET services. If the plugin stops working unexpectedly, check for updates or <a href=#feedback>reach out to the team</a>.
{{< /callout >}}

## Overview

The Datadog extension for Visual Studio helps you to improve software performance by providing meaningful code-level insights in the IDE based on real-time observability data. Together with the Continuous Profiler, the plugin helps you to reduce latency and lower cloud costs by highlighting code lines that:

* Consume the most CPU
* Allocate the most memory
* Spend the most time on locks, disk I/O, socket I/O, and more

## Requirements

* **Visual Studio 2022** version 17 or higher
* **Datadog Account** The plugin requires a Datadog account. If you're new to Datadog, go to the [Datadog website][3] to learn more about Datadog's observability tools and sign up for a free trial.
* **Continuous Profiling** To display code-level insights, the plugin requires Continuous Profiling instrumented on your .NET Services. For more information, see [Getting Started with the Continuous Profiler][2].

## Setup

Download and install the extension from the official [Visual Studio Marketplace][4].

## Feedback

Let us know what you think about the extension! Provide feedback on our [discussion forum][1], or send an e-mail to `team-ide-integration@datadoghq.com`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[2]: /getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
