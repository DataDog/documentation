---
title: Debug with Bits
description: Use Bits AI Dev Agent to create and manage Live Debugger sessions through a conversational interface.
further_reading:
- link: "/bits_ai/bits_ai_dev_agent/"
  tag: "Documentation"
  text: "Bits AI Dev Agent"
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

Debug with Bits brings a conversational interface to Live Debugger for investigating running services through natural language. Describe what you want to investigate and Bits does the work: placing logpoints, retrieving variable snapshots, and interpreting results. Once Bits identifies a root cause, it can also suggest code fixes based on its findings.

All debugging activity runs through [Live Debugger][1], so the same [permissions][2], rate limits, auto-expiry rules, and [sensitive data scrubbing][3] apply.

<div class="alert alert-info">
Debug with Bits uses <a href="/bits_ai/bits_ai_dev_agent/">Bits AI Dev Agent</a>, which may impact billing.
</div>

## Requirements

Before using Debug with Bits:

- [Live Debugger][1] must be enabled for the target service. See [Requirements and setup][1] for details.
- Your account needs the [permissions][2] required to use Live Debugger, including read, write, and variable-capture permissions for the target environment.
- [Bits AI Dev Agent][5] must be available in your organization.
- [Source Code Integration][6] must be set up for the target service.


## Available actions

Bits can perform the following Live Debugger actions during a debugging session:

| Action | Description |
|--------|-------------|
| Discover services | Find and validate services available for debugging in a given environment. |
| Create logpoints | Add logpoints to a running service at a specific code location. |
| List session logpoints | Show the logpoints active in a Debug Session. |
| Disable logpoints | Disable all logpoints in a session. |
| Retrieve snapshot data | Fetch captured variable values and execution context from an active logpoint. |

Logpoints created by Bits follow the same rules as manually created logpoints. They are read-only, non-blocking, and auto-expire after the configured time limit - between 10 minutes and 2 days (default: 60 minutes). Bits cannot modify application state or alter control flow.

## Get started

1. Navigate to the [Live Debugger page][4].
1. In the Debug with Bits chatbox, describe the issue you want to investigate. Select the target service and environment before submitting the prompt.  
1.  Bits analyzes relevant code paths in the connected source code repository and may ask follow up questions to form a hypothesis.

1. Bits configures and activates up to 5 logpoints at relevant code locations to capture the specific data it needs.
1. Bits retrieves and analyzes the logs and variable snapshots from the active logpoints to validate its hypothesis and formulate its response.
1. Review the response from Bits and (optionally) explore the details of the logpoints, captured data, and any code fixes suggested. Reply to the chat to continue the investigation as needed.
1. Bits typically disables the logpoints it creates as soon as it has retrieved the data it needs. Also, logpoints auto-expire after the session's set time period. Disable logpoints at any time by asking Bits or clicking the Disable button on an individual logpoint or the session.

## Notes

**Multi-version environments**: When multiple code versions are deployed in the target environment, the target file may differ between versions. In that case, Bits asks you to confirm the target version before placing a logpoint. This prevents logpoints from landing at incorrect line numbers.

**Language support**: Some features vary by language. For example, condition expressions are not supported for all runtimes. Bits notifies you when a requested feature is not available for the target service's language.

**Sensitive data**: The same [sensitive data scrubbing][3] that applies to manually created logpoints applies to logpoints created by Bits. In production environments, non-numeric and non-Boolean captured values are redacted by default.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/live_debugger/
[2]: /tracing/live_debugger/#permissions
[3]: /dynamic_instrumentation/sensitive-data-scrubbing/
[4]: https://app.datadoghq.com/debugging/sessions
[5]: /bits_ai/bits_ai_dev_agent/
[6]: /source_code/source-code-management/
