---
title: Security and Data Capture in AI Gateway
description: Control whether AI Gateway spans include prompt and response content using data capture defaults and scoped overrides.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

## Configure data capture

AI Gateway records supported inference requests in Agent Observability. Requests rejected before processing, such as authentication failures or malformed request bodies, might not appear there. The data capture mode controls whether a span includes prompt and response content.

| Mode | What is recorded |
|---|---|
| Metadata only | Request and response metadata, without prompt and response content. |
| Full capture | Request and response metadata, and prompt and response content. |

Set the organization default in {{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Org defaults{{< /ui >}}. To apply a different mode to selected requests, create an override under {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Data capture{{< /ui >}}.

An override can match a user, team, model, provider, or custom tag. Every filter in an override must match. Custom tags match the exact `x-dd-tag-<KEY>` header value. Model and provider filters match the actual destination, including destinations reached through routing rules and fallbacks.

If several overrides match, **Metadata only** takes precedence over **Full capture**. If no override matches, the organization default applies.

A team capture override requires the `x-ai-gateway-team: <TEAM_SLUG>` header to select that team. Unlike team budgets and rate limits, a team capture override does not match a request based on team membership alone.

Before you send sensitive prompts or responses, check the mode that applies to the request:

1. Review the organization default and any matching capture overrides.
2. Send a harmless test request with the same caller, team selection, custom tags, and model or routing rule as the workload.
3. Open the request's Gateway span and review the recorded fields.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
