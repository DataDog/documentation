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

[Agent Observability][1] is metered and billed on the number of LLM spans ingested. An LLM span represents a single request to an LLM provider, such as OpenAI or Anthropic. One agent workflow can make several LLM requests, and each request produces its own LLM span. Datadog bills only on LLM spans, not on the surrounding workflow, tool, and retrieval spans in the same trace.

| Billing Parameter            | Price                                       | Included                                                                                                  | Billing                                                                                                                                                        |
|------------------------------|---------------------------------------------|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Free tier                    | $0                                          | Up to 40,000 LLM spans per month                                                                          | Organizations at or below 40,000 LLM spans in a calendar month are not billed for Agent Observability. Retention add-ons are not available on the free tier.    |
| LLM spans, first 100,000     | $240 per month                              | All indexed LLM spans, [Experiments][3], and 1 GB of [Sensitive Data Scanner][10] usage per 10,000 LLM spans | Datadog counts the LLM spans ingested into the Agent Observability service during the calendar month. Exceeding 40,000 LLM spans moves the organization onto the paid plan. [More Agent Observability pricing information.][2] |
| Additional LLM spans         | $5 per 10,000 LLM spans per month           | Same as above                                                                                             | Billed on LLM spans beyond the first 100,000 in the calendar month, in blocks of 10,000 spans.                                                                  |

The rates above are on-demand rates. Committed monthly and annual plans offer lower rates, and enterprise pricing is custom. Contact [Sales][11] or your [Customer Success][12] Manager to discuss a commitment or volume discounts for your account.

## Billing scenarios

**Sample cases illustrate on-demand billing rates with the default 15-day span retention. Contact [Sales][11] or your [Customer Success][12] Manager to discuss committed pricing and volume discounts for your account.**

### Usage within the free tier

Sending 30,000 LLM spans in a month.

| Billable Unit | Quantity | Price                                     | Formula | Subtotal          |
|---------------|----------|-------------------------------------------|---------|-------------------|
| LLM spans     | 30,000   | First 40,000 LLM spans included at no cost | —       | $0                |
| Total         | 30,000   |                                           |         | **$0 per month**  |

### Usage above the free tier

Sending 80,000 LLM spans in a month.

| Billable Unit | Quantity | Price                                            | Formula | Subtotal            |
|---------------|----------|--------------------------------------------------|---------|---------------------|
| LLM spans     | 80,000   | $240 per month for the first 100,000 LLM spans   | $240    | $240                |
| Total         | 80,000   |                                                  |         | **$240 per month**  |

### Usage above 100,000 LLM spans

Sending 250,000 LLM spans in a month.

| Billable Unit            | Quantity | Price                                          | Formula     | Subtotal            |
|--------------------------|----------|------------------------------------------------|-------------|---------------------|
| LLM spans, first 100,000 | 100,000  | $240 per month for the first 100,000 LLM spans | $240        | $240                |
| Additional LLM spans     | 150,000  | $5 per 10,000 LLM spans                        | 15 * $5     | $75                 |
| Total                    | 250,000  |                                                | $240 + $75  | **$315 per month**  |

## What counts as an LLM span?

An LLM span represents a single request to an LLM provider. A trace containing seven LLM requests therefore contains seven billable LLM spans, regardless of how many workflow, tool, or retrieval spans surround them.

## What is included in the base price?

Every Agent Observability capability is included in the base price and billed only on the LLM spans ingested. There is no separate charge, quota, or add-on for:

