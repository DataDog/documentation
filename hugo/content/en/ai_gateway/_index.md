---
title: AI Gateway
description: Route LLM requests through Datadog AI Gateway to control model access, routing, and spend, and to observe requests in Agent Observability.
aliases:
  - /llm_observability/configure/ai_gateway/
further_reading:
  - link: "/llm_observability/"
    tag: "Documentation"
    text: "Agent Observability"
  - link: "/account_management/personal-access-tokens/"
    tag: "Documentation"
    text: "Personal access tokens"
  - link: "/account_management/org_settings/service_accounts/"
    tag: "Documentation"
    text: "Service accounts"
  - link: "/ai_gateway/getting_started/"
    tag: "Documentation"
    text: "Get Started with AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Datadog's AI Gateway lets you govern how your organization uses large language models (LLMs) by routing agent and application traffic through a single endpoint. Because every request passes through one control point, you can:

- Call models from multiple providers through one endpoint and one set of Datadog credentials
- Give callers a stable model identifier with [routing rules](/ai_gateway/routing/) and ordered fallbacks
- Control which teams, users, and service accounts can use each model with [access policies](/ai_gateway/access_control/)
- Bill Claude Code and Codex usage to each user's own Claude or ChatGPT subscription with [subscription providers](/ai_gateway/providers/#use-subscription-providers)
- Track and cap spend with [budgets](/ai_gateway/spend_controls/#set-budgets)
- Cap requests, tokens, and spend per minute with [rate limits](/ai_gateway/spend_controls/#set-rate-limits)
- Investigate requests with spans in Agent Observability
- Manage providers, routing rules, access policies, budgets, and rate limits as code with the [AI Gateway API](/ai_gateway/api/) or [Terraform](/ai_gateway/terraform/)

## Get started

[Send your first request](/ai_gateway/getting_started/) through AI Gateway and find it in Agent Observability.

## Configuration guides

| Task | Guide |
|---|---|
| Connect provider accounts and discover models | [Connect Providers](/ai_gateway/providers/) |
| Authenticate applications and attribute their requests | [Connect Applications](/ai_gateway/applications/) |
| Choose request formats, endpoints, and model identifiers | [Send Requests](/ai_gateway/requests/) |
| Create model aliases, split traffic by session, route by task, and add fallbacks | [Route Requests](/ai_gateway/routing/) |
| Grant access to models and routing rules | [Control Model Access](/ai_gateway/access_control/) |
| Set budgets and rate limits | [Control Spend and Usage](/ai_gateway/spend_controls/) |
| Control recorded prompt and response content | [Security and Data Capture](/ai_gateway/security/) |
| Review usage and inspect requests | [Observe AI Gateway Activity](/ai_gateway/observability/) |
| Manage configuration from scripts, CI jobs, or agents | [Configure with the API](/ai_gateway/api/) |
| Manage configuration as code with Terraform | [Manage with Terraform](/ai_gateway/terraform/) |
| Diagnose failed or missing requests | [Troubleshooting](/ai_gateway/troubleshooting/) |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
