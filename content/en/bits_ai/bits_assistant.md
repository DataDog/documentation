---
title: Bits Assistant
description: "Use Bits Assistant in Datadog to explore and act on your observability data using natural language."
further_reading:
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "/incident_response/incident_management/investigate/incident_ai"
  tag: "Documentation"
  text: "Coordinate incidents with Incident AI"
aliases:
- /bits_ai/getting_started/
- /bits_ai/chat_with_bits_ai
---

{{< callout url="#" btn_hidden="true" header="Bits Assistant is in Preview" >}}
Fill out the [Preview form](https://www.datadoghq.com/product-preview/bits-assistant/) to get access to Bits Assistant.
{{< /callout >}}


## Overview

Bits Assistant is an AI-powered companion that helps you search and act across your Datadog environment using natural language. Bits Assistant is available across the web application, mobile app, and Slack.

Ask Bits Assistant questions like:
- `Summarize high severity incidents that have occurred in the last day`
- `Which services have the most errors right now`
- `Show me what changed in alerts for the checkout service in the last 24 hours.`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `How do I configure log collection for the Datadog Agent?`
- `Do we already have monitors for high latency on the payments service?`
- `Summarize the key findings from Kubernetes overview dashboard.`

### Permissions

To use Bits Assistant, make sure the **Bits Assistant Access** permission is enabled.

Bits Assistant uses your Datadog role to fetch data, so it can only access the resources you have permission to view or modify. For example, if you do not have permission to edit a dashboard, Bits Assistant cannot edit that dashboard on your behalf.

### Skills

Bits Assistant also includes skills that help with specialized tasks.

**Dashboards**

Build dashboards and widgets from natural language descriptions.

Example prompts:
- `Show me a dashboard of high-impact alerts from the past week and which services they affected`
- `Add a widget about CPU usage in the payments service`

**Notebooks**

Create investigation notebooks and enhance existing ones with summaries and analysis.

Example prompts:
- `Create an investigation for the recent spike of errors in the checkout service`
- `Add an executive summary for this cost spike report`

**Cloud Cost Management**

Investigate cost changes and identify the teams or resources responsible.

Example prompts:
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

### Web Application

To open Bits Assistant, click **Ask Bits** in the top-right of the navigation bar, use <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>, or click **Bits AI** in the left-side navigation panel.

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="Bits Assistant side panel showing example prompts" style="width:40%;">}}

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Full-page Bits Assistant interface showing conversation history and prompt suggestions" style="width:100%;">}}

### Mobile Application

{{< img src="bits_ai/getting_started/bitsai_mobile_app.PNG" alt="View of the Mobile App Home dashboard with Bits AI" style="width:40%;" >}}

### Slack

1. [Connect your Datadog account to your Slack workspace][1].
1. In Slack, use the `/dd connect` command to display a list of accounts to connect to.
1. Choose the name of your Datadog account in the dropdown.
1. Authorize additional permissions needed by Bits AI.

After setup is completed, you can send queries to `@Datadog` in natural language: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Output of an example service-dependency query in Slack" style="width:60%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/slack/?tab=applicationforslack
