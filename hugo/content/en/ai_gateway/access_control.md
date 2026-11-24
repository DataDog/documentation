---
title: Control Model Access in AI Gateway
description: Use default and access policies to control which models and routing rules callers can use.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

Access policies control who can call each model and routing rule. A policy lists providers, models, routing rules, or a combination of them, and the users, [Datadog teams][13], and service accounts who can use them.

Selecting a provider includes all its models, including models added later. Selecting individual models or routing rules includes only those resources. A policy with no selections grants no access.

A caller can use models included in the default policy. For other models, they need **Runner** or **Editor** access on a policy that includes them. The same model from another provider is a separate entry. Add each provider and model pair you want to govern, such as the OpenAI pair and the Amazon Bedrock pair.

AI Gateway denies access if no policy grants it.

## Permissions

Datadog role permissions control who can send requests to AI Gateway and who can view and change its configuration. Access policies then control which models and routing rules each caller can use.

| Permission | Allows | Default role |
|---|---|---|
| AI Gateway Usage (`ai_gateway_usage`) | Send requests to AI Gateway. | Datadog Standard Role |
| AI Gateway Config Read (`ai_gateway_config_read`) | View AI Gateway configuration, such as providers, routing rules, policies, budgets, and rate limits. | Datadog Admin Role |
| AI Gateway Config Write (`ai_gateway_config_write`) | Create, edit, and delete AI Gateway configuration. | Datadog Admin Role |

- AI Gateway rejects requests from callers without `ai_gateway_usage` before it evaluates access policies.
- `ai_gateway_usage` does not grant access to any model. A caller can use a model or routing rule only when the default policy or an access policy includes it. If neither does, AI Gateway denies the request.
- Users without `ai_gateway_config_read` cannot see AI Gateway configuration in Datadog.

Because every user with the Datadog Standard Role has `ai_gateway_usage`, every resource in the default policy is available to all of them. To limit model use to specific users, teams, or service accounts, leave those resources out of the default policy and grant access through access policies.

For all Datadog permissions, see [Datadog Role Permissions][14].

## Default policy

