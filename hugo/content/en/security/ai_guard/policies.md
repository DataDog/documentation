---
title: Manage AI Guard Policies
description: Configure AI Guard policies to control enforcement, custom rules, sensitive data scanning, evaluation sensitivity, and evaluation context for each service.
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

<!-- TODO: Stub page. This content moved here unchanged from the "Configure AI Guard policies" step of the previous Set Up AI Guard page, with only ABORT removed and heading levels adjusted. Rewrite before publishing as a finished page. -->

AI Guard provides settings to control how evaluations are enforced, how sensitive threat detection is, and whether sensitive data scanning is enabled.

## Configure service policies {#service-policies}

On the {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6] page, you can configure policies that determine what actions AI Guard should take when it detects unsafe content. For each policy, you determine:
- [{{< ui >}}Enforcement mode{{< /ui >}}](#blocking-policy): Monitor only, or block unsafe requests
- [{{< ui >}}Custom rules{{< /ui >}}](#custom-rules): Keywords and regular expressions that AI Guard always flags as unsafe
- [{{< ui >}}Sensitive data scanning{{< /ui >}}](#sensitive-data-scanning): Whether AI Guard should scan for and redact sensitive data
- [{{< ui >}}Evaluation context{{< /ui >}}](#evaluation-context): Additional information about the service that AI Guard uses during evaluation to reduce false positives

Beside {{< ui >}}Default policy{{< /ui >}}, click {{< ui >}}Edit{{< /ui >}} to set AI Guard's default behavior. To override the default behavior, click {{< ui >}}Add Service Policy{{< /ui >}}, select the service and environment you want your override to apply to, then configure the more specialized policy.

### Blocking policy {#blocking-policy}

By default, AI Guard evaluates conversations and returns an action (`ALLOW` or `DENY`) but does not block requests. To enable blocking so that `DENY` actions actively prevent unsafe interactions from proceeding, configure the blocking policy for your services.

You can configure blocking at different levels of granularity, with more specific settings taking priority:
- **Organization-wide**: Apply a default blocking policy to all services and environments.
- **Per environment**: Override the organization default for a specific environment.
- **Per service**: Override the organization default for a specific service.
- **Per service and environment**: Override all of the above for a specific service in a specific environment (for example, enable blocking in production but not in staging).

### Custom rules {#custom-rules}

Custom rules flag messages that match a keyword or a regular expression as unsafe. Unlike [evaluation sensitivity](#evaluation-sensitivity) and [evaluation context](#evaluation-context), custom rules are deterministic: a message that matches a rule is always flagged. Custom rules require an exact match, so they don't detect variations of the content you want to block.

AI Guard checks custom rules against the last message in each evaluation call, including user prompts, assistant responses, tool call arguments, and tool call results. When a message matches a rule, AI Guard returns `DENY` with the `regexp-blocked` attack category, and the `reason` names the rule that matched. Whether AI Guard blocks the request depends on the [blocking policy](#blocking-policy).

When you create or edit a policy, add rules under {{< ui >}}Custom Rules{{< /ui >}}:
- {{< ui >}}Keywords{{< /ui >}}: Words or phrases to flag. Matching ignores case and matches whole words only. For example, `confidential` matches `Confidential` but not `confidentiality`. All keywords combined are limited to 1,000 characters.
- {{< ui >}}Regular expressions{{< /ui >}}: Click {{< ui >}}Add an Expression{{< /ui >}}, then enter a name and a pattern. Each pattern is limited to 1,000 characters, and uses the [Sensitive Data Scanner regex syntax][21]. The name is optional, but Datadog recommends it: AI Guard displays it when a rule matches.

As with the [blocking policy](#blocking-policy), custom rules follow the same precedence, with more specific settings taking priority. A policy inherits the custom rules of its parent. To replace them, turn on the {{< ui >}}Overridden{{< /ui >}} toggle. The inherited rules stay in the form, so you can keep, edit, or remove them. The policy does not merge its rules with the parent rules.

### Sensitive data scanning {#sensitive-data-scanning}

AI Guard can detect personally identifiable information (PII) such as email addresses, phone numbers, and SSNs, as well as secrets such as API keys and tokens, in LLM conversations. When you create or edit a policy for a service, you can set sensitive data scanning to {{< ui >}}Disabled{{< /ui >}}, {{< ui >}}Scanning{{< /ui >}}, or {{< ui >}}Scanning and redacting{{< /ui >}}.

When scanning is enabled, AI Guard scans the last message in each evaluation call, including user prompts, assistant responses, tool call arguments, and tool call results. Findings appear on APM traces for visibility. With {{< ui >}}Scanning and redacting{{< /ui >}}, AI Guard also returns the replacement for each sensitive value that a rule mutates. Redaction is supported only with manual SDK integration: see [Sensitive Data Redaction][20] to configure it and apply the replacements.

By default, AI Guard scans for a standard set of secrets, such as AWS keys and Datadog API keys. To customize which [scanning rules][14] AI Guard uses, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][15], where you can enable or disable individual rules, and create scanning groups with custom rules, scoped specifically to AI Guard evaluations.

## Block specific tools

You can configure AI Guard to block requests for specific tools, for specific services and environments. To do so, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Tool Blocklist{{< /ui >}}][8]. Click {{< ui >}}Add Tool Blocking Configuration{{< /ui >}}, select the service, environment, and tool, and choose whether AI Guard should follow the default service policy or block all requests for the tool.

## Evaluation sensitivity {#evaluation-sensitivity}

AI Guard assigns a confidence score to each threat category it detects (for example, prompt injection or jailbreaking). You can control the minimum confidence score required for AI Guard to flag a threat by going to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Evaluation Sensitivity{{< /ui >}}][7].

Evaluation sensitivity is a value between 0.0 and 1.0, with a default of 0.5.
- A **lower** value **increases** sensitivity: AI Guard flags threats even when the confidence is low, surfacing more potential attacks but also more false positives.
- A **higher** value **decreases** sensitivity: AI Guard only flags threats when the confidence is high, reducing noise but potentially missing some attacks.

## Add evaluation context {#evaluation-context}

You can give AI Guard additional context about a service, such as its purpose and the type of data it processes. AI Guard uses this context during evaluation to better distinguish legitimate agent behavior from genuine threats, which helps reduce false positives.

To add evaluation context for a service, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6]. Click {{< ui >}}Edit{{< /ui >}} beside the default policy, or add or edit a service policy, then enter your context in the {{< ui >}}Evaluation context{{< /ui >}} field (up to 1,000 characters). For example:

```text
This is a fintech app. Requests to query account balances or initiate transfers are expected and authorized.
```

As with the [blocking policy](#blocking-policy), evaluation context follows the same precedence, with more specific settings taking priority: organization-wide, per environment, per service, then per service and environment.

Use the [AI Guard Playground][19] to test how evaluation context affects the outcome of an evaluation before applying it to a service. The Playground has its own {{< ui >}}Evaluation Context{{< /ui >}} field that applies only to the conversation you're testing, so you can experiment without changing any service policy. Import an existing payload into the Playground, then add evaluation context to see how it changes the evaluation result.

## Add context with your system prompt {#system-prompt-context}

AI Guard evaluates the full conversation, including your system prompt, when assessing threats. Adding context about your agent's purpose, the data it handles, and the tools it is authorized to use helps AI Guard distinguish legitimate operations from genuine threats—reducing false positives without reducing security coverage.

<div class="alert alert-info">To add this kind of context without modifying your application code, use the <a href="#evaluation-context">Evaluation context</a> field in your service settings instead.</div>

### What to include

In your system prompt, describe:
- **Agent purpose**: The agent's role and intended scope.
- **Authorized data**: The categories of data the agent is expected to read, write, or export.
- **Authorized tools**: The tools and operations the agent is permitted to call.

### Example

A system prompt with minimal context is more likely to result in false positives for legitimate operations:

```text
You are a helpful assistant.
```

A system prompt with explicit context helps AI Guard evaluate intent accurately:

```
You are a financial data analyst assistant for internal employees. You are authorized to:
- Query internal financial databases (read-only) using the `sql_query` tool.
- Export query results to CSV or PDF using the `file_export` tool.
- Retrieve and summarize internal financial reports.

Do not access external systems or process requests unrelated to financial reporting.
```

With this context, AI Guard treats SQL queries and file exports as expected, authorized operations, and is less likely to flag them as data exfiltration or destructive tool calls.

### Limitations

Do not use the system prompt to override AI Guard's security checks or to instruct AI Guard directly. AI Guard evaluates the system prompt as part of the conversation context, and ignores instructions that attempt to disable or weaken its own security checks.

[6]: https://app.datadoghq.com/security/ai-guard/settings/services
[7]: https://app.datadoghq.com/security/ai-guard/settings/evaluation-sensitivity
[8]: https://app.datadoghq.com/security/ai-guard/settings/tools
[14]: /security/sensitive_data_scanner/scanning_rules/
[15]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[19]: https://app.datadoghq.com/security/ai-guard/playground
[20]: /security/ai_guard/setup/sensitive_data_redaction/
[21]: /security/sensitive_data_scanner/scanning_rules/custom_rules/
