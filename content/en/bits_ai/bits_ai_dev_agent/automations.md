---
title: Automations
disable_toc: false
description: Create Bits Code automations that run sessions on a schedule or in response to Datadog signals.
further_reading:
- link: "/bits_ai/bits_ai_dev_agent/"
  tag: "Documentation"
  text: "Bits Code"
---

## Overview
Create an automation to have Bits Code start a [session][1] when a trigger fires, such as a new Code Security finding or a recurring schedule, then deliver the results as a pull request or Slack notification.

{{< img src="bits_ai/dev_agent/automations/list.png" alt="Under an 'Automate with Bits' title, a table with columns like Name, Author, and Last Run has four rows." style="width:100%;" >}}

With Bits Code automations, you can:

- Generate code fixes on a schedule, without starting each session manually
- Have Bits Code respond to signals from other Datadog products, such as a new APM Recommendation, a flaky test, or a Code Security finding
- Route the resulting code changes directly to a pull request or notify a team in Slack

## Prerequisites
To set up a Bits Code automation, each of the following must be true:
- You have the **Bits Code Write** (`bits_dev_write`) permission in Datadog.
- You have completed the Bits Code [setup][2].
- If you plan to have your automations [output Slack notifications](#slack-message-output), you have set up the [Slack integration][4].

## Create an automation
You can [create a custom automation](#create-a-custom-automation), or [use a Datadog-provided automation template](#create-an-automation-from-a-template).

{{< img src="bits_ai/dev_agent/automations/custom_prompt_creation_form.png" alt="Under an 'Automate with Bits' title, a form with fields like 'Custom Prompt' and 'Every week on' is shown." style="width:100%;" >}}

By default, newly created automations have an **Active** status, and appear in the **My Automations** list.

### Create a custom automation
To create a custom Bits Code automation:
1. In Datadog, navigate to **Bits AI** > **Bits Code** > [**Automations**][3].
1. Click **New Automation**.
1. In the **Automation name** field, enter a descriptive name for the automation.
1. In the **Trigger** section, configure a [trigger](#triggers).
1. In the **Output** section, configure one or more [outputs](#outputs).
1. Click **Create Automation** or **Create & run now**.

### Create an automation from a template
Find Datadog-provided automation templates in the **Automation Templates** section. These may include:

- **Create PRs based on APM Recommendations**: Generates pull requests based on APM Recommendations for a specific service.
- **Fix frequent errors for a repo**: Uses the [**Custom Prompt**](#custom-prompt-trigger) trigger to instruct Bits Code to scan the last 24 hours of logs, find the most frequent error, and open a pull request with a fix.

Click a template tile to be taken to the new automation form. You must configure an [output](#outputs) before creating the automation.

## Triggers
A trigger defines when an automation runs and what Bits Code acts on. A trigger is built from up to three components: 

- [Product finding](#product-finding-trigger)
- [Custom prompt](#custom-prompt-trigger)
- [Schedule](#schedule-trigger)

Click **Add Trigger** to add a component. You can combine a product finding with a schedule, a custom prompt with a schedule, or use a product finding on its own.

To limit how many Bits Code sessions the automation can create in a given period (for example, `5 runs per Week`), click **Add Trigger** > **Set max runs**. One automation execution may produce more than one session. Use this setting to control the volume of pull requests or notifications an automation produces.

### Product finding trigger
A product finding trigger runs the automation in response to new issues in another Datadog product (for example, Error Tracking or Code Security). You can use a product finding trigger by itself, which runs the automation whenever there is a new finding, or with a [schedule](#schedule-trigger) and lookback window you define (in the **New findings within** field).

<div class="alert alert-info">While it's most common to use a product finding trigger alone (so that new findings are immediately remediated), coupling it with a schedule and lookback window may be useful if you'd like Bits Code to monitor for new findings during only certain times. For example, if you deploy weekly on Wednesdays, you may want to configure an APM Recommendations trigger to run every Thursday, looking back 24 hours.</div>

When setting up a product finding trigger, you can configure additional filters, which vary by product. For example:
  - **Flaky Tests** supports filtering by **Repository**, **Branch** (defaults to the repository's default branch), and **Status**.
  - **Code Security (SAST)** supports filtering by **Repository**, **Severity**, **Rule to remediate**, and a toggle to **Filter out findings identified as false positives by Bits AI**.

### Custom prompt trigger
A custom prompt tells Bits Code what to do each time the automation runs, in free-form text, against a chosen repository. Use a custom prompt for recurring maintenance tasks that aren't tied to a specific Datadog signal, such as updating dependencies or refreshing documentation.

### Schedule trigger
A schedule trigger controls when an automation runs. It can be used in combination with a [product finding](#product-finding-trigger) or a [custom prompt](#custom-prompt-trigger). When setting a schedule, you can choose from:
  - **Every…**: Choose a preset interval (for example, `Every day at 09:00 am`).
  - **Custom Schedule**: Choose specific days of the week and a time of day (for example, `Mo, We, Fr at 03:00 pm`).

## Outputs
An output defines what Bits Code does after a [session][1] completes. An automation can have one or more outputs, including [opening a pull request](#pull-request-output) and [generating a Slack notification](#slack-message-output).

To add an output, click **Add Output**. 

### Pull request output
You can configure your automation to:
- **Create a PR**: Opens a pull request with the proposed changes
- **Draft a PR**: Opens a draft pull request with the proposed changes

As the author of a Bits Code automation, you are the author of all pull requests it generates.

### Slack message output
You can configure your automation to **Send Slack message**, which sends a Slack message summarizing the [session][1] and code changes. If you use a pull request output in addition to a Slack output, Bits Code includes a link to the pull request in the Slack message.

When you add a Slack message output, by default, Bits Code sends the message to the channel configured for the affected service in [Catalog][5]. You can set a fallback Slack channel, which is used when no channel is set in Catalog.

## Manage automations
On [**Automations**][3], view the automations you created on the **My Automations** tab. Switch to **All** to see automations created by anyone in your organization.

You can pause or resume any automation, but you can only edit or delete automations you created.

## Limitations
Bits Code automations has the following limitation:
- When using a [product finding trigger](#product-finding-trigger), each finding that triggers an automation is tied to a single session. Multiple findings cannot be fixed in a single session or pull request.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_ai_dev_agent/#sessions
[2]: /bits_ai/bits_ai_dev_agent/setup/
[3]: https://app.datadoghq.com/code/automations
[4]: /integrations/slack/
[5]: /internal_developer_portal/catalog/
