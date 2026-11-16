---
title: Configure AI Gateway Model Pricing
description: Review automatic model prices, set custom token rates, and verify the cost used by AI Gateway budgets and reporting.
---

## Overview

AI Gateway uses model prices to estimate request cost, report spend, and enforce spending controls. Review the applied price before relying on a budget or spend rate limit, especially for manually added models and custom provider endpoints.

## Prerequisites

- [AI Gateway access and a configured provider][1].
- The `ai_gateway_config_read` permission to inspect prices and `ai_gateway_config_write` to change them, with edit access to the provider.
- Your provider's rates if you need a custom price, expressed in USD per million tokens.
- [Datadog API credentials][2] for the API examples. The application key's principal and scope must allow the required permissions.

## Review a model's applied price

1. Open [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Model Catalog{{< /ui >}}][3].
2. Find the model and its provider account. The same model can have a different price on another provider account.
3. Review its pricing status. Open {{< ui >}}Set Pricing{{< /ui >}} for a model without a price or {{< ui >}}Override{{< /ui >}} to review an existing override.
4. In {{< ui >}}Model pricing{{< /ui >}}, review the {{< ui >}}Applied price{{< /ui >}} and the available rate tables. Check input, output, cache-read, and cache-write rates, and any context-size or service-tier conditions.

An automatic price can vary with the request's context size, mode, or service tier. A rate table's condition explains when that price applies. Check those conditions before comparing the displayed rates with a provider bill.

A missing price is different from a zero price. An explicit zero rate means that token category is free under your configuration; an unpriced model has no usable price for cost accounting.

## Set a custom price

Use a custom price when your contract differs from the automatic price or the model has no automatic price.

1. In the model's pricing dialog, enter the token rates that apply to your provider agreement.
2. Review all token categories, including cached input. Use zero only when that category has no charge.
3. Click {{< ui >}}Save{{< /ui >}}, then reopen the pricing dialog to confirm the applied price.

For several models with the same rates, select their rows and click {{< ui >}}Set Pricing{{< /ui >}}. Review the selected model and provider pairs before clicking {{< ui >}}Apply Pricing{{< /ui >}}. A bulk change applies the same price configuration to each selected pair.

Custom rates are used as entered. The provider's cost multiplier does not also apply to a custom price. For automatically detected prices, the multiplier adjusts the cost; for example, `0.8` represents 80% of the automatic price. Confirm the effective rates for the specific model after changing either setting.

### Set a custom price with the API

Use the [AI Gateway API][4] to read or change pricing for a model on a specific provider account. `<PROVIDER_ID>` is the provider account's API ID, not its request slug. `<MODEL_ID>` is the canonical model ID within that provider. URL-encode it as a path component if it contains `/` or other reserved characters.

The following example uses illustrative rates, not recommended prices. Replace the identifiers and credentials before running it. The site selector updates the API host.

```shell
curl -X PUT "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/providers/<PROVIDER_ID>/models/<MODEL_ID>/pricing" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "type": "model-pricing",
      "attributes": {
        "pricing_config": {
          "version": 1,
          "source": {"type": "custom"},
          "rates": {
            "non_cached_input_cost_per_mtok": 1.0,
            "cache_write_cost_per_mtok": 1.25,
            "cache_read_cost_per_mtok": 0.1,
            "output_cost_per_mtok": 4.0
          }
        }
      }
    }
  }'
```

For custom pricing, supply all four rates as finite, nonnegative numbers. Do not use a token price to approximate a model billed by audio duration: per-token overrides cannot represent per-minute audio charges.

## Remove an override

To return to the available automatic price, open the model's pricing dialog and click {{< ui >}}Remove Override{{< /ui >}}. With the API, use:

```shell
curl -X DELETE "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/providers/<PROVIDER_ID>/models/<MODEL_ID>/pricing" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

After removal, inspect the applied price again. Removing an override does not guarantee that an automatic price exists. If none is available, the model becomes unpriced.

## Inspect price availability

Read the effective pricing state for a model with:

```shell
curl "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/providers/<PROVIDER_ID>/models/<MODEL_ID>/pricing" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

Review these response fields:

| Field | What to check |
|---|---|
| `status` | `priced` means a usable price exists; `unpriced` means it does not. |
| `effective_source` | Whether the applied price comes from an override or automatic pricing. |
| `cost_multiplier` | The multiplier applied to the effective rates. Custom prices use `1`. |
| `unpriced_reason` and `unpriced_description` | Why pricing is unavailable. |
| `automatic_pricing` | Automatic rates, conditions, source, validation timestamps, and `stale` status when available. |
| `blocks_budgeted_requests` | Whether an enforced budget blocks requests because pricing is unavailable. |
| `duration_priced` | Whether the provider bills by audio duration, which token overrides cannot represent. |

A stale automatic price can be a last-known price rather than a newly validated rate. Review its source and timestamps before using it to explain a cost change.

## Verify cost accounting

1. Record the model's applied rates and multiplier.
2. Send a small request through AI Gateway using that provider and model. Use a distinct application tag to find it again.
3. Open the request's Gateway span in [Agent Observability][5]. Compare the recorded token usage and estimated cost with the rates for the request's mode and context size.
4. If a budget covers the request, confirm its spend increases in the expected counter after the response completes.
5. If you changed or removed an override, repeat with a new request and confirm the new effective price is used.

Gateway cost is an estimate based on recorded usage and the configured price. Provider bills can include contract terms, credits, subscription allowances, or charges outside the token rates. Use the provider's billing records to reconcile the final charge.

## Troubleshoot missing prices

| Symptom | Action |
|---|---|
| `budget_pricing_unavailable` | Check the resolved model's price. Requests covered by an enforced budget can fail with HTTP `400` when the price is unavailable. |
| A manually added model has no price | Configure the actual token rates for that model, if the provider bills per token. |
| Cost differs after applying a custom price | Check all four rate categories. Custom prices bypass the provider multiplier. |
| Pricing disappears after removing an override | Check whether the provider and canonical model have an automatic price. Restore valid custom rates if needed. |
| A spend rate limit rejects an unpriced model | Supply a usable price before relying on enforced spend limits. |

[1]: /llm_observability/configure/ai_gateway/#add-a-provider
[2]: /account_management/api-app-keys/
[3]: https://app.datadoghq.com/llm/gateway/model-catalog
[4]: /api/latest/ai-gateway/
[5]: /llm_observability/configure/ai_gateway/#verify-the-request
