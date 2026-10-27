---
title: Agentic Tracking Plans
description: Use Bits AI to build a tracking plan from your product questions, instrument missing events, and generate a dashboard that answers those questions.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Learn about Product Analytics"
- link: "/bits_ai/bits_code/"
  tag: "Documentation"
  text: "Learn about Bits Code"
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
---

{{< callout btn_hidden="true" header="Join the Preview!">}}
Agentic Tracking Plans is in Preview.
{{< /callout >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Agentic Tracking Plans is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Agentic Tracking Plans helps you plan, instrument, and measure tracking for a feature. You provide a product brief and the questions you want to answer about the feature. Bits AI then:

1. Builds a tracking plan that lists the events and properties needed to answer each question and shows which ones already exist.
2. Helps you instrument the missing events through a Bits Code pull request, a Jira ticket, or a prompt for your own coding agent.
3. Creates a dashboard with charts that map to your questions.

Each event and property in the plan includes a description, so your team knows what it measures.

<div class="alert alert-info">Agentic Tracking Plans consumes <a href="/account_management/billing/ai_credits/">AI Credits</a>.</div>

## Use cases

Setting up tracking is often slow for both product managers and engineers. Product managers can't see what's already tracked, and engineers get requests without enough context. As a result, features ship without the data to evaluate them. Use Agentic Tracking Plans to:

- **Plan tracking before a launch (recommended)**: Set up tracking before a feature ships so you have complete data from the first day instead of finding gaps after launch.
- **Fill tracking gaps for an existing feature**: When existing data can't answer your questions, or the feature was never tracked, start from your questions. Bits AI identifies the events and properties that are missing.
- **Request tracking without waiting on a ticket**: Product managers can see which events already exist and define new ones without filing a ticket and waiting for engineering time.
- **Give engineers a clear, reviewable request**: Engineers get a specific pull request or ticket that explains which properties matter and why. This cuts down the back-and-forth.

## Key concepts

| Term | Definition |
|---|---|
| Tracking plan | A list of the events and properties needed to measure a feature, along with the questions each one helps answer. A tracking plan belongs to one feature or product area. |
| Question | Something you want to know about a feature, such as `What percentage of users who start checkout complete it?` Questions are the main input to a tracking plan. |
| Event | A user action or view that is recorded, such as a button click or a pageview. |
| Property | Additional detail attached to an event, such as the plan type of the user or the payment method chosen. Properties let you filter and break down your analysis. |

## Prerequisites

- Access to the Agentic Tracking Plans Preview
- Product Analytics enabled, with the RUM SDK instrumented in your application
- AI products enabled for your organization in [**Plan & Usage > AI Credits**][1]
- The **Bits Chat Access** permission
- (Optional) A [source code integration][2] for the repository that contains your RUM instrumentation. Bits AI uses it to find existing events.
- (Optional) The **Bits Code Write** permission, required only to instrument with Bits Code

## Create a tracking plan

### Start a new tracking plan

1. In Datadog, go to **Product Analytics > Data > Tracking Plans**.
2. Click **New Tracking Plan** and enter a name.

### Provide context about your feature

Paste in your product brief or product requirements document. If you do not have one, write a short description of the feature. Bits AI uses this context to understand what you are building and to suggest what to track. A one-line description produces generic suggestions, so include as much of the following as you can:

- Product goals and success criteria
- Product requirements
- Key user flows or funnels for the feature
- User stories
- The URL of the page that contains the feature, if there is one

Next, link the repository that contains your RUM instrumentation. With access to your source code, Bits AI can find the relevant code, see which events already exist, and reuse them instead of proposing duplicates.

### Add your questions

Bits AI proposes a starting list of questions based on your context. Treat this list as a starting point. Add, edit, or remove questions until the list covers everything you want to learn.

Good questions are specific and tied to a decision. For example:

- `What percentage of users who open the invite dialog send an invite?`
- `Which invite method do people use most often, email or link?`
- `Which plan types complete setup most often?`

Generating the first list of questions can take a few minutes, because Bits AI reads your codebase to understand the feature and check which data is already tracked. To find questions you may have missed, ask Bits AI in chat.

### Generate and review the tracking plan

Bits AI turns your questions into a tracking plan: the events and properties required to answer them. The table shows which items already exist and which still need to be added. Each item links back to the questions it supports.

Review the plan before you instrument anything:

- Check that each event and property is needed to answer a question. Remove any you do not need.
- Check that no proposed property collects personal data or other data you should not collect.
- Edit names, descriptions, and properties directly in the table, or ask Bits AI in chat to make changes. You can keep using chat after the plan is generated to ask questions and fix problems.

### Save and instrument

Click **Save** to store your latest edits. Then choose how to add the missing events and properties.

**Note**: If your team has policies about AI-authored code changes, agree with your engineers on how Bits Code pull requests are reviewed before you choose **Instrument with Bits Code**.

| Option | What happens | Best when |
|---|---|---|
| **Instrument with Bits Code** | Bits Code writes the instrumentation in your repository and opens a pull request for your team to review. It does not merge anything. | You have Bits Code enabled and your team is comfortable reviewing AI-authored pull requests. |
| **Share with engineering** | Share the link to the tracking plan, or create a Jira ticket that carries all of the context, so an engineer can pick it up. | You want engineers to own the implementation, or you do not have Bits Code. |
| **Copy the instrumentation prompt** | Copy a ready-made prompt into your own coding agent or IDE assistant. | Your team already uses a coding agent, or you cannot grant Datadog write access to your repository. |

### Review, merge, and verify

1. Your engineers review the pull request, request changes if needed, and merge and deploy it.
2. After the code is live and users trigger the events, Product Analytics detects them. Check the latest status in the tracking plan to verify that Product Analytics receives the events.
3. If the status does not update after you expect data, see [Troubleshooting Product Analytics][3].

### Create a dashboard

1. On the tracking plan page, click **New Dashboard**. Bits AI creates a dashboard with charts that answer the questions in your plan. You can create the dashboard any time after you save the plan, but charts for events that are not yet instrumented in your code remain empty until the instrumentation is deployed.
2. Review the generated dashboard, and edit or remove any charts that do not match what you wanted to measure.

## Update a tracking plan after you create it

Features change after launch, and you can change the tracking plan with them. Open the tracking plan, then add, edit, or remove questions, events, and properties. To get data for new events, run the instrumentation step again so that only the new items are added.

When you edit a plan that has already been instrumented:

- **Avoid renaming events and properties that are already instrumented**: A renamed item is treated as a new event, and Bits Code adds new instrumentation instead of renaming the existing code. This can split your data across two events and break existing charts. If you need a different name, coordinate the rename with your engineers.
- **Add rather than replace**: When requirements change, add new questions and events and leave existing ones in place.

## Billing

Agentic Tracking Plans uses Bits AI. Generating questions and tracking plans consumes AI Credits through Bits Chat. Instrumenting your code with Bits Code consumes AI Credits through Bits Code. For pricing details, see [AI Credits][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/ai-credits
[2]: /bits_ai/bits_code/setup/
[3]: /product_analytics/troubleshooting/
[4]: /account_management/billing/ai_credits/
