---
title: Getting Started
kind: guide
disable_toc: false
private: true
is_beta: true
---

## Querying in Datadog

### In the chat panel

To open the chat panel, click on **Ask Bits AI** at the bottom of the navigation bar, or use **Cmd + /** to show or hide the chat panel.

{{< img src="bits_ai/bits-ai-nav.png" alt="Bits AI link in the side nav of the Datadog app" style="width:30%;">}}

Some responses from Bits AI include a **suggestions** button. Clicking it displays additional queries that apply to the conversation's context.

{{< img src="bits_ai/chat-panel.png" alt="Bits AI chat panel" style="width:90%;">}}

### In a search bar

Some Datadog search bars support natural language querying. 

{{< img src="bits_ai/ai-enabled-search-bar.png" alt="Search bar with natural language querying enabled" style="width:90%;">}}

Where available, the feature can be accessed by typing a space into the search bar, then choosing from the suggested queries or typing a new query.

{{< img src="bits_ai/search-bar-with-ai-suggestions.png" alt="Search bar displaying suggested natural language queries" style="width:90%;">}}

### On the mobile app
<!-- insert image -->

## Querying in Slack

1. [Connect your Datadog account to your Slack workspace][1].
1. Use the `/dd connect` command to display a list of accounts to connect to.
1. Choose the name of your Datadog account in the dropdown.
1. Authorize additional permissions needed by Bits AI.

After setup is completed, you can send queries to `@Datadog` in natural language: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/example-slack-query.png" alt="Output of an example service-dependency query in Slack" style="width:60%;">}}

{{< whatsnext desc="Additional Bits AI documentation:">}}
    {{< nextlink href="bits_ai/" >}}Feature Overview{{< /nextlink >}}
    {{< nextlink href="bits_ai/query_examples" >}}Example Natural Language Queries{{< /nextlink >}}
    {{< nextlink href="bits_ai/managing_incidents/" >}}Managing Incidents{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /integrations/slack/?tab=applicationforslack
