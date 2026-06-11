---
title: Bits Investigation
description: Investigate Error Tracking issues with Bits Investigation to find the root cause, assess impact, and hand off a code fix to Bits Code.
further_reading:
- link: '/bits_ai/bits_ai_dev_agent/'
  tag: 'Documentation'
  text: 'Generate code fixes with Bits Code'
- link: '/integrations/guide/source-code-integration/'
  tag: 'Documentation'
  text: 'Set up Source Code Integration'
- link: '/error_tracking/link_pull_requests/'
  tag: 'Documentation'
  text: 'Link pull requests to issues'
- link: '/error_tracking/issue_states/'
  tag: 'Documentation'
  text: 'Manage issue states'
- link: '/bits_ai/bits_ai_sre/'
  tag: 'Documentation'
  text: 'Bits Investigation for alerts and monitors (on-call)'
---

<div class="alert alert-info">Bits Investigation in Error Tracking is in trial. Behavior and availability can change.</div>

## Overview

Bits Investigation is built into Error Tracking. When you open an issue, it investigates the error and reports the likely root cause, the impact, and the recommended next step. When the resolution is a code change, it hands off to [Bits Code][1] to generate the fix.

This page covers Bits Investigation in Error Tracking. To investigate alerts and monitors during on-call, see [Bits Investigation for on-call operations][2].

<!-- TODO: add screenshot. {{< img src="error_tracking/bits_investigation/overview.png" alt="A Bits Investigation result in the Error Tracking issue panel" style="width:100%;" >}} -->

## How it works

You run an investigation on demand from the issue panel. Bits Investigation then:

1. Reads the issue, including the stack trace, error attributes, and related telemetry (logs, traces, and RUM events).
2. Reads the relevant source code when [Source Code Integration](#connect-your-source-code) is set up.
3. Forms a hypothesis about the root cause and checks it against the available data.
4. Returns a result: the likely root cause with its supporting evidence, an impact assessment (how many users, sessions, and accounts are affected), suspect commits when source code is connected, and a recommended next step.

From the result, you decide what to do next, as described in [Resolve the issue](#resolve-the-issue).

<div class="alert alert-info">Connecting your source code has the largest effect on result quality. With <a href="#connect-your-source-code">Source Code Integration</a> set up, Bits Investigation reads the code that was running when the error occurred. This sharpens root cause analysis and makes suspect commits and code fixes possible. Without it, investigations still run on error patterns and telemetry alone, so the results are less precise.</div>

## Prerequisites and setup

### Enable Bits in your organization

Bits Investigation requires Bits to be enabled and AI providers to be allowed for your organization.

- If Bits is not enabled, enable it from the Bits settings page.
- If AI providers are blocked, Datadog AI features are unavailable for your organization. Contact your account admin or Datadog support to enable them.

### Connect your source code

Source Code Integration lets Bits Investigation read the code that was running when the error occurred. It is required for suspect commits and code fixes, and it improves accuracy. Connect a supported Git provider (GitHub or GitLab) and make sure your telemetry carries Git information.

How you send Git information depends on the platform:

| Platform        | What to configure                                       |
|-----------------|---------------------------------------------------------|
| Backend service | Set Git information in your deployment configuration.   |
| Browser         | [Upload source maps][6] with Git information.           |
| Mobile          | [Upload debug symbols][7] with Git information.         |

For setup steps, see [Source Code Integration][3].

## Resolve the issue

From a result, you can:

- **Fix with Bits Code**: when the issue is fixable through a code change, hand off to [Bits Code][1] to generate a fix and open a pull request. This option appears when Bits Investigation determines the issue is fixable in code, and you can also trigger a fix manually when it does not.
- **Copy as Markdown**: copy the issue context for your AI assistant, then paste it into the agent of your choice.
- **Create a ticket**: open a ticket in [Jira, Linear, or Case Management][4].
- **Resolve or ignore**: change the [issue state][5] directly from the panel.

You can re-run an investigation at any time, and add your own context to guide it.

<!-- TODO: add screenshot of re-running with added context (pencil icon at the top right of the Resolve tab). {{< img src="error_tracking/bits_investigation/rerun_with_context.png" alt="Re-running a Bits Investigation with added context from the Resolve tab" style="width:100%;" >}} -->

## Find issues with investigations

Use the **Investigation Ready** filter in the Error Tracking Explorer to find issues that already have a result. Issues with an investigation show an icon on their Explorer card.

## Availability

Bits Investigation in Error Tracking is in trial.

## Permissions

Access to Bits Investigation follows your Bits AI permissions: reading and triggering investigations are controlled by your read and write access. <!-- TODO: confirm the exact role/permission name to cite publicly. -->

Running investigations and reading results does not require a personal Git connection. Creating a pull request from a code fix does: connect your individual GitHub or GitLab account first.

## Limitations

- Bits Investigation works within a single repository. It does not investigate across multiple repositories.
- Bits Investigation uses AI and can make mistakes. Review and test any generated code before you merge it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_ai_dev_agent/
[2]: /bits_ai/bits_ai_sre/
[3]: /integrations/guide/source-code-integration/
[4]: /error_tracking/ticketing_systems/
[5]: /error_tracking/issue_states/
[6]: /real_user_monitoring/guide/upload-javascript-source-maps
[7]: /error_tracking/frontend/mobile/
