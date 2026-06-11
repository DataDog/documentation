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

<div class="alert alert-info">Bits Investigation in Error Tracking is in trial. Behavior and availability can change, and the product shows a trial badge while the trial is active.</div>

## Overview

Bits Investigation is built into Error Tracking. When you open an issue, it investigates the error and reports the likely root cause, who and what is affected, and the recommended next step. When the resolution is a code change, it hands off to [Bits Code][1] to generate the fix.

This page covers Bits Investigation in Error Tracking. To investigate alerts and monitors during on-call, see [Bits Investigation for on-call operations][2].

<!-- TODO: add screenshot. {{< img src="error_tracking/bits_investigation/overview.png" alt="A Bits Investigation result in the Error Tracking issue side panel" style="width:100%;" >}} -->

## How it works

You start an investigation from the issue side panel. Bits Investigation then:

1. Reads the issue, including the stack trace, error attributes, and related telemetry (logs, traces, and RUM events).
2. Reads the relevant source code when [Source Code Integration](#connect-your-source-code) is set up.
3. Forms a hypothesis about the root cause and checks it against the available data.
4. Returns a result: the root cause, an impact assessment, suspect commits, and a recommended next step.

From the result, you decide what to do next: generate a code fix with Bits Code, copy the context into your own AI assistant, create a ticket, or resolve or ignore the issue.

When source code is not connected, the investigation still runs but works from error patterns and telemetry only, so the result has less detail. The side panel marks these results so you know the investigation ran with reduced context.

## Prerequisites and setup

Setup happens at three levels: your organization, each service, and your individual account.

### Enable Bits in your organization

Bits Investigation requires Bits to be enabled and AI providers to be allowed for your organization.

- If Bits is not enabled, turn it on from the Bits settings page. The settings page has two options: enabling Bits and enabling AI code fixes.
- If AI providers are blocked, Datadog AI features are unavailable for your organization. Contact your account admin or Datadog support to enable them.

### Connect your source code

Source Code Integration lets Bits Investigation read the code that was running when the error occurred. This improves accuracy and is required for suspect commits and code fixes. Connect a supported Git provider (GitHub or GitLab) and make sure your telemetry carries Git metadata.

The setup depends on the platform:

| Platform        | What to configure                                              |
|-----------------|----------------------------------------------------------------|
| Backend service | Set Git information in your deployment configuration.          |
| Browser / RUM   | Upload source maps with Git metadata.                          |
| Mobile          | Upload debug symbols with Git metadata.                        |

For the full steps, see [Source Code Integration][3].

### Connect your GitHub account

Creating a pull request from a code fix requires connecting your individual GitHub account. You can run investigations and read results without it.

## Run an investigation

Investigations run on demand.

1. Open an issue in Error Tracking.
2. In the issue side panel, click **Investigate**.
3. Wait for the investigation to finish. The result appears in the side panel.

## Investigation results

A result includes:

- **Root cause**: the most likely reason the error occurs, with the evidence used to reach it.
- **Impact**: how many users, sessions, and accounts the issue affects.
- **Suspect commits**: the commits most likely to have introduced the error, when source code is connected.
- **Next step**: the recommended way to resolve the issue.

If the investigation ran without source code, the result shows a reduced-context indicator and a link to set up Source Code Integration.

## Resolve the issue

From the result, you can:

- **Fix with Bits Code**: when the issue is fixable through a code change, hand off to [Bits Code][1] to generate a fix and open a pull request. This option appears when Bits Investigation determines the issue is fixable in code.
- **Copy as Markdown**: copy the issue context for your AI assistant, then paste it into the agent of your choice.
- **Create a ticket**: open a ticket in [Jira, Linear, or Case Management][4].
- **Resolve or ignore**: change the [issue state][5] directly from the panel.

## Find issues with investigations

Use the **with investigation** filter in the Error Tracking Explorer to find issues that already have a result. Issues with an investigation show an icon on their Explorer card.

## Availability

Bits Investigation in Error Tracking is in trial. While the trial is active, the product shows a trial badge.

## Permissions

Access to Bits Investigation follows your Bits AI permissions. Reading investigations and triggering them are controlled by your read and write access. <!-- TODO: confirm the exact role/permission name to cite publicly. -->

Creating a pull request from a code fix also requires connecting your individual GitHub account, as described in [Connect your GitHub account](#connect-your-github-account).

## Limitations

- iOS error investigations are currently limited to error patterns and telemetry, because stack symbolication is not yet available. <!-- TODO: confirm current iOS status before publishing. -->
- Bits Investigation works within a single repository. It does not investigate across multiple repositories.
- Bits Investigation uses AI and can make mistakes. Review and test any generated code before you merge it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_ai_dev_agent/
[2]: /bits_ai/bits_ai_sre/
[3]: /integrations/guide/source-code-integration/
[4]: /error_tracking/ticketing_systems/
[5]: /error_tracking/issue_states/
