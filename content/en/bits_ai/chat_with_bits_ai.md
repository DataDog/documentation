---
title: Chat with Bits AI
description: "Chat with Bits AI in Datadog and Slack to query observability data using natural language and get insights about your services."
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

{{< callout url="#" btn_hidden="true" >}}
Chat with Bits AI is in preview. Please reach out to your account manager if you have questions.
{{< /callout >}}


## Chat in Datadog

Bits AI supports natural language querying for logs, APM traces, infrastructure data, cloud cost, and RUM. You can also ask Bits AI about the health and ownership of your services, and retrieve Datadog resources related to those services.

You can ask Bits AI questions such as:
- `Who is on call for example-service?`
- `Find me the example-service dashboard.`
- `What is going on with example-service?`
- `Are there any issues with example-service's dependencies?`

When relevant to your query, Bits AI surfaces faulty deployments, Watchdog anomalies, incidents, alerts, and more. It also expands on issues with upstream and downstream dependencies. This feature works best if your APM services are tagged by **team** and **service**.

### In the chat panel

To open the chat panel in the app, click **Bits AI** at the bottom-left corner of the navigation menu, or use `Cmd + /` to show or hide the chat panel.

Some responses from Bits AI include a **suggestions** button. Clicking it displays additional queries that apply to the conversation's context.

{{< img src="bits_ai/getting_started/chat_panel_star_service.png" alt="Bits AI chat panel with example question of 'How do I star a service' and Bits AI's answer" style="width:90%;">}}

### On the mobile app

{{< img src="bits_ai/getting_started/bitsai_mobile_app.PNG" alt="View of the Mobile App Home dashboard with Bits AI" style="width:40%;" >}}

Click Bits AI on the mobile app to access the same querying features available on the browser.

## Querying in Slack

1. [Connect your Datadog account to your Slack workspace][1].
1. In Slack, use the `/dd connect` command to display a list of accounts to connect to.
1. Choose the name of your Datadog account in the dropdown.
1. Authorize additional permissions needed by Bits AI.

After setup is completed, you can send queries to `@Datadog` in natural language: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Output of an example service-dependency query in Slack" style="width:60%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/slack/?tab=applicationforslack
