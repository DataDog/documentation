---
title: Bits AI Dev Agent
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Bits AI Dev Agent is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< img src="bits_ai/dev_agent/error_tracking_assistant.png" alt="Bits AI Dev Agent suggesting a fix for an IndexError in a Django app" style="width:100%;">}}

The Bits AI Dev Agent is a generative AI coding assistant that uses observability data to detect issues and suggest code changes. Integrated with Datadog products such as Error Tracking and Code Security, the Dev Agent identifies high-impact issues, creates production-ready pull requests, and iterates on code in response to developer feedback.

Key capabilities include:

- **Automatic PR creation**: Opens GitHub pull requests with production-ready fixes for high-impact issues.
- **Responsive code updates**: Iterates on code in response to review comments—e.g., modifying logic or adding logging.
- **Centralized PR tracking**: Surfaces all Dev Agent-generated pull requests in one place, with filters by status, product, and service.

## Supported Datadog products

The Dev Agent is available for the following Datadog products:

| Product               | Availability         | Types of issues detected                             |
|-----------------------|----------------------|------------------------------------------------------|
| [Error Tracking][1]   | General Availability | Crashes, panics, exceptions, unhandled errors        |
| [Code Security][2]    | Preview              | Security vulnerabilities in source code              |
| [Profiler][3]         |                      |                                                      |

## Setup

<div class="alert alert-info">At this time, the Dev Agent supports GitHub only.</div>

### Enable the GitHub integration

To allow the Dev Agent to open pull requests, you must:

- Enable the [GitHub integration][4] in Datadog.
- Grant the following permissions:
  - **Read repository contents**
  - **Create pull requests**
- Additional GitHub-side configuration may be required. [Details to come.]

### Tag telemetry with service and version

The Dev Agent requires observability data to be tagged with `service` and `version` to associate signals with the correct code.

- Follow the steps in the [source code integration guide][5] to apply the required tags.
- Git metadata tagging (for example, commit hash and repo) is also recommended for full functionality.

### Enable the Dev Agent

Placeholder for onboarding flow with **Enable Dev Agent** button.

[1]: /error_tracking
[2]: /security/code_security
[3]: /profiler/
[4]: https://app.datadoghq.com/integrations/github
[5]: /integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information