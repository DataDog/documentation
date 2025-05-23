---
title: Bits AI Dev Agent
---

The Bits AI Dev Agent is a generative AI coding assistant that uses observability data to detect issues and suggest code changes. Integrated with Datadog products such as Error Tracking and Code Security, the Dev Agent identifies high-impact issues, creates production-ready pull requests with test coverage, and iterates on code in response to developer feedback.

{{< img src="bits_ai/dev_agent/error_tracking_assistant.png" alt="Bits AI Dev Agent suggesting a fix for an IndexError in a Django app" style="width:100%;">}}

## Supported Datadog products

The Dev Agent is available for the following Datadog products:

| Product               | Availability         | Types of issues detected                             |
|-----------------------|----------------------|------------------------------------------------------|
| [Error Tracking][1]   | General Availability | Crashes, panics, exceptions, unhandled errors        |
| [Code Security][2]    | Preview              | Security vulnerabilities in source code              |

## Setup

To start using the Dev Agent:

1. Enable the [GitHub integration][3] (requires PR and checks permissions).
1. Ensure telemetry is tagged with `service` and `version` keys.
1. Click **Enable Dev Agent** in Error Tracking.
1. (Optional) Enable the [Slack integration][4] to receive PR notifications and react in real time.

## Key capabilities

### Proposes GitHub pull requests with fixes
Automatically opens a PR when a high-impact issue is detected. The fix includes a description, test coverage, and links to the original signal. PRs follow your team's code style and formatting conventions.

### Adds unit tests to validate proposed changes
Automatically generates tests to verify the correctness of the fix and prevent regressions. If developers request changes, the tests are updated accordingly.

### Responds to developer feedback in PRs
Updates the code in response to review comments, such as changing logic, adding logging, or returning a different status code. Updated commits are pushed automatically.

### Surfaces Dev Agent activity in a central dashboard

Provides a dedicated interface to view and filter all Dev Agent-generated PRs, including their status, triggering product, and affected service.

[1]: /error_tracking
[2]: /security/code_security
[3]: https://app.datadoghq.com/integrations/github
[4]: https://app.datadoghq.com/integrations/slack