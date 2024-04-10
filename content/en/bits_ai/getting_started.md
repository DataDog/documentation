---
title: Getting Started
kind: guide
further_reading:
- link: "bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "bits_ai/query_examples"
  tag: "Documentation"
  text: "Example Natural Language Queries"
- link: "bits_ai/managing_incidents/"
  tag: "Documentation"
  text: "Managing Incidents"
---

## Querying in Datadog

### In the chat panel

To open the chat panel in the app, click **Bits AI** at the bottom-left corner of the navigation menu, or use `Cmd + /` to show or hide the chat panel.

Some responses from Bits AI include a **suggestions** button. Clicking it displays additional queries that apply to the conversation's context.

{{< img src="bits_ai/getting_started/chat_panel_star_service.png" alt="Bits AI chat panel with example question of 'How do I star a service' and Bits AI's answer" style="width:90%;">}}

### In a search bar

Some Datadog search bars support natural language querying. 

{{< img src="bits_ai/getting_started/ai-enabled-search-bar.png" alt="Search bar with natural language querying enabled" style="width:90%;">}}

Where available, the feature can be accessed by typing a space into the search bar, then choosing from the suggested queries or typing a new query.

{{< img src="bits_ai/getting_started/search-bar-with-ai-suggestions.png" alt="Search bar displaying suggested natural language queries" style="width:90%;">}}

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
