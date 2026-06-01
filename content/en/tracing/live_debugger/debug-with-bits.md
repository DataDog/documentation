---
title: Debug with Bits
description: Use Bits Code to create and manage Live Debugger sessions through a conversational interface.
further_reading:
- link: "/bits_ai/bits_ai_dev_agent/"
  tag: "Documentation"
  text: "Bits Code"
- link: "/tracing/live_debugger/"
  tag: "Documentation"
  text: "Live Debugger"
- link: "/dynamic_instrumentation/sensitive-data-scrubbing/"
  tag: "Documentation"
  text: "Sensitive Data Scrubbing"
---

{{< beta-callout url="https://www.datadoghq.com/product-preview/debug-with-bits/" >}}
Debug with Bits is in Preview. Request access to join the waiting list.
{{< /beta-callout >}}

## Overview

Debug with Bits brings a conversational interface to Live Debugger for investigating running services through natural language. Describe what you want to investigate, and Bits places logpoints, retrieves variable snapshots, and interprets results. After Bits identifies a root cause, it can suggest code fixes.

All debugging activity runs through [Live Debugger][1], so the same [permissions][2], rate limits, auto-expiry behavior, and [sensitive data scrubbing][3] apply.

<div class="alert alert-info">
Debug with Bits uses <a href="/bits_ai/bits_ai_dev_agent/">Bits Code</a>, which may impact billing.
</div>

## Prerequisites

Before using Debug with Bits:

- [Live Debugger][1] must be enabled for the target service. See [Requirements and setup][7] for details.
- Your account must have the [permissions][2] required to use Live Debugger, including read, write, and variable-capture permissions for the target environment.
- [Bits Code][5] must be available in your organization.
- [Source Code Integration][6] must be set up for the target service.

## Available actions

Bits can perform the following Live Debugger actions during a debugging session:

| Action | Description |
|--------|-------------|
| Discover services | Find and validate services available for debugging in a given environment. |
| Create logpoints | Add logpoints to a running service at a specific code location. |
| List session logpoints | Show the logpoints active in a Debug Session. |
| Disable logpoints | Disable all logpoints in a Debug Session. |
| Retrieve snapshot data | Fetch captured variable values and execution context from an active logpoint. |

Logpoints created by Bits follow the same rules as manually created logpoints. They are read-only, non-blocking, and expire automatically after the configured time limit (10 minutes to 2 days; default: 60 minutes). Bits cannot modify application state or alter control flow.

## Start a debugging session

1. Go to [Live Debugger][4] in Datadog.
1. In the Debug with Bits chatbox, describe the issue you want to investigate. Select the target service and environment before submitting the prompt.

   Bits then works through the investigation automatically:
   - It analyzes relevant code paths in the connected source code repository and may ask follow-up questions to form a hypothesis.
   - It configures and activates up to 5 logpoints at relevant code locations to capture the specific data it needs.
   - It retrieves and analyzes the logs and variable snapshots from the active logpoints to validate its hypothesis and formulate its response.

1. Review the response from Bits and, optionally, explore the details of the logpoints, captured data, and any code fixes suggested. Reply in the chat to continue the investigation as needed.
1. To disable logpoints at any time, ask Bits or click the **Disable** button on an individual logpoint or the session.

**Note**: Bits typically disables the logpoints it creates as soon as it retrieves the data it needs. Logpoints also expire automatically after the configured time limit.

## Behavior and limitations

**Multi-version environments**: When multiple code versions are deployed in the target environment, the target file may differ between versions. In that case, Bits asks you to confirm the target version before placing a logpoint. This prevents logpoints from landing at incorrect line numbers.

**Language support**: Some features vary by language. For example, condition expressions are not supported for all runtimes. Bits notifies you when a requested feature is not available for the target service's language.

**Sensitive data**: The [sensitive data scrubbing][3] behavior that applies to manually created logpoints also applies to logpoints created by Bits. In production environments, non-numeric and non-Boolean captured values are redacted by default.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/live_debugger/
[2]: /tracing/live_debugger/#permissions
[3]: /dynamic_instrumentation/sensitive-data-scrubbing/
[4]: https://app.datadoghq.com/debugging/sessions
[5]: /bits_ai/bits_ai_dev_agent/
[6]: /source_code/source-code-management/
[7]: /tracing/live_debugger/#requirements-and-setup
