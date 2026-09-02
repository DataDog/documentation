---
title: Agent Observability Billing
algolia:
  tags: ['agent observability billing', 'llm observability billing', 'agent observability pricing', 'llm observability pricing', 'llm spans']
further_reading:
- link: "/llm_observability/"
  tag: "Documentation"
  text: "Learn about Agent Observability"
- link: "/llm_observability/data_retention/"
  tag: "Documentation"
  text: "Learn how long Agent Observability retains your data"
---

## Overview

This page contains common questions and answers about billing topics for [Agent Observability][1].

## How is Agent Observability billed?

Agent Observability is metered and billed on the number of LLM spans ingested. For current rates, see the [Datadog pricing page][2].

## What counts as an LLM span?

An LLM span represents a single request to an LLM provider, such as OpenAI or Anthropic.

One agent workflow can make several LLM requests, and each one produces its own LLM span. A trace containing seven LLM requests therefore contains seven billable LLM spans. Datadog bills only on LLM spans, not on the surrounding workflow, tool, and retrieval spans in the same trace.

## Are experiments billed separately?

No. [Experiments][3] are part of Agent Observability and are billed the same way as production monitoring, on the number of LLM spans ingested.

## Are indexed spans billed separately?

No. Indexed LLM spans are included in the base price.

## Is there a free allotment of LLM spans?

Yes. Each organization receives an allotment of LLM spans per month at no cost. For the current allotment, see the [Datadog pricing page][2].

## How can I estimate my LLM span usage?

Each request your application makes to an LLM provider corresponds to one LLM span, so provider-side request counts are a good starting point. Most providers report request counts in their own console, and Datadog integrations expose the same counts as metrics:

| Provider                        | Where to find request counts                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| OpenAI                          | Total requests in the OpenAI admin UI, or sum the `*.num_model_requests` metrics               |
| AWS Bedrock                     | Invocations by model in CloudWatch, or the `aws.bedrock.invocations` metric                     |
| Google Vertex AI                | Usage metrics in the Google Cloud console, or the `gcp.aiplatform.online_prediction_requests_per_base_model` metric |
| Vercel                          | Requests by provider and model in the Vercel dashboard, or the `vercel.requests` metric         |
| Anthropic                       | Request totals are not reported; use your own application metrics as a proxy                    |

Keep three things in mind when using provider request counts:

- They are closer to an upper bound than an exact figure, because not every request is instrumented as an LLM span.
- If you [sample][4] your traces, your billable spans are a fraction of your total requests.
- Counting inbound requests to your own application undercounts if each one triggers several LLM calls. An agent that makes five LLM calls per user query produces five times the spans.

If your application uses a supported provider, the Agent Observability SDK captures these requests automatically. See the [Python SDK][5] and [Node.js SDK][6] documentation for supported providers.

## How can I see my billable usage?

In Datadog, go to [{{< ui >}}Plan & Usage{{< /ui >}}][7] and open the {{< ui >}}Agent Observability{{< /ui >}} tab.

## Does extending my data retention period affect billing?

Yes. Longer retention is a paid add-on, because it increases how much data Datadog stores for you. Add-ons extend span retention to 30, 60, or 90 days, along with a correspondingly longer period for experiment traces. For the periods each add-on provides, see [Data Retention][8]. To add one, contact your Datadog account representative or [Datadog support][9].

## Is Agent Observability a standalone product?

Yes. Agent Observability does not require you to purchase any other Datadog product.

## Is Sensitive Data Scanner included?

Agent Observability uses [Sensitive Data Scanner][10] Library Rules to identify and redact sensitive information in your LLM application traffic, including personal information, financial data, and health records. You do not purchase Sensitive Data Scanner separately to use this capability.

Your Sensitive Data Scanner allotment scales with your LLM span usage: every 10,000 LLM spans includes 1 GB of Sensitive Data Scanner usage.

| LLM spans | Included Sensitive Data Scanner usage |
| --------- | ------------------------------------- |
| 40,000    | 4 GB                                  |
| 100,000   | 10 GB                                 |
| 300,000   | 30 GB                                 |

This allotment applies to every plan. Usage beyond your allotment is billed as Sensitive Data Scanner usage.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/
[2]: https://www.datadoghq.com/pricing/
[3]: /llm_observability/improve/experiments/
[4]: /llm_observability/instrument/sdk/
[5]: /llm_observability/instrument/agentic/python
[6]: /llm_observability/instrument/agentic/nodejs
[7]: https://app.datadoghq.com/billing/usage
[8]: /llm_observability/data_retention/
[9]: /help/
[10]: /security/sensitive_data_scanner/
