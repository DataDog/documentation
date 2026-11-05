---
title: AI Gateway Allocation
description: "Split shared AI gateway spend across the teams, users, or services that sent the requests, using token usage reported by your gateway."
further_reading:
- link: "/cloud_cost_management/ai_costs"
  tag: "Documentation"
  text: "AI Costs"
- link: "/cloud_cost_management/allocation/custom_allocation_rules"
  tag: "Documentation"
  text: "Custom Allocation Rules"
- link: "/llm_observability/"
  tag: "Documentation"
  text: "Agent Observability"
---

<div class="alert alert-info">Custom AI gateway allocation is in Preview.</div>

## Overview

If your teams send LLM requests through a shared AI gateway, the provider bill shows that traffic under a single API key or project. Connect your AI gateway to split that spend across the teams, users, or services that sent the requests, using token usage reported by your gateway.

The **Connect your AI Gateway** flow generates [Custom Allocation Rules][1] that divide each provider bill in proportion to the token usage your gateway reports.

## Requirements

To connect your AI gateway, you need:

- At least one of the following AI providers set up for Cloud Cost Management:
  - [Anthropic][2]
  - [OpenAI][3]
- A source of gateway token usage:
  - [Agent Observability][4], which reports `ml_obs.span.llm.*.tokens` metrics
  - The [LiteLLM integration][5], which reports `litellm.*_tokens.metric.count` metrics
- The `cloud_cost_management_write` permission

A provider is available to allocate only if its bill is connected to Cloud Cost Management **and** your usage source reports requests to that provider.

## Create gateway allocation rules

1. Navigate to [**Cloud Cost** > **Summarize** > **AI**][6] and click **Connect your AI Gateway**.

   {{< img src="cloud_cost/ai_costs/ccm-ai-gateway-connect-button.png" alt="The AI Costs page header in Cloud Cost Management, with the Connect Your AI Gateway button highlighted." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

2. **Select usage metric**: Choose where your usage telemetry comes from.
   - Select **Agent Observability** or **LiteLLM**.
   - Filter the usage metric to your gateway traffic (for example, `service:ai_gateway`). For LiteLLM, you can instead select **Allocate my costs based on the entire metric**.
   - Choose up to three tags to break your AI spend down by, such as `team`, `user`, or `service`.
3. **Match to bills**: Select the provider bills to split. For each provider, add a bill filter that identifies the gateway's spend on that bill (for example, `api_key_name:gateway_api_key` for Anthropic or `project_name:ai_gateway` for OpenAI). Bill filters support the `is` operator.
4. **Confirm coverage**: Review the percentage of provider-reported tokens that your usage source accounts for, for each token type, over a seven-day window. If coverage exceeds 100% for a token type, check that your usage filter and bill filter cover the same API key or project. For more information, see [How gateway costs are allocated](#how-gateway-costs-are-allocated).

   {{< img src="cloud_cost/ai_costs/ccm-ai-gateway-coverage.png" alt="The Confirm coverage step of the Connect your AI Gateway flow, showing Anthropic coverage percentages for output, input, cache read, and cache write tokens." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

The flow creates one allocation rule for each provider and token type, such as input, output, cache read, and cache write tokens.

After the rules are processed, the tags you selected are added to your provider costs. Use these tags across Cloud Cost Management, including [Cloud Cost Explorer][7], dashboards, [Cost Reports][8], [monitors][9], and [budgets][10].

## How gateway costs are allocated

Gateway allocation rules compare your gateway's token usage against the token usage reported by the provider for the same bill scope. For each model and day, **coverage** is the gateway's tokens divided by the provider-reported tokens. For example, 80,000 output tokens reported by your gateway out of 100,000 output tokens reported by the provider is 80% coverage.

- The covered share of cost is split across the tags you selected in proportion to each tag value's token usage.
- The remaining share of cost is attributed to `uninstrumented`. This represents spend on the bill scope that your gateway did not report, such as requests that bypass the gateway.
- Coverage is capped at 100%. If your gateway reports more tokens than the provider, all of the cost is split across your selected tags.
- If the provider reports no token usage for a model on a given day, those costs are not allocated.

## Manage gateway allocation rules

Rules created by the **Connect your AI Gateway** flow appear in the **AI Gateway Rules** section of the [Custom Allocation Rules][1] page, grouped by provider. You can view or delete gateway rules, but you cannot edit or disable them. To change a gateway configuration, delete its rules and run the **Connect your AI Gateway** flow again.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/allocation/custom_allocation_rules/?tab=even
[2]: /cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts
[3]: /cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[4]: /llm_observability/
[5]: /integrations/litellm/
[6]: https://app.datadoghq.com/cost/summarize/ai-costs
[7]: https://app.datadoghq.com/cost/explorer
[8]: /cloud_cost_management/reporting
[9]: /cloud_cost_management/cost_changes/monitors
[10]: /cloud_cost_management/planning/budgets