The {{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Org defaults{{< /ui >}} tab sets the default policy. It grants everyone in your organization access to the selected resources.

Adding a resource to another access policy does not remove access granted by the default policy.

## Access policies

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Model access{{< /ui >}}][8] and create a policy.
2. Select the providers, models, and routing rules to include. A policy can contain only models, only routing rules, or both. Models alone grant direct access as `<PROVIDER_SLUG>/<MODEL_ID>`. Add a routing rule to grant access to its `router/<RULE_SLUG>` alias. Callers reach the rule's destinations through the alias only; the rule does not grant direct `<PROVIDER_SLUG>/<MODEL_ID>` access to them.
3. Choose the users, teams, and service accounts, and their access level:
   - **Viewer**: Can see the policy but cannot call its models or routing rules.
   - **Runner**: Can call the policy's models and routing rules.
   - **Editor**: Can call the policy's models and routing rules and manage who else has access.

   To take access away, select **Remove Access**. A new policy is open to everyone in your organization until you set its access, so set access before you save the policy.
4. Optional: Configure {{< ui >}}Allow fast mode{{< /ui >}} and the maximum reasoning level. A provider may use a different name for fast mode.

Access to a routing rule follows that rule's targets, so a change to the targets changes what its runners can reach. A routing rule that routes to another routing rule needs its own access. A request to `<PROVIDER_SLUG>/<MODEL_ID>` and a request to `router/<RULE_SLUG>` can be allowed or denied separately. Test both with the user or service account that sends them.

## Recommended setup

For tighter control over who can call models:

- Include only resources approved for everyone in the default policy.
- Create an access policy for each set of approved models.
- Grant **Runner** only to the users, teams, and service accounts that need it.
- Review policy membership and routing rule targets regularly.
- Give the `ai_gateway_config_write` permission only to administrators. A user with it can create an access policy for any provider they can view.

## Reasoning effort and fast mode

Use access policies to control which callers can request higher reasoning effort or premium fast mode. Model access, reasoning limits, and fast-mode permission are separate checks: access to a model does not grant every option that model offers.

### Before you begin

- Complete [AI Gateway setup][reasoning-1].
- Have `ai_gateway_config_read` and `ai_gateway_config_write` to configure policies.
- Use a caller credential whose principal and scope allow `ai_gateway_usage`.
- Choose a model that supports the reasoning level or fast mode you want to test. An AI Gateway policy grants permission; it does not add a provider capability.

### Configure the policy

1. Open [AI Gateway > Policies > Model access][reasoning-2].
2. Create or edit a policy.
3. Select the models or routing rules the policy covers.
4. Grant the intended users, teams, or service accounts {{< ui >}}Runner{{< /ui >}} or {{< ui >}}Editor{{< /ui >}} access.
5. To set a ceiling, select {{< ui >}}Limit maximum reasoning level{{< /ui >}} and choose a value under {{< ui >}}Maximum reasoning level{{< /ui >}}. The available values are Off (`none`), Minimal, Low, Medium, High, X-High (`xhigh`), and Max.
6. Clear {{< ui >}}Allow fast mode{{< /ui >}} if callers must not request a provider's premium execution tier.
7. Save the policy.
8. Test with a credential belonging to the intended caller.

New access policies have no reasoning ceiling and allow fast mode. Selecting {{< ui >}}Limit maximum reasoning level{{< /ui >}} initially sets the ceiling to {{< ui >}}Medium{{< /ui >}}; clearing it removes the ceiling. Existing policies retain their saved values.

For organization-wide settings, configure the same options under {{< ui >}}Policies > Org defaults{{< /ui >}}. Review the [Default policy](#default-policy) section before changing which models everyone can call.

### Set a reasoning ceiling

AI Gateway compares recognized levels in the following order:

```text
none < minimal < low < medium < high < xhigh < max
```

A maximum of `medium` allows `none`, `minimal`, `low`, or `medium`, and refuses `high`, `xhigh`, or `max`. AI Gateway does not lower an excessive direct request to the configured maximum.

Not every model or API supports every level in this ordering. Use a value supported by the selected model, and send it in the field for your request format:

| Request format | Reasoning field |
|---|---|
| OpenAI Responses | `reasoning.effort` |
| OpenAI Chat Completions | `reasoning_effort` |
| Anthropic Messages | `output_config.effort` |
| Native Gemini `generateContent` | `generationConfig.thinkingConfig.thinkingLevel` or `generationConfig.thinkingConfig.thinkingBudget` |

For Anthropic Messages, AI Gateway evaluates omitted effort as `high` unless conversation history overrides it. A ceiling below `high` therefore refuses Messages requests that omit effort and have no overriding value. Set the effort explicitly to use a lower ceiling.

For OpenAI requests and native Gemini requests without thinking controls, omitted effort passes the reasoning check, including a ceiling of `none`. The provider applies its own default; AI Gateway does not infer or rewrite that default. Send an explicit value to constrain and verify the actual effort.

For native Gemini, AI Gateway maps `thinkingBudget` to the following levels:

| Thinking budget | Reasoning level |
|---|---|
| `0` | `none` |
| Negative (dynamic thinking) | `max` |
| `1` to `1024` | `low` |
| `1025` to `8192` | `medium` |
| `8193` to `24576` | `high` |
| Above `24576` | `max` |

When both `thinkingLevel` and `thinkingBudget` are present, the more demanding level applies. Unrecognized levels are refused.

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

See the [OpenAI reasoning guide][reasoning-4] and [Anthropic effort guide][reasoning-5] for model-specific request options.

A conversation can override request-level effort. For Responses, the last `configuration_update` input item with `reasoning.effort` takes precedence. For Messages, the last system-role message with `output_config.effort` takes precedence. AI Gateway checks the overriding value against the ceiling. Review client-supplied history when a test uses a different effective effort than expected.

### Control fast mode

AI Gateway recognizes the following premium-mode request fields:

| Request format | Fast-mode request |
|---|---|
| OpenAI Responses and Chat Completions | `"service_tier": "fast"` or `"service_tier": "priority"` |
| Anthropic Messages | `"speed": "fast"` |

The selected provider and model must support the value you send. Provider pricing and availability apply. A provider might use a different product name for its premium tier.

Native Gemini `generateContent` requests do not have a fast-mode field evaluated by this check. Gemini `rawPredict` requests carrying Anthropic Messages use the Anthropic effort and speed fields.

Disabling {{< ui >}}Allow fast mode{{< /ui >}} refuses fast-mode requests, even within the reasoning ceiling. Enabling fast mode does not remove the reasoning ceiling.

### Understand overlapping policies

AI Gateway evaluates access policies that cover the requested resource and that the caller is authorized to use. When at least one such access policy applies, those policies decide the request's options. A more permissive default policy does not override a refusal.

Among applicable access policies:

- A policy must allow both the requested reasoning level and fast mode, if requested, to qualify.
- A qualifying policy with an explicit reasoning ceiling can allow the request.
- If no applicable access policy sets a ceiling, a qualifying policy without a ceiling allows recognized levels through `max`.
- A policy without a reasoning ceiling cannot bypass an explicit ceiling that another applicable access policy rejects.

For example, if one applicable policy caps effort at `medium` and another explicitly caps it at `high`, a non-fast `high` request can qualify through the second policy. Replacing that second ceiling with an unset ceiling does not bypass the first policy's explicit restriction.

Keep policy membership and limits consistent when several policies cover the same models.

### Check routing rule overrides

A routing rule can configure a preferred reasoning level for a destination. A routing preference is distinct from an access policy's maximum:

- The routing preference can replace the caller's reasoning settings for that destination.
- The effective request still passes the applicable access-policy checks.
- If the model or request cannot use the preference, AI Gateway retains the caller's settings. If the preference exceeds a reasoning ceiling, AI Gateway restores the caller's settings and checks all policy conditions again. The original request must still be allowed.
- Each fallback destination is evaluated separately.

Inspect `X-Ai-Gateway-Reasoning-Override` in the response AI Gateway returns to the caller after any fallbacks. An `applied` value means the preference was applied; `not_applied` means the caller's settings were retained. When present, `X-Ai-Gateway-Reasoning-Override-Reason` explains why the preference was not applied. Reasons include:

| Reason | Meaning |
|---|---|
| `catalog_unsupported` | The model catalog does not support the requested preference. |
| `translator_unavailable` | Translation is unavailable for the requested preference. |
| `request_incompatible` | The request cannot use the preference. |
| `policy_denied` | The preference exceeds an applicable reasoning ceiling. |
| `forced_tool_choice` | Forced tool choice conflicts with the preferred reasoning configuration. |
| `sampling_parameters` | Sampling parameters conflict with the preferred reasoning configuration. |
| `manual_thinking_translation` | Translation cannot preserve the manual thinking configuration with this preference. |

These headers describe the returned response, not every attempted destination.

### Verify the policy

Use the Responses example above and a test caller whose applicable policies you have reviewed:

1. With a `medium` ceiling, send a direct request for `medium` to a model that supports it. Confirm success.
2. Change only the requested effort to a supported level above `medium`. Confirm HTTP `403`, `X-Ai-Gateway-Error-Code: no_permitted_target`, and `error.reason: reasoning_level_not_allowed` in the JSON response.
3. Send a supported premium fast-mode request with {{< ui >}}Allow fast mode{{< /ui >}} disabled and an otherwise permitted request. Confirm HTTP `403`, `X-Ai-Gateway-Error-Code: no_permitted_target`, and `error.reason: fast_mode_not_allowed`.
4. Enable {{< ui >}}Allow fast mode{{< /ui >}} on the policy that applies to the test caller.
5. Repeat the request and confirm success if the provider accepts it.
6. Follow the requests from [AI Gateway Overview][reasoning-6] into Agent Observability. Check the destination and error details. For routing preferences, inspect the response headers too.

If a request unexpectedly succeeds, review every applicable access policy and the actual caller identity. If the provider rejects an allowed request, check that the model supports that effort or premium tier. See [AI Gateway error codes][reasoning-7] to distinguish policy refusals from provider errors.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: https://app.datadoghq.com/llm/gateway/access
[13]: /account_management/teams/manage/
[14]: /account_management/rbac/permissions/#agent-observability

[reasoning-1]: /ai_gateway/getting_started/
[reasoning-2]: https://app.datadoghq.com/llm/gateway/access
[reasoning-4]: https://developers.openai.com/api/docs/guides/reasoning
[reasoning-5]: https://platform.claude.com/docs/en/build-with-claude/effort
[reasoning-6]: https://app.datadoghq.com/llm/gateway
[reasoning-7]: /ai_gateway/troubleshooting/#error-codes
