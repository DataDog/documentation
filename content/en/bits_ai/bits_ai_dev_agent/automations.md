---
title: Automations
disable_toc: false
description: Learn how to create automated Bits AI Dev Agent code sessions.
further_reading:
- link: "/TODO/bits-ai-dev-agent/"
  tag: "Documentation"
  text: "Bits AI Dev Agent"
---

## Overview

Automations let you configure Bits AI Dev Agent to start [code sessions][1] automatically based on a trigger you define. When a trigger fires, Bits Dev runs a [code session][1] and produces an output you choose, such as opening a pull request or sending a Slack notification.

[TODO: insert screenshot or video]

Use Automations to:

- Generate code fixes on a schedule, without starting each session manually.
- Have Bits Dev respond to signals from other Datadog products, such as a new APM Recommendation, a flaky test, or a Code Security finding.
- Route the resulting code changes directly to a pull request or notify a team in Slack.

<!-- TODO: Confirm the official customer-facing name ("Automations" vs. "Bits Dev Automations") and add a one-line value statement approved by the PM. -->

## Prerequisites

To set up a Bits AI Dev Agent automation, each of the following must be true:

- You have the [TODO: ?] permission in Datadog.
- You have completed Bits AI Dev Agent [setup][4].

[TODO: the setup page only mentions the GitHub integration. should we mention a 
Slack integration if you want ot use the Slack message output?]

## Create an automation

You can create an automation with a pre-existing template, or create your own custom automation.

By default, new automations have an **Active** status, and appear in the **My Automations** list.

### Create a custom automation

1. In Datadog, navigate to **Bits AI** > **Dev Agent** > [**Automations**][5].
1. Click **New Automation**.
1. Enter a **Name** for the automation.
1. Configure a [trigger][2].
1. Configure one or more [outputs][3].
1. Click **Create Automation** or **Save & run now**.

<!-- TODO: Confirm whether "Auto model" shown under the Name field is configurable, and document it if so. -->

### Create an automation from a template

The **Automations** page includes prebuilt templates under **Popular Automations**:

- **Create PRs based on APM Recommendations**: Generates and sends pull requests based on APM Recommendations for a specific service.
- **Fix frequent errors for a repo**: Uses the **Custom Prompt** trigger to instruct the Dev Agent to scan the last 24 hours of logs, find the most frequent error, and open a pull request with a fix.


## Triggers

A trigger defines when an automation runs and what the Dev Agent acts on. A trigger is built from up to three components: a schedule, product source, and/or custom prompt.

Click **Add trigger** to add a component. You can combine a schedule with a product source, a schedule with a custom prompt, or use a product source on its own.

### Schedule
A **schedule** controls when the automation runs. You can choose from:
  - **Every…**: Choose a preset interval (for example, `Every day at 09:00 am`).
  - **Custom schedule**: Choose specific days of the week and a time of day (for example, `Mo, We, Fr at 09:00 am`).

### Product source
A **product source** runs the automation in response to new findings in another Datadog product (for example, Error Tracking or Code Security). 

When a trigger uses a product source with a schedule, also set the lookback window with the **New findings within** field.

You can configure additional filters, which vary by product. For example:
  - **APM Recommendations** supports filtering by **Service**, **Env**, **Team**, **Priority**, and **New findings within** (time window).
  - **Flaky Tests** supports filtering by **Repository**, **Branch** (defaults to the repository's default branch), and **Status**.
  - **Code Security (SAST)** supports filtering by **Repository**, **Severity**, **Rule to remediate**, and a toggle to **Filter out findings identified as false positives by Bits AI**.

#### Run limits

When a trigger uses a product source without a schedule, it includes a **Limit** field that caps how many times the automation can run in a given period (for example, `5 runs per Week`). Use this to control the volume of pull requests or notifications an automation produces.

<!-- TODO: Confirm the supported periods (Day, Week, Month?) and what happens when the limit is reached — does the automation pause, queue findings, or skip them? -->

### Custom prompt
A **custom prompt** tells Bits Dev what to do each time the automation runs, in free-form text, against a chosen repository. This option is only available after you add a schedule to the trigger. Use a custom prompt for recurring maintenance tasks that aren't tied to a specific Datadog signal, such as updating dependencies or refreshing documentation.

## Outputs

An output defines what Bits Dev does after a [code session][1] completes. An automation can have one or more outputs.

### Pull request

- **Open PR**: Opens a pull request with the generated changes.
- **Create draft PR**: Opens the pull request as a draft.

<!-- TODO: Document where the PR is opened (the repo selected in the trigger? a different target?), the PR title/body format, and reviewer assignment behavior. -->

### Notification

- **Send Slack message**: Sends a Slack message about the [code session][1].

When you add a Slack output, you can select a **Workspace** and a **Channel** as a fallback. By default, the Dev Agent sends the message to the channel configured for the affected service in Service Catalog; the fallback channel is used when no Service Catalog channel is set.

<!-- TODO: Confirm the Service Catalog field that controls the default channel, and the exact contents of the Slack message. -->

## Manage automations

View the automations you have created on the **My Automations** tab. Switch to **All** to see automations created by anyone in your organization.

You can pause an automation.

<!-- TODO: Document how to pause, resume, edit, and delete an automation (the three-dot menu in the row). Document permissions: who can edit or delete an automation owned by another user. -->


## Limitations

<!-- TODO: Document known limitations. Candidates to confirm with the PM:
- Maximum number of automations per organization or per user.
- Trigger types or filters that are in preview.
- Supported source control providers (GitHub only? GitLab? Bitbucket?).
- Supported languages or frameworks for code generation. -->

Bits AI Dev Agent automations has the following limitations:
- [TODO confirm, this is my assumption] It is not possible to define automations in code—only in the Datadog application.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_ai_dev_agent/#code-sessions
[2]: #triggers
[3]: #outputs
[4]: /bits_ai/bits_ai_dev_agent/setup/
[5]: https://app.datadoghq.com/code/automations

