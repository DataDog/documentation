---
title: AI Gateway
description: Route LLM requests through Datadog AI Gateway to control model access, routing, and spend, and to observe requests in Agent Observability.
aliases:
  - /llm_observability/configure/ai_gateway/
legacy_anchors:
  prerequisites: /ai_gateway/getting_started/#prerequisites
  get-started: /ai_gateway/getting_started/
  add-a-provider: /ai_gateway/providers/#add-a-provider
  authenticate-requests: /ai_gateway/applications/#authenticate-requests
  send-a-request: /ai_gateway/getting_started/#send-a-request
  verify-the-request: /ai_gateway/getting_started/#verify-the-request
  send-requests: /ai_gateway/requests/
  supported-request-formats: /ai_gateway/requests/#supported-request-formats
  select-a-model: /ai_gateway/requests/#select-a-model
  manage-providers: /ai_gateway/providers/#manage-providers
  route-requests-with-routing-rules: /ai_gateway/routing/
  create-a-routing-rule: /ai_gateway/routing/#create-a-routing-rule
  model-served-by-any-provider: /ai_gateway/routing/#model-served-by-any-provider
  fallback-behavior: /ai_gateway/routing/#fallback-behavior
  control-model-access: /ai_gateway/access_control/
  default-policy: /ai_gateway/access_control/#default-policy
  access-policies: /ai_gateway/access_control/#access-policies
  recommended-setup: /ai_gateway/access_control/#recommended-setup
  set-budgets: /ai_gateway/spend_controls/#set-budgets
  set-rate-limits: /ai_gateway/spend_controls/#set-rate-limits
  create-a-rate-limit: /ai_gateway/spend_controls/#create-a-rate-limit
  how-rate-limits-are-counted: /ai_gateway/spend_controls/#how-rate-limits-are-counted
  rate-limited-responses: /ai_gateway/spend_controls/#rate-limited-responses
  monitor-rate-limit-usage: /ai_gateway/spend_controls/#monitor-rate-limit-usage
  observe-ai-gateway-activity: /ai_gateway/observability/
  observe-gateway-activity: /ai_gateway/observability/
  configure-data-capture: /ai_gateway/security/#configure-data-capture
  troubleshooting: /ai_gateway/troubleshooting/
  401-or-403-responses: /ai_gateway/troubleshooting/#401-or-403-responses
  402-responses: /ai_gateway/troubleshooting/#402-responses
  429-responses: /ai_gateway/troubleshooting/#429-responses
  model-unavailable: /ai_gateway/troubleshooting/#model-unavailable
  request-not-visible-in-agent-observability: /ai_gateway/troubleshooting/#request-not-visible-in-agent-observability
  error-codes: /ai_gateway/troubleshooting/#error-codes
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

{{< partial name="ai-gateway-redirects.html" >}}

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Datadog's AI Gateway lets you govern how your organization uses large language models (LLMs) by routing agent and application traffic through a single endpoint. Because every request passes through one control point, you can:

- Call models from multiple providers through one endpoint and one set of Datadog credentials
- Give callers a stable model identifier with [routing rules](/ai_gateway/routing/) and ordered fallbacks
- Control which teams, users, and service accounts can use each model with [access policies](/ai_gateway/access_control/)
- Track and cap spend with [budgets](/ai_gateway/spend_controls/#set-budgets)
- Cap requests, tokens, and spend over rolling windows with [rate limits](/ai_gateway/spend_controls/#set-rate-limits)
- Investigate requests with spans in Agent Observability
- Manage this configuration as code with the [AI Gateway API](/ai_gateway/api/) or [Terraform](/ai_gateway/terraform/)

## Get started

[Send your first request](/ai_gateway/getting_started/) through AI Gateway and find it in Agent Observability.

## Configuration guides

| Task | Guide |
|---|---|
| Connect provider accounts and discover models | [Connect Providers](/ai_gateway/providers/) |
| Authenticate applications and attribute their requests | [Connect Applications](/ai_gateway/applications/) |
| Choose request formats, endpoints, and model identifiers | [Send Requests](/ai_gateway/requests/) |
| Identify conversations and agent runs with session IDs | [Sessions](/ai_gateway/sessions/) |
| Create model aliases and fallback destinations, and keep sessions on one destination | [Route Requests](/ai_gateway/routing/) |
| Grant access to models and routing rules | [Control Model Access](/ai_gateway/access_control/) |
| Set budgets and rate limits | [Control Spend and Usage](/ai_gateway/spend_controls/) |
| Control recorded prompt and response content | [Security and Data Capture](/ai_gateway/security/) |
| Review usage and inspect requests | [Observe Gateway Activity](/ai_gateway/observability/) |
| Manage configuration from scripts, CI jobs, or agents | [Configure with the API](/ai_gateway/api/) |
| Manage configuration as code with Terraform | [Manage with Terraform](/ai_gateway/terraform/) |
| Diagnose failed or missing requests | [Troubleshooting](/ai_gateway/troubleshooting/) |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
