---
title: Control reasoning effort and fast mode in AI Gateway
description: Set maximum reasoning levels and fast-mode permissions in Datadog AI Gateway access policies, and verify allowed and refused requests.
further_reading:
  - link: "/llm_observability/configure/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

Use access policies to control which callers can request higher reasoning effort or premium fast mode. Model access, reasoning limits, and fast-mode permission are separate checks: access to a model does not grant every option that model offers.

## Before you begin

- Complete [AI Gateway setup][1].
- Have `ai_gateway_config_read` and `ai_gateway_config_write` to configure policies.
- Use a caller credential whose principal and scope allow `ai_gateway_usage`.
- Choose a model that supports the reasoning level or fast mode you want to test. A Gateway policy grants permission; it does not add a provider capability.

## Configure the policy

1. Open [AI Gateway > Policies > Access policies][2].
2. Create or edit a policy, select the models or routing rules, and grant the intended users, teams, or service accounts **Runner** or **Editor** access.
3. Set the maximum reasoning level.
4. Enable **Allow fast mode** only for callers who need the provider's premium execution tier.
5. Save the policy and test with a credential belonging to the intended caller.

For organization-wide settings, configure the same options under **Policies > Org defaults**. Review the [access policy rules][3] before changing which models everyone can call.

## Set a reasoning ceiling

AI Gateway compares recognized levels in this order:

```text
none < minimal < low < medium < high < xhigh < max
```

A maximum of `medium` allows a request for `low` or `medium` and refuses a request for `high`. AI Gateway does not lower an excessive direct request to the configured maximum.

Not every model or API supports every level in this ordering. Use a value supported by the selected model, and send it in the field for your request format:

| Request format | Reasoning field |
|---|---|
| OpenAI Responses | `reasoning.effort` |
| OpenAI Chat Completions | `reasoning_effort` |
| Anthropic Messages | `output_config.effort` |

For Anthropic Messages, AI Gateway evaluates omitted effort as `high`. Set the effort explicitly when testing a lower ceiling.

For OpenAI requests, an omitted effort does not establish a provider-independent ceiling on default behavior. Send an explicit value to verify a specific level.

For example, use a model that supports `medium` with this Responses request. Load the Datadog token from your secret manager into `DD_AI_GATEWAY_TOKEN`:

```shell
curl -i -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/responses" \
  -H "Authorization: Bearer $DD_AI_GATEWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<PROVIDER_SLUG>/<MODEL_ID>",
    "input": "Explain why retries need a limit.",
    "reasoning": {"effort": "medium"}
  }'
```

See the [OpenAI reasoning guide][4] and [Anthropic effort guide][5] for model-specific request options.

## Control fast mode

AI Gateway recognizes these premium-mode request fields:

| Request format | Fast-mode request |
|---|---|
| OpenAI-style requests | `"service_tier": "fast"` or `"service_tier": "priority"` |
| Anthropic Messages | `"speed": "fast"` |

The selected provider and model must support the value you send. Provider pricing and availability apply. A provider might use a different product name for its premium tier.

When the applicable policy disables **Allow fast mode**, a fast-mode request is refused even if its reasoning effort is within the policy's ceiling. Enabling fast mode does not remove the reasoning ceiling.

## Understand overlapping policies

AI Gateway evaluates named policies that cover the requested resource and that the caller is authorized to use. When at least one such named policy applies, those policies decide the request's options; a more permissive organization default does not override a refusal.

Among applicable named policies:

- A policy must allow both the requested reasoning level and fast mode, if requested, to qualify.
- A qualifying policy with an explicit reasoning ceiling can allow the request.
- A policy without a reasoning ceiling cannot bypass an explicit ceiling that another applicable named policy rejects.

For example, if one applicable policy caps effort at `medium` and another explicitly caps it at `high`, a non-fast `high` request can qualify through the second policy. Replacing that second ceiling with an unset ceiling does not bypass the first policy's explicit restriction.

Keep policy membership and limits consistent when several policies cover the same models.

## Check routing rule overrides

A routing rule can configure a preferred reasoning level for a destination. This is distinct from an access policy's maximum:

- The routing preference can replace the caller's reasoning settings for that destination.
- The effective request still passes the applicable access-policy checks.
- If the preference cannot be applied, Gateway can retain the caller's settings. A preference refused specifically because it exceeds a reasoning ceiling can also fall back to the caller's settings.
- Each fallback destination is evaluated separately.

Inspect `X-Ai-Gateway-Reasoning-Override` in the surfaced response. An `applied` value means the preference was applied; `not_applied` means the caller's settings were retained. When present, `X-Ai-Gateway-Reasoning-Override-Reason` explains why the preference was not applied.

## Verify the policy

Use a test caller whose applicable policies you have reviewed:

1. With a `medium` ceiling, send a direct request for `medium` to a model that supports it. Confirm success.
2. Change only the requested effort to a supported level above `medium`. Confirm an access refusal.
3. Send a supported premium fast-mode request with **Allow fast mode** disabled. Confirm refusal.
4. Enable fast mode for the test caller, repeat the request, and confirm success if the provider accepts it.
5. Follow the requests from [AI Gateway Overview][6] into Agent Observability. Check the destination and error details. For routing preferences, inspect the response headers too.

If a request unexpectedly succeeds, review every applicable named policy and the actual caller identity. If the provider rejects an allowed request, check that the model supports that effort or premium tier. See [Gateway error codes][7] to distinguish policy refusals from provider errors.

[1]: /llm_observability/configure/ai_gateway/#get-started
[2]: https://app.datadoghq.com/llm/gateway/access
[3]: /llm_observability/configure/ai_gateway/#control-model-access
[4]: https://developers.openai.com/api/docs/guides/reasoning
[5]: https://platform.claude.com/docs/en/build-with-claude/effort
[6]: https://app.datadoghq.com/llm/gateway
[7]: /llm_observability/configure/ai_gateway/#error-codes
