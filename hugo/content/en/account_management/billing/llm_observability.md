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
- link: "https://www.datadoghq.com/pricing/?product=llm-observability#products"
  tag: "Pricing"
  text: "Agent Observability pricing"
---

[Agent Observability][1] is metered and billed on the number of LLM spans ingested. For current rates, including the free tier allotment, on-demand rates, and committed plans, see the [Agent Observability pricing page][2].

## What counts as an LLM span?

An LLM span represents a single request to an LLM provider. A trace containing seven LLM requests therefore contains seven billable LLM spans, regardless of how many workflow, tool, or retrieval spans surround them.

## What is included in the base price?

All Agent Observability features are included in the base price. Datadog charges only for the LLM spans you ingest.

You can connect your own [LLM provider account][14] for [Evaluations][12] and [Patterns][13].

[Sensitive Data Scanner](#is-sensitive-data-scanner-included) is included within a usage allotment.

## How can I estimate my LLM span usage?

Each request your application makes to an LLM provider corresponds to one LLM span, so provider-side request counts are a good starting point. Most providers report request counts in their own console, and Datadog integrations expose the same counts as metrics:

| Provider          | Where to find request counts                                                                                        |
|-------------------|---------------------------------------------------------------------------------------------------------------------|
| OpenAI            | Total requests in the OpenAI admin UI, or sum the `*.num_model_requests` metrics                                     |
| AWS Bedrock       | Invocations by model in CloudWatch, or the `aws.bedrock.invocations` metric                                           |
| Google Vertex AI  | Usage metrics in the Google Cloud console, or the `gcp.aiplatform.online_prediction_requests_per_base_model` metric   |
| Vercel            | Requests by provider and model in the Vercel dashboard, or the `vercel.requests` metric                               |
| Anthropic         | Request totals are not reported; use your own application metrics as a proxy                                          |

Keep the following in mind when using provider request counts:

- They are closer to an upper bound than an exact figure, because not every request is instrumented as an LLM span.
- If you [sample][3] your traces, your billable spans are a fraction of your total requests.
- Counting inbound requests to your own application undercounts if each one triggers several LLM calls. An agent that makes five LLM calls per user query produces five times the spans.

If your application uses a supported provider, the Agent Observability SDK captures these requests automatically. See the [Python SDK][4] and [Node.js SDK][5] documentation for supported providers.

## How can I see my billable usage?

In Datadog, go to [{{< ui >}}Plan & Usage{{< /ui >}}][6] and open the {{< ui >}}Agent Observability{{< /ui >}} tab.

## Does extending my data retention period affect billing?

Yes. Longer retention is a paid add-on, because it increases how much data Datadog stores for you. Add-ons extend span retention to 30, 60, or 90 days, along with a correspondingly longer period for experiment traces. Add-ons are not available on the free tier. For the periods each add-on provides and how to request one, see [Data Retention][7].

## Is Agent Observability a standalone product?

Yes. Agent Observability does not require you to purchase any other Datadog product.

## Is Sensitive Data Scanner included?

Yes. As with the other capabilities [included in the base price](#what-is-included-in-the-base-price), you do not purchase Sensitive Data Scanner separately. Agent Observability uses [Sensitive Data Scanner][9] Library Rules to identify and redact sensitive information in your LLM application traffic, including personal information, financial data, and health records.

Your Sensitive Data Scanner allotment scales with your LLM span usage: every 10,000 LLM spans includes 1 GB of Sensitive Data Scanner usage.

| LLM spans | Included Sensitive Data Scanner usage |
|-----------|---------------------------------------|
| 40,000    | 4 GB                                  |
| 100,000   | 10 GB                                 |
| 300,000   | 30 GB                                 |

This allotment applies to every plan, including the free tier. Usage beyond your allotment is billed as Sensitive Data Scanner usage.

## Troubleshooting

For technical questions, contact [Datadog support][8].

Contact [Sales][10] or your [Customer Success][11] Manager to discuss pricing or billing for your account.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/
[2]: https://www.datadoghq.com/pricing/?product=llm-observability#products
[3]: /llm_observability/instrument/sdk/
[4]: /llm_observability/instrument/agentic/python
[5]: /llm_observability/instrument/agentic/nodejs
[6]: https://app.datadoghq.com/billing/usage
[7]: /llm_observability/data_retention/
[8]: /help/
[9]: /security/sensitive_data_scanner/
[10]: mailto:sales@datadoghq.com
[11]: mailto:success@datadoghq.com
[12]: /llm_observability/investigate/evaluations/
[13]: /llm_observability/investigate/patterns/
[14]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account/
