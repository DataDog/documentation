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

{{< callout url="#" btn_hidden="true" >}}
Bits Assistant is in preview. Reach out to your account manager if you have questions.
{{< /callout >}}


## Bits Assistant in Datadog

Bits Assistant brings conversational AI to Datadog, enabling you to explore and act on your observability data using natural language. Query logs, metrics, traces, dashboards, monitors, infrastructure, and more—all from a single intelligent interface.

You can ask Bits Assistant questions such as:
- `Who is on call for example-service?`
- `Find me the example-service dashboard.`
- `What is going on with example-service?`
- `Are there any issues with example-service's dependencies?`

When relevant to your query, Bits Assistant surfaces faulty deployments, Watchdog anomalies, incidents, alerts, and more. It also expands on issues with upstream and downstream dependencies. This feature works best if your APM services are tagged by **team** and **service**.

### Web Application

The **Bits Assistant Access** permission is required to use this feature.

To open Bits Assistant, click **Ask Bits** in the top-right of the navigation bar, click **Bits AI** in the left-side navigation panel, or use <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.

Some responses from Bits Assistant include a **suggestions** button. Clicking it displays additional queries that apply to the conversation's context.

{{< img src="bits_ai/getting_started/bits_assistant_panel.png" alt="Bits Assistant side panel showing example prompts including 'What can you do?', 'Summarize any current high-severity incidents', and 'Look up documentation related to the current page'" style="width:40%;">}}

### Mobile Application

{{< img src="bits_ai/getting_started/bitsai_mobile_app.PNG" alt="View of the Mobile App Home dashboard with Bits AI" style="width:40%;" >}}

## Bits Assistant in Slack

1. [Connect your Datadog account to your Slack workspace][1].
1. In Slack, use the `/dd connect` command to display a list of accounts to connect to.
1. Choose the name of your Datadog account in the dropdown.
1. Authorize additional permissions needed by Bits AI.

After setup is completed, you can send queries to `@Datadog` in natural language: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Output of an example service-dependency query in Slack" style="width:60%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/slack/?tab=applicationforslack
