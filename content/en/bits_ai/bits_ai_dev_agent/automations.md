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

Automations let you configure Bits AI Dev Agent to start [code sessions][1] automatically based on a trigger you define. When a trigger fires, Bits Dev runs one or more code sessions that produce an output you choose, such as opening a pull request or sending a Slack notification.

{{< img src="bits_ai/dev_agent/automations/list.png" alt="Under an 'Automate with Bits' title, a table with columns like Name, Author, and Last Run has four rows." style="width:100%;" >}}

With Dev Agent automations, you can:

- Generate code fixes on a schedule, without starting each session manually
- Have Bits AI Dev Agent respond to signals from other Datadog products, such as a new APM Recommendation, a flaky test, or a Code Security finding
- Route the resulting code changes directly to a pull request or notify a team in Slack

## Prerequisites

To set up a Bits AI Dev Agent automation, each of the following must be true:

- You have the [TODO: ?] permission in Datadog.
- You have completed Bits AI Dev Agent [setup][4].
- [TODO: confirm this, CR assumed] If you plan to have your automations [output Slack notifications][7], you have set up the [Slack integration][6].

## Create an automation

You can create a custom automation, or use a pre-existing automation template.

{{< img src="bits_ai/dev_agent/automations/custom_prompt_creation_form.png" alt="Under an 'Automate with Bits' title, a form with fields like 'Custom Prompt' and 'Every week on' are shown." style="width:100%;" >}}

By default, new automations have an **Active** status, and appear in the **My Automations** list.

### Create a custom automation

1. In Datadog, navigate to **Bits AI** > **Dev Agent** > [**Automations**][5].
1. Click **New Automation**.
1. Enter a **Name** for the automation.
1. Configure a [trigger][2].
1. Configure one or more [outputs][3].
1. Click **Create Automation** or **Create & run now**.

### Create an automation from a template

Find prebuilt templates in the **Automation Templates** section:

- **Create PRs based on APM Recommendations**: Generates and sends pull requests based on APM Recommendations for a specific service.
- **Fix frequent errors for a repo**: Uses the **Custom Prompt** trigger to instruct the Dev Agent to scan the last 24 hours of logs, find the most frequent error, and open a pull request with a fix.

Click a template tile to be taken to the new automation form. You must configure an [output][3] before creating the automation.

## Triggers

A trigger defines when an automation runs and what the Dev Agent acts on. A trigger is built from up to three components: 

- [Product source][8]
- [Custom prompt][9]
- [Schedule][10]

Click **Add Trigger** to add a component. You can combine a product source with a schedule, a custom prompt with a schedule, or use a product source on its own.

You can use the **Set max runs** limit field to cap how many code sessions the automation can create in a given period (for example, `5 runs per Week`). One automation run may produce more than one code session. Use this to control the volume of pull requests or notifications an automation produces.

### Product source
A product source runs the automation in response to new findings in another Datadog product (for example, Error Tracking or Code Security). You can use the product source by itself (which runs the automation whenever a new finding occurs) or with a [schedule][10] and lookback window you define.

When setting up a product source trigger, you'll configure additional filters, which vary by product. For example:
  - **Flaky Tests** supports filtering by **Repository**, **Branch** (defaults to the repository's default branch), and **Status**.
  - **Code Security (SAST)** supports filtering by **Repository**, **Severity**, **Rule to remediate**, and a toggle to **Filter out findings identified as false positives by Bits AI**.

### Custom prompt
A custom prompt tells Bits Dev what to do each time the automation runs, in free-form text, against a chosen repository. Use a custom prompt for recurring maintenance tasks that aren't tied to a specific Datadog signal, such as updating dependencies or refreshing documentation.

### Schedule
A schedule controls when an automation runs. It can be used in combination with a [product source][8] or a [custom prompt][9]. When setting a schedule, you can choose from:
  - **Every…**: Choose a preset interval (for example, `Every day at 09:00 am`).
  - **Custom schedule**: Choose specific days of the week and a time of day (for example, `Mo, We, Fr at 09:00 am`).

## Outputs
An output defines what the Dev Agent does after a [code session][1] completes. An automation can have one or more outputs.

To add an output, click **Add Output**. 

### Pull request
You can configure your automation to:
- **Open PR**: Opens a pull request with the generated changes
- **Draft a PR**: Opens a draft pull with the generated changes

You (the creator of the automation) will be the author of all PRs the automation generates.

### Slack message
You can configure your automation to:
- **Send Slack message**: Sends a Slack message about the [code session][1]

When you add a Slack output, by default, the Dev Agent sends the message to the channel configured for the affected service in [Catalog][11]; the fallback channel is used when no channel is set in Catalog.

## Manage automations

View the automations you created on the **My Automations** tab. Switch to **All** to see automations created by anyone in your organization.

You can pause or resume any automation. You can edit or delete automations you created.

## Limitations

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
[11]: catalog
