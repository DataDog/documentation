---
title: Datadog AI Gateway best practices
customclass: ai-gateway-best-practices
description: Plan, configure, and operate AI Gateway with recommendations for identity, routing, access, spend controls, coding agents, observability, and data capture.
further_reading:
  - link: "/ai_gateway/getting_started/"
    tag: "Documentation"
    text: "Get Started with AI Gateway"
  - link: "/ai_gateway/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshoot AI Gateway"
---

Use these operational best practices to plan, configure, and run AI Gateway for developers, applications, and agents. Before you begin, complete the [AI Gateway prerequisites][1].

## Plan before you connect

- **Give each caller the right identity.** Use personal identities for developers and a separate service account for each independently governed workload. [Personal access tokens (PATs)][2] expire within a year; [service access tokens (SATs)][3] can have an expiration date or no expiration. For interactive use, prefer an approved OAuth credential helper that refreshes access tokens automatically. Rotate PATs and SATs through a supported process before they expire, according to your rotation schedule, and when ownership changes.

- **Define a tag schema.** Requests can carry `x-dd-tag-<KEY>` headers, and budgets, rate limits, and spend views can filter on them. Choose a few application-specific keys before rollout, such as `project`, `ai_agent`, and a FinOps cost-center key. Keep values low-cardinality and consistently cased. Avoid `env`, `ml_app`, and keys prefixed with `gateway.` for budgets, because budgets cannot import historical usage for those tags.

- **Decide your default access posture.** [Org defaults][4] define which providers, models, and routing rules all organization principals with **AI Gateway Usage** can call. Keep these defaults limited to resources approved for everyone, and grant additional access selectively through access policies. Adding a resource to another policy does not remove access granted through Org defaults. Test changes with the affected callers and request settings.

<div class="alert alert-tip">

**Manage the gateway as code.** Use approved automation, such as [Terraform][5], to version and review configuration changes. Restrict AI Gateway edit permissions to the automation's service account and grant it only the permissions it needs. In production, give human users read-only access to the AI Gateway UI and apply configuration changes through code.

</div>

## Connect providers

- **Choose permanent provider slugs.** The slug is part of every direct model ID (`<PROVIDER_SLUG>/<MODEL_ID>`). You cannot change the slug, provider type, or integration account after creation. Use short, stable names such as `anthropic-prod` or `bedrock-us`, and have clients call routing rules so they do not depend on provider slugs. The integration-account binding is immutable, but you can rotate credentials stored in that account.

- **Use informative provider names and tags.** Identify the account, project, or service account behind each provider. Use descriptive integration-account names and tags where available, such as in the OpenAI integration, to make the destination recognizable.

- **Create one provider per account and purpose.** Separate production from development, evaluations, and coding. Give a team with its own contract its own provider. You can then budget, rate-limit, rotate credentials for, and use each provider as a fallback independently.

