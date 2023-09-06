---
title: Bits AI
kind: documentation
disable_toc: false
private: true
is_beta: true
further_reading:
    - link: "https://www.datadoghq.com/product/platform/bits-ai/"
      tag: "Product page"
      text: "Bits AI"
    - link: "https://www.datadoghq.com/blog/datadog-bits-generative-ai/"
      tag: "Blog post"
      text: "Introducing Bits AI, Your New DevOps Copilot"
    - link: "https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-bits-an-ai-assistant-to-help-engineers-quickly-resolve-application-issues/"
      tag: "Press release"
      text: "Bits AI announcement"
---

<div class="alert alert-info">Bits AI is in private beta.</div>

Bits AI is a generative AI interface that helps you investigate and remediate issues with your applications and infrastructure. It surfaces faulty deployments, Watchdog anomalies, incidents, alerts, and more.

## Features

### Query data in natural language

Bits AI supports natural language querying for logs, APM traces, and infrastructure data. It will also expand on issues with upstream and downstream dependencies.

In Datadog or in Slack, you can ask Bits AI questions in natural language, such as
- What is going on with example-service?
- Are there any issues with example-service's dependencies?
- Who is on call for example-service?
- Find me the example-service dashboard.

For details, see [Getting Started](#getting-started) and [Query Examples][3].

### Streamline incident management

As part of the [Datadog Incident Management][2] product, generative AI can help you 

- **Stay informed:** Ask Datadog to send you an update on the incident in 15 minutes.
- **Explore incidents:** Query incident details, such as "Give me a few bullet points on incident 2781."
- **Triage incidents:** Update the severity level and status of an incident.
- **Generate a postmortem:** Quickly create a first draft to review and revise.

For details, see [Managing Incidents][4].

### Run workflows in Slack

If you have Datadog Workflows configured, you can trigger them from Slack. For example, sending `@Datadog Give me a workflow to block IPs in Cloudflare` initiates a conversation in which the chatbot will confirm the desired workflow and ask for any required parameters.

[SCREENSHOT OF SLACK WORKFLOWS]

## Getting started

### In the app

Bits AI can be accessed from its dedicated chat panel and from the search bars of some products.

#### Querying in the chat panel

To open the chat panel, click on **Ask Bits AI** at the bottom of the navigation bar, or use **Cmd + /** to show or hide the chat panel.

[SCREENSHOT OF NAV]

[SCREENSHOT OF CHAT PANEL]

Some responses from Bits AI include a suggestions button. Clicking it displays additional queries that apply to the conversation's context.

#### Querying in a search bar

Some Datadog search bars support natural language querying. Where available, the feature can be accessed by typing a space into the search bar, then choosing from the suggested queries or typing a new query.

[SEARCH BAR WITH PROMPT TO TYPE A SPACE]

[LOGS SEARCH BAR AFTER TYPING A SPACE]

### In Slack

1. [Connect your Datadog account to your Slack workspace][1].
1. Use the `/dd connect` command to display a list of accounts to connect to.
   [SCREENSHOT OF MODAL]
1. Choose **Traveloka Dev** in the dropdown.
1. Authorize additional permissions needed by Bits AI. [LINK?]
1. 

After setup is completed, you can send queries to `@Datadog` in natural language: `@Datadog Are there any issues with example-service's dependencies?`

## Feedback

Bits AI is in active development, and your feedback is valuable. To report issues, request features, or 

[1]: /integrations/slack/?tab=applicationforslack
[2]: https://www.datadoghq.com/product/incident-management/
[3]: /bits_ai/query_examples/
[4]: /bits_ai/managing_incidents/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}