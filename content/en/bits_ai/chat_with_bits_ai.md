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
---

{{< callout url="https://www.datadoghq.com/product-preview/bits-assistant/" btn_hidden="false" header="Bits Assistant is in Preview" >}}
Request access to Bits Assistant.
{{< /callout >}}


## Overview

Bits Assistant is your personal Datadog AI agent that lets you ask, search, and act across Datadog using natural language. To use it, make sure the **Bits Assistant Access** permission is enabled.

Ask Bits Assistant questions like:
- `Who is on call for the payments service?`
- `What monitors are currently triggered for the database cluster?`
- `Summarize any active high-severity incidents.`
- `Are there any upstream or downstream dependency issues affecting the authentication service?`
- `What deployments happened in the last 24 hours and did any cause errors?`

### Skills

Bits Assistant includes specialized skills for specific Datadog products, available across all platforms.

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

To open Bits Assistant, click **Ask Bits** in the top navigation bar, use <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>, or click **Bits AI** in the left-side navigation panel.

{{< img src="bits_ai/getting_started/bits_assistant_panel.png" alt="Bits Assistant side panel with example prompts" style="width:40%;">}}

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
