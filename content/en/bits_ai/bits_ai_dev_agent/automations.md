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

[TODO: confirm whether needs Preview callout]

Automations let you configure Bits AI Dev Agent to start [code sessions][1] automatically based on a trigger you define. When a trigger fires, Bits Dev runs a code session and produces an output you choose, such as opening a pull request or sending a Slack notification.

[TODO: insert screenshot or video]

With Dev Agent automations, you can:

- Generate code fixes on a schedule, without starting each session manually.
- Have Bits AI Dev Agent respond to signals from other Datadog products, such as a new APM Recommendation, a flaky test, or a Code Security finding.
- Route the resulting code changes directly to a pull request or notify a team in Slack.

## Prerequisites

To set up a Bits AI Dev Agent automation, each of the following must be true:

- You have the [TODO: ?] permission in Datadog.
- You have completed Bits AI Dev Agent [setup][4].
- [TODO: confirm this, CR assumed] If you plan to have your automations [output Slack notifications][7], you have set up the [Slack integration][6].

## Create an automation

You can create a custom automation, or use a pre-existing automation template.

By default, new automations have an **Active** status, and appear in the **My Automations** list.

### Create a custom automation

1. In Datadog, navigate to **Bits AI** > **Dev Agent** > [**Automations**][5].
1. Click **New Automation**.
1. Enter a **Name** for the automation.
1. Configure a [trigger][2].
1. Configure one or more [outputs][3].
1. Click **Create Automation** or **Create & run now**.

### Create an automation from a template

The **Automations** page includes prebuilt templates under **Popular Automations**:

- **Create PRs based on APM Recommendations**: Generates and sends pull requests based on APM Recommendations for a specific service.
- **Fix frequent errors for a repo**: Uses the **Custom Prompt** trigger to instruct the Dev Agent to scan the last 24 hours of logs, find the most frequent error, and open a pull request with a fix.


## Triggers

A trigger defines when an automation runs and what the Dev Agent acts on. A trigger is built from up to three components: 

- [Product source][8]
- [Custom prompt][9]
- [Schedule][10]

Click **Add Trigger** to add a component. You can combine a product source with a schedule, a custom prompt with a schedule, or use a product source on its own.

### Product source
A product source runs the automation in response to new findings in another Datadog product (for example, Error Tracking or Code Security). You can use the product source by itself (which will run the automation whenever a new finding occurs) or with a [schedule][10] and lookback window you define.

When setting up a product source trigger, you'll configure additional filters, which vary by product. For example:
  - **Flaky Tests** supports filtering by **Repository**, **Branch** (defaults to the repository's default branch), and **Status**.
  - **Code Security (SAST)** supports filtering by **Repository**, **Severity**, **Rule to remediate**, and a toggle to **Filter out findings identified as false positives by Bits AI**.

#### Run limits

[TODO: confirm when max runs field appears]

When a trigger uses a product source without a schedule, it includes a **Limit** field that caps how many times the automation can run in a given period (for example, `5 runs per Week`). Use this to control the volume of pull requests or notifications an automation produces.

[TODO Q: once the limit is reached, does the status flip to paused? then un-flip back?]

### Custom prompt
A custom prompt tells Bits Dev what to do each time the automation runs, in free-form text, against a chosen repository. This option is only available after you add a schedule to the trigger. [TODO: confirm < that's < still true.] Use a custom prompt for recurring maintenance tasks that aren't tied to a specific Datadog signal, such as updating dependencies or refreshing documentation.

[TODO: add example of a good/interesting prompt]

### Schedule
A schedule controls when an automation runs. It can be used in combination with a [product source][8] or a [custom prompt][9]. When setting a schedule, you can choose from:
  - **Every…**: Choose a preset interval (for example, `Every day at 09:00 am`).
  - **Custom schedule**: Choose specific days of the week and a time of day (for example, `Mo, We, Fr at 09:00 am`).

  [TODO Q: when does the lookback window field populate alongside schedule? only with a product source?]

## Outputs

An output defines what the Dev Agent does after a [code session][1] completes. An automation can have one or more outputs.

To add an output, click **Add Output**. 

### Pull request

- **Open PR**: Opens a pull request with the generated changes.
- **Draft a PR**: Opens a draft pull with the generated changes.

<!-- TODO: Document where the PR is opened (the repo selected in the trigger? a different target?), the PR title/body format, and reviewer assignment behavior. -->

### Slack message

- **Send Slack message**: Sends a Slack message about the [code session][1].

When you add a Slack output, you can select a **Workspace** and a **Channel** as a fallback. By default, the Dev Agent sends the message to the channel configured for the affected service in Service Catalog; the fallback channel is used when no Service Catalog channel is set.

<!-- TODO: Confirm the Service Catalog field that controls the default channel, and the exact contents of the Slack message. -->
[TODO Qs: if you select both PR and Slack, will the Slack message have a link to the PR? anything else to call out about the contents of the Slack message?]

## Manage automations

View the automations you created on the **My Automations** tab. Switch to **All** to see automations created by anyone in your organization.

You can pause or resume any automation. You can edit or delete automations you created.


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
[6]: /integrations/slack/
[7]: #slack-message
[8]: #product-source 
[9]: #custom-prompt
[10]: #schedule