- **Centralize credentials for integration-account providers.** Store provider credentials in Datadog integration accounts so callers authenticate with a Datadog credential without holding the provider key. This centralizes rotation and reduces credential distribution. Subscription providers use a different setup: callers retain their vendor sign-in, as described under [Coding agents](#coding-agents).

- **Customize pricing when needed.** AI Gateway computes costs from token usage and effective configured model prices. For negotiated rates, set the provider's cost multiplier (`0.8` means 80% of the automatic price) or per-model custom prices, which bypass the multiplier. Price every model covered by a budget: budgets in **Block** mode reject unpriced models with `budget_pricing_unavailable`.

- **Remove references before removing a provider.** Update routing rules, budgets, rate limits, and access policies that reference the provider before deleting it. Use routing rules instead of hardcoded model IDs to reduce client changes.

<div class="alert alert-warning">

**Review provider terms and configuration access.** Your organization is responsible for reviewing the data processing terms of the providers you configure. Select providers that meet your organization's data handling and compliance requirements. Datadog recommends applying the same review to every fallback destination before adding it to a routing rule.

A custom provider's base URL lives on its integration account. Anyone who can edit that account can change where the provider key and user prompts are sent. Restrict integration management, and monitor base URL changes and new integration accounts.

</div>

For setup instructions, see [Connect Providers][6].

## Authentication

- **Grant only the permissions callers need.** Both the calling principal and the credential's scopes must allow **AI Gateway Usage** (`ai_gateway_usage`). If AI Guard evaluates requests, both must also allow **AI Guard Evaluate** (`ai_guard_evaluate`). Grant **AI Gateway Config Read** (`ai_gateway_config_read`) where configuration visibility is needed, and reserve **AI Gateway Config Write** (`ai_gateway_config_write`) for gateway administrators and approved automation.

- **Review the Standard role before enabling default access.** The Datadog Standard role includes **AI Gateway Usage**. Users with this role can query models included in the default access policy when their credentials also permit that usage.

- **Give each workload its own service account.** Use a separate service account with the minimum permissions needed for each independently governed application or agent. This gives spend, budgets, and rate limits a clear identity and lets you revoke one workload without affecting others. For workload-specific AI Guard coverage, attach a policy to the workload's routing rule. Use an organization-default attachment for broader coverage.

- **Keep tokens out of code, repositories, and logs.** Store them in a secret manager or credential helper. For coding agents, distribute the gateway URL through managed or repository settings and fetch the token at runtime.

For credential options and request headers, see [Authenticate requests][7].

## Routing

- **Give clients stable aliases.** Create a routing rule for each class of work, such as `coding-fast`, `coding-balanced`, and `coding-capable`, and have clients send `router/<RULE_SLUG>` as the model. Model deprecations, price changes, and availability problems then require a rule edit instead of a change in every client. Rule slugs cannot change after creation, so name rules by purpose rather than model.

- **Grant access when you create the rule.** The default access choice, **Decide later**, grants nobody access. Calls return `no_permitted_target` (HTTP `403`) until an access policy includes the rule. Choose the teams or service accounts during creation.

- **Order fallbacks from most to least compatible.** Put the same model on another provider first, for example Claude through Anthropic, then Amazon Bedrock or Vertex AI. Follow with a model from the same family, then another family. Cross-family fallbacks can rely on API translation and change output style, tool calling, and provider-specific features. Decide in advance whether higher cost, longer latency, or lower task quality is acceptable during an outage.

- **Test every fallback with representative requests.** Check support for tools, structured output, images, reasoning settings, and context length before depending on the chain.

- **Know what triggers a fallback.** A rule tries the next destination when the current one returns HTTP `401`, `402`, `403`, `408`, `429`, or a `5xx` error. Other `4xx` errors return to the caller. Budgets and rate limits are checked per destination: a limit scoped to one model can reroute traffic, while one that matches every destination returns HTTP `402` or `429`. Fallback happens only before a response starts. Stateful sessions have additional restrictions, described below.

- **Use session-aware strategies to preserve the prompt cache.** Weighted and Smart steps choose a destination per session, and session pinning sends later turns to the destination that served the session. Session signals include `x-session-id`, a coding agent's session ID, or a [prompt fingerprint][22]. Send an explicit session ID when possible; requests that continue stored provider history might not have a fingerprint.

- **Test new models with weighted splits.** Weights divide sessions rather than requests. Start a model at 5% to 10% of sessions and compare quality, latency, and cost before increasing its share. Changing weights does not move pinned sessions, so new sessions receive the change. In Agent Observability, use gateway-provided tags to compare models. Run LLM-as-a-judge evaluations with the same task-specific criteria for both models, then compare quality scores alongside latency and cost. Use an approved evaluation dataset or reviewed content capture. Metadata-only gateway spans do not contain the conversation text needed for content-based evaluations.

<div class="alert alert-info">

**Stateful sessions stay with their destination.** When session pinning is enabled and the session's record can be read, requests that continue provider-bound state stay on the pinned destination. If that destination fails or a budget or rate limit blocks it, AI Gateway returns the error instead of falling back. Users can wait for a rate limit to reset, request a limit adjustment, or start a new session that can select another destination. If AI Gateway cannot read the pinning record, ordinary routing can resume. See [Session pinning][8].

</div>

For routing configuration and fallback details, see [Route Requests][9].

## Model permissions

- **Apply default policy changes with care.** Keep Org defaults limited to resources approved for everyone, and grant additional access selectively through access policies.

- **Test access changes as the affected principal.** A direct `<PROVIDER_SLUG>/<MODEL_ID>` call and a `router/<RULE_SLUG>` call can use different effective policies. After a change, send both kinds of request as a non-admin user or service account. Expect `no_permitted_target` (HTTP `403`) only where you intended to deny access.

- **Expose routing rules where possible.** Access to a rule lets callers reach its direct targets through the rule without a grant per model. You can change the models behind a rule without changing access policies. A rule that routes to another rule requires access to both.

- **Review routing rule edits like policy edits.** Access follows a rule's targets, so changing a target changes what the rule's runners can reach. Give target changes the same review as policy changes.

- **Cap expensive settings in policy.** Policies can disallow fast mode and set a maximum reasoning level. Use them to block the costliest combinations, such as the highest reasoning tier on your largest model, instead of relying on each client's defaults.

- **Cover every path to a model.** Models are identified by provider and model, so Claude through Anthropic and Claude through Amazon Bedrock are separate resources. Govern each enabled provider and model pair. Restricting one does not change permissions for the same model through Vertex AI.

For policy configuration, see [Control Model Access][10].

## Set budgets

- **Create an organization-wide budget as a backstop.** Create a monthly budget scoped to **Everything** before adding narrower budgets. It counts all matching spend, including traffic also covered by narrower budgets, and catches traffic those budgets miss. Use **Untracked** on the budgets page to find uncovered spend.

- **Start in Alert-only mode.** Traffic continues while the budget's monitor alerts at the warning threshold and at the limit. Alerting developers when they exceed configured thresholds can help reduce coding spend. See [how Datadog optimizes AI usage][11].

- **Switch to Block with thresholds based on observed usage.** After a representative period in **Alert-only**, review usage before choosing a limit. Choose limits from observed spend for comparable workloads and accounting periods, with headroom for expected peaks. In **Block** mode, clients receive HTTP `402` when matching budgets block every destination.

- **Count existing usage when adding a budget mid-period.** Select **Track existing usage for current period** and verify the starting spend after saving. Otherwise, the counter starts at zero and the first window can allow more spend than intended.

- **Layer a daily budget under the monthly budget.** Budget windows follow calendar days, weeks, or months in UTC. Add a daily budget on the same scope to reduce the risk of spending the monthly allowance in one day.

- **Use cheaper fallbacks where sessions can switch destinations.** Pair a **Block** budget on an expensive model or provider with a routing rule containing a cheaper fallback. Scope the budget so it does not also block that destination. New sessions and requests without a stateful pin can fall back when the expensive destination reaches its limit. Existing stateful pinned sessions receive the budget error and need a limit adjustment or a new session. Keep an overall budget covering all destinations.

- **Send alerts to people who can act.** Each budget's monitor notifies its creator by default. Add the owning team's notification channel or on-call handle. Set a warning threshold, such as 80%, that leaves time to act before the hard stop.

- **Select a team for attribution and limits.** Without `x-ai-gateway-team`, user requests can count against matching budgets and rate limits for every team the user directly belongs to. Send an authorized team's slug in the header to select that team. Matching user and organization controls still apply.

- **Publish a process for requesting a limit adjustment.** Decide who can increase limits and how users request changes. You can increase an allowance or reset spend for the active period without changing future periods.

- **Treat dollar spend as an estimate.** AI Gateway computes spend from token counts and prices as requests complete. Totals can differ from invoices, and concurrent requests can exceed a limit. Leave headroom, reconcile monthly against your bill or Cloud Cost Management, and use provider-side enforced spend caps, where available, as an additional backstop.

<div class="alert alert-warning">

**Use trusted dimensions for enforced controls.** Callers set their own request tags and can change them. Base enforced limits on users, teams, service accounts, models, or providers, and use tag budgets for attribution and cooperative caps. Base data capture overrides on trusted dimensions as well. If you use tags for these controls, enforce ownership of the relevant keys outside caller-controlled settings.

</div>

<div class="alert alert-info">

**Template allowances apply to each counter.** Give each user or model a separate counter, such as $100 per month each, without creating separate budgets. The amount applies per counter: $100 across 50 users allows up to $5,000. Requests missing the split dimension do not match the template, so retain an organization-wide budget.

</div>

For budget scopes, templates, and active-period adjustments, see [Set budgets][12].

## Rate limits

- **Start in Alert mode.** New rules default to **Alert**, which counts requests that would be limited without rejecting them. Review **Would limit** activity over a representative period, then switch to **Enforce**, which returns HTTP `429` with `gateway_rate_limit` when no fallback is available.

- **Size limits from observed traffic.** Base each limit on the traffic it covers and leave headroom for peaks. Changes apply within seconds, so tighten limits gradually.

- **Leave headroom below provider quotas.** Size gateway limits against the provider quotas shared by the underlying account, including traffic outside the gateway. Lower gateway limits can reduce provider throttling, but differences in accounting and concurrent requests mean they cannot prevent it entirely.

- **Give heavy users and agents independent allowances.** A pooled team rule shares its allowance across matching team traffic. Use a template with per-user counters when each member needs an independent allowance.

- **Use target-scoped limits to redirect excess traffic to a second provider.** In a routing rule, a limit scoped to one target can cause requests to fall back to the next target. An organization-wide limit applies to all targets. Stateful pinned sessions retain their destination, as described under [Routing](#routing).

- **Understand how limits count.** Per-minute limits use a rolling 60-second window, and requests count against every matching rule. Tokens count when a response completes, so concurrent requests can exceed a token limit before enforcement catches up. Team matching follows the selection behavior described under [Set budgets](#set-budgets). An organization can have up to 100 active rules.

- **Use rate limits for pace and budgets for totals.** Rate limits constrain runaway loops over a rolling window, while budgets bound spend over a day, week, or month. Use both for workloads that need control over traffic and total spend.

<div class="alert alert-warning">

**Spending controls can fail open.** If AI Gateway cannot check a budget or rate limit, it can allow the request to continue. Explicit team selection and access-policy checks fail closed. Automatic team-membership lookup can fail open, allowing requests without team-based attribution or matching team budgets and rate limits. Other matching controls are still checked. Treat gateway budgets and rate limits as operational guardrails, and use provider-side enforced spend caps, where available, as an additional backstop.

</div>

For rule configuration and response headers, see [Set rate limits][13].

<!-- vale Datadog.headings = NO -->
## Coding agents
<!-- vale Datadog.headings = YES -->

- **Distribute settings centrally.** Push the base URL, headers, and credential helper through managed settings or a mobile device management (MDM) tool, such as Jamf or Intune. Central management lets you update or roll back configuration across developers.

- **Distribute the URL and fetch the credential at runtime.** Keep tokens out of shared agent settings, including a project's `.claude/settings.json`. For organization-funded traffic, use an approved credential helper, such as Claude Code's `apiKeyHelper`, to retrieve credentials at runtime. Subscription traffic requires the separate sign-in setup described below.

- **Send routing headers from configuration.** Set `x-ai-gateway-provider` or a `router/<RULE_SLUG>` model. When selecting a team, also set `x-ai-gateway-team`. Use the client's header settings, such as `ANTHROPIC_CUSTOM_HEADERS` for Claude Code or `http_headers` for Codex, so requests resolve without users entering a provider prefix.

- **Allow the models the coding agent calls in the background.** Claude Code uses a small Haiku-class model for background tasks such as session titles, and subagents can use a different model from the user's selection. Grant access to those models or point the client's model settings, such as `ANTHROPIC_DEFAULT_HAIKU_MODEL`, at an approved model.

- **Show users only models they can call.** Use the client's model-list settings to expose approved models for each user or team. Check the client's catalog format: an AI Gateway model-listing response is not a Codex model catalog. See [Configure Codex][14].

- **Preserve the prompt cache and control session cost.** Avoid routing changes and fallbacks that move a session between providers. Cap reasoning effort and disable fast mode in access policies for groups that do not need them.

- **Test each client surface before rollout.** Some features require a direct vendor identity and can stop working or bypass the gateway when a client uses gateway credentials. For Claude Code, Remote Control and voice dictation are unavailable with a gateway credential, and Slack and cloud sessions do not use the gateway. Inventory desktop apps, operating systems, remote sessions, and other features that developers use, then verify each one routes traffic as expected.

- **Preserve vendor sign-in for subscription providers.** Keep the user's vendor subscription credential in `Authorization` and send the Datadog PAT in `dd-application-key`. Follow the [subscription setup for your coding agent][15] so both credentials are supplied and vendor token refresh continues to work. Credential helpers for API-funded usage can override vendor sign-in; do not apply that setup to subscription traffic.

- **Keep a temporary direct-provider profile during migration.** Give developers a way to use the provider directly while moving to the gateway. Ask them to report each use, then remove that path when you block direct egress.

<div class="alert alert-info">

**Use request and token limits for subscription traffic.** Subscription traffic is excluded from gateway dollar budgets. Use request and token limits with attribution, confirm subscription providers are enabled for your organization, and check the vendor plan's quotas and billing terms.

</div>

For client configuration, see [Connect Applications][16].

<!-- vale Datadog.headings = NO -->
## Applications and agents
<!-- vale Datadog.headings = YES -->

- **Name the provider or rule on every call.** Send `<PROVIDER_SLUG>/<MODEL_ID>` or `router/<RULE_SLUG>` as the model, or set `x-ai-gateway-provider`. A bare model name without a provider selection fails with `model_not_found`.

- **Tag every request with its application.** Send `x-dd-tag-ml_app: <APPLICATION_NAME>` so gateway spans use the application's name in Agent Observability instead of the default `datadog-ai-gateway`. Add the other tags from your schema at the same time. A propagated Agent Observability application name can also replace the default; an explicit `x-dd-tag-ml_app` takes precedence.

- **Choose where LLM instrumentation runs.** If the application already instruments LLM calls, decide whether to retain both client and gateway spans. To avoid duplicate LLM instrumentation, disable overlapping client instrumentation for gateway-routed calls while preserving application tracing. If you retain both, propagate Datadog trace context to connect the spans in one trace. Propagation correlates spans; it does not deduplicate them. Configure usage and cost reports to avoid counting a call twice.

- **Stream long-running requests.** Non-streaming calls are subject to gateway and infrastructure deadlines. Set client timeouts for the complete operation, including retries and fallback.

- **Handle interrupted streams.** Network or infrastructure events can interrupt long streams. Make callers retry interrupted requests where appropriate, and keep the work idempotent where possible.

- **Log the gateway error code and rule ID.** Record `X-Ai-Gateway-Error-Code` and, for rate limits, `X-Ai-Gateway-Ratelimit-Id`. These identify gateway failures and the rule that limited a request. Gateway-generated errors before the response starts include the error-code header, except for authentication failures. Provider error responses passed through unchanged do not include this header. Streaming failures can arrive as error events inside an HTTP `200` response. Inspect stream errors and completion events alongside HTTP status and headers.

- **Use Bits Chat to assist troubleshooting.** Ask questions about Datadog telemetry you can access. Include the routing rule, model or provider, time range, and gateway error code. Follow links to the underlying data to verify findings.

For correlation and diagnostics, see [Observe AI Gateway Activity][17] and [AI Gateway error codes][18].

## Data capture, security, and compliance

<div class="alert alert-warning">

**Restrict access to captured content.** Data capture settings control what AI Gateway records; they do not restrict who can read it. Users with access to Agent Observability traces can read captured prompts and responses unless a matching Data Access Control restriction applies. Configure and verify access restrictions for those spans before enabling Full capture for sensitive workloads.

</div>

- **Default to Metadata only and restrict capture changes.** Set the organization data capture default to **Metadata only**, then enable **Full capture** for reviewed workloads with user, explicitly selected team, model, provider, or custom-tag filters. Every selected filter must match. When multiple overrides match, **Metadata only** wins. Restrict `ai_gateway_config_write` and each override's **Edit** permission to approved owners. For full capture, use [Data Access Control][19] to restrict visibility of captured spans.

- **Use Audit Trail to review configuration changes.** Event details vary by operation; do not assume every event includes complete before-and-after values. Use gateway spans in Agent Observability to investigate individual inference calls. Distinguish the authenticated caller's identity from application names and custom tags supplied by the caller.

For capture settings and permissions, see [Security and Data Capture][20]. For configuration auditing, see [Audit Trail][21].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ai_gateway/getting_started/#prerequisites
[2]: /account_management/personal-access-tokens/
[3]: /account_management/service-access-tokens/
[4]: /ai_gateway/access_control/#default-policy
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ai_gateway_routing_rule
[6]: /ai_gateway/providers/
[7]: /ai_gateway/applications/#authenticate-requests
[8]: /ai_gateway/routing/#session-pinning
[9]: /ai_gateway/routing/
[10]: /ai_gateway/access_control/
[11]: https://www.datadoghq.com/blog/how-datadog-saves-money-by-optimizing-ai-usage/#creating-automated-ai-cost-alerts-and-spending-guardrails-with-datadog
[12]: /ai_gateway/spend_controls/#set-budgets
[13]: /ai_gateway/spend_controls/#set-rate-limits
[14]: /ai_gateway/applications/#configure-codex
[15]: /ai_gateway/providers/#use-subscription-providers
[16]: /ai_gateway/applications/
[17]: /ai_gateway/observability/
[18]: /ai_gateway/troubleshooting/#error-codes
[19]: /ai_gateway/security/#restrict-who-can-view-captured-content
[20]: /ai_gateway/security/#configure-data-capture
[21]: /account_management/audit_trail/
[22]: /ai_gateway/routing/#prompt-fingerprints
