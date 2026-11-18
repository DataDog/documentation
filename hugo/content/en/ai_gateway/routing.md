---
title: Route Requests with AI Gateway
description: Create stable model aliases and configure fallback destinations with AI Gateway routing rules.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/ai_gateway/sessions/"
    tag: "Documentation"
    text: "AI Gateway sessions"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

A routing rule gives callers a stable `router/<RULE_SLUG>` model value while the rule selects the destination. Use a routing rule to change models or providers without changing application code, and to add fallback destinations.

## Create a routing rule

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Routing{{< /ui >}}][7] and click {{< ui >}}New Routing Rule{{< /ui >}}.
2. Enter a lowercase slug. The page shows the resulting `router/<RULE_SLUG>` identifier.
3. Configure the first routing step. Select one model, use {{< ui >}}Weighted{{< /ui >}} to assign traffic shares across destinations, or select {{< ui >}}Another route{{< /ui >}} to link a routing rule. A model destination can use a specific provider account or any configured provider that serves that model.
4. Optional: Add fallback steps in priority order.
5. Review the {{< ui >}}Access{{< /ui >}} stage and choose who can call the routing rule. See [Control model access](/ai_gateway/access_control/).
6. Review and save the rule, then copy its identifier into the `model` field of your requests.

Configure [data capture](/ai_gateway/security/#configure-data-capture) through organization defaults and scoped overrides under {{< ui >}}Policies{{< /ui >}}.

A {{< ui >}}Weighted{{< /ui >}} step assigns traffic shares to sessions, not to individual requests, so each conversation keeps returning to the same destination. To identify a conversation, send the `x-session-id` header. See [AI Gateway sessions](/ai_gateway/sessions/).

## Model served by any provider

A model served by any configured provider considers all enabled providers in your organization that serve that model. Only providers permitted by the caller's [model access](/ai_gateway/access_control/) settings are eligible. AI Gateway tries those providers in slug order and sends each one its provider model ID.

## Fallback behavior

AI Gateway tries the next provider or fallback destination when the current one cannot serve the request or returns HTTP `401`, `402`, `403`, `408`, `429`, or `5xx`. A successful response, or any other `4xx` response (such as `400`, `404`, or `422`), is returned to the caller. If every attempt returns one of the fallback statuses, the caller receives the last of those responses. If no destination can serve the request, the request fails.

[Budgets](/ai_gateway/spend_controls/#set-budgets) in Block mode are checked per destination. If a budget blocks one destination, AI Gateway falls back to the next. If budgets block every destination, AI Gateway returns HTTP `402` until the budget window resets.

[Rate limits](/ai_gateway/spend_controls/#set-rate-limits) in Enforce mode are also checked per destination. A rate limit scoped to one model or provider makes AI Gateway fall back to the next destination. A rate limit that matches every destination, such as an organization-wide limit, returns HTTP `429`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[7]: https://app.datadoghq.com/llm/gateway/routing