- Indexed LLM spans
- [Evaluations][13], including managed evaluations and custom LLM-as-a-judge evaluations, with no limit on how many you run
- [Experiments][3], which are metered on LLM spans in the same way as production monitoring
- [Patterns][14]
- [Annotation queues][15]
- [Datasets][16]
- [Prompt management][17] and the [playground][18]
- [Sensitive Data Scanner](#is-sensitive-data-scanner-included), within the allotment described below

## How can I estimate my LLM span usage?

Each request your application makes to an LLM provider corresponds to one LLM span, so provider-side request counts are a good starting point. Most providers report request counts in their own console, and Datadog integrations expose the same counts as metrics:

| Provider          | Where to find request counts                                                                                        |
|-------------------|---------------------------------------------------------------------------------------------------------------------|
| OpenAI            | Total requests in the OpenAI admin UI, or sum the `*.num_model_requests` metrics                                     |
| AWS Bedrock       | Invocations by model in CloudWatch, or the `aws.bedrock.invocations` metric                                           |
| Google Vertex AI  | Usage metrics in the Google Cloud console, or the `gcp.aiplatform.online_prediction_requests_per_base_model` metric   |
| Vercel            | Requests by provider and model in the Vercel dashboard, or the `vercel.requests` metric                               |
| Anthropic         | Request totals are not reported; use your own application metrics as a proxy                                          |

Keep three things in mind when using provider request counts:

- They are closer to an upper bound than an exact figure, because not every request is instrumented as an LLM span.
- If you [sample][4] your traces, your billable spans are a fraction of your total requests.
- Counting inbound requests to your own application undercounts if each one triggers several LLM calls. An agent that makes five LLM calls per user query produces five times the spans.

If your application uses a supported provider, the Agent Observability SDK captures these requests automatically. See the [Python SDK][5] and [Node.js SDK][6] documentation for supported providers.

## How can I see my billable usage?

In Datadog, go to [{{< ui >}}Plan & Usage{{< /ui >}}][7] and open the {{< ui >}}Agent Observability{{< /ui >}} tab.

## Does extending my data retention period affect billing?

Yes. Longer retention is a paid add-on, because it increases how much data Datadog stores for you. Add-ons extend span retention to 30, 60, or 90 days, along with a correspondingly longer period for experiment traces. Add-ons are not available on the free tier. For the periods each add-on provides, see [Data Retention][8]. To add one, contact your Datadog account representative or [Datadog support][9].

## Is Agent Observability a standalone product?

Yes. Agent Observability does not require you to purchase any other Datadog product.

## Is Sensitive Data Scanner included?

Yes. As with the other capabilities [included in the base price](#what-is-included-in-the-base-price), you do not purchase Sensitive Data Scanner separately. Agent Observability uses [Sensitive Data Scanner][10] Library Rules to identify and redact sensitive information in your LLM application traffic, including personal information, financial data, and health records.

Sensitive Data Scanner differs from the others in having a usage allotment rather than being unmetered.

Your Sensitive Data Scanner allotment scales with your LLM span usage: every 10,000 LLM spans includes 1 GB of Sensitive Data Scanner usage.

| LLM spans | Included Sensitive Data Scanner usage |
|-----------|---------------------------------------|
| 40,000    | 4 GB                                  |
| 100,000   | 10 GB                                 |
| 300,000   | 30 GB                                 |

This allotment applies to every plan, including the free tier. Usage beyond your allotment is billed as Sensitive Data Scanner usage.

## Troubleshooting

For technical questions, contact [Datadog support][9].

Contact [Sales][11] or your [Customer Success][12] Manager to discuss pricing or billing for your account.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/
[2]: https://www.datadoghq.com/pricing/?product=agent-observability#products
[3]: /llm_observability/improve/experiments/
[4]: /llm_observability/instrument/sdk/
[5]: /llm_observability/instrument/agentic/python
[6]: /llm_observability/instrument/agentic/nodejs
[7]: https://app.datadoghq.com/billing/usage
[8]: /llm_observability/data_retention/
[9]: /help/
[10]: /security/sensitive_data_scanner/
[11]: mailto:sales@datadoghq.com
[12]: mailto:success@datadoghq.com
[13]: /llm_observability/investigate/evaluations/
[14]: /llm_observability/investigate/patterns/
[15]: /llm_observability/investigate/annotation_queues/
[16]: /llm_observability/improve/datasets/
[17]: /llm_observability/configure/prompt_management/
[18]: /llm_observability/improve/playground
