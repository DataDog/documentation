---
title: Set Up AI Guard
further_reading:
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: Documentation
  text: Get Started with AI Guard
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Complete the following steps to set up AI Guard:

## 1. Check prerequisites

Before you set up AI Guard, ensure you have everything you need:
- While AI Guard is in Preview, Datadog needs to enable a backend feature flag for each organization in the Preview. Contact [Datadog support][1] with one or more Datadog organization names and regions to enable it.
- Certain setup steps require specific Datadog permissions. An admin may need to create a new role with the required permissions and assign it to you:
  | Permission                                    | Type  | Description                                                                                                                                                                                                     |
  |-----------------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | **AI Guard Evaluate** (`ai_guard_evaluate`)   | Write | Required to call the AI Guard evaluate API and to create an application key with the `ai_guard_evaluate` scope.                                                                                                 |
  | **AI Guard View** (`ai_guard_view`)           | Read  | Required to view the AI Guard UI, including signals, spans, and read-only settings (service blocking policies, evaluation sensitivity, tool policies, tool allowlist). Also required to report false positives. |
  | **AI Guard Write** (`ai_guard_write`)         | Write | Required to modify AI Guard configuration, including blocking policies, sensitive data scanning, tool policies, tool blocking, tool allowlist, and evaluation sensitivity thresholds.                           |
  | **User Access Manage** (`user_access_manage`) | Write | Required to create a restricted dataset that [limits access to AI Guard spans](#limit-access) with Data Access Control.                                                                                         |

### Usage limits

The AI Guard evaluator API has the following usage limits:
- 1 billion tokens evaluated per day.
- 12,000 requests per minute, per IP.

If you exceed these limits, or expect to exceed them soon, contact [Datadog support][1] to discuss possible solutions.

## 2. Create API and application keys {#create-keys}

To use AI Guard, you need at least one API key and one application key set in your Agent services, usually using environment variables. Follow the instructions at [API and Application Keys][2] to create both.

When adding [scopes][3] for the **application key**, add the `ai_guard_evaluate` scope. The user creating the application key must have the [AI Guard Evaluate permission](#1-check-prerequisites).

## 3. Instrument your application {#instrumentation}

Choose an instrumentation approach based on your framework and language:

### SDK

The [AI Guard SDK][12] provides language-specific libraries (Python, JavaScript, Java, Ruby) to call the AI Guard REST API and monitor activity in real time in Datadog.

### Automatic integrations

[Automatic integrations][10] provide out-of-the-box AI Guard protection for supported frameworks. When you run your application with the Datadog SDK, AI Guard evaluations are automatically performed without requiring any code changes.

| Language   | Supported Frameworks |
|------------|---------------------|
| Python     | LangChain           |
| Node.js    | AI SDK              |

### Manual integrations

[Manual integrations][11] require additional configuration to enable AI Guard protection for supported frameworks.

| Language   | Supported Frameworks        |
|------------|-----------------------------|
| Python     | Amazon Strands, LiteLLM Proxy |

### HTTP API

The [AI Guard HTTP API][13] lets you call the AI Guard JSON:API endpoint directly with any HTTP client, for languages or environments the SDK doesn't cover.

## 4. Create a custom retention filter {#retention-filter}

To view AI Guard evaluations in Datadog, create a custom [retention filter][5] for AI Guard-generated spans. Follow the linked instructions to create a retention filter with the following settings:
- {{< ui >}}Retention query{{< /ui >}}: `resource_name:ai_guard`
- {{< ui >}}Span rate{{< /ui >}}: 100%
- {{< ui >}}Trace rate{{< /ui >}}: 100%

## 5. Configure AI Guard policies {#configure-policies}

AI Guard provides settings to control how evaluations are enforced, how sensitive threat detection is, and whether sensitive data scanning is enabled.

### Configure service policies {#service-policies}

On the {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6] page, you can configure policies that determine what actions AI Guard should take when it detects unsafe content. For each policy, you determine:
- [{{< ui >}}Enforcement mode{{< /ui >}}](#blocking-policy): Monitor only, or block unsafe requests
- [{{< ui >}}Sensitive data detection{{< /ui >}}](#sensitive-data-scanning): Whether AI Guard should flag sensitive data when it detects it
- [{{< ui >}}Evaluation context{{< /ui >}}](#evaluation-context): Additional information about the service that AI Guard uses during evaluation to reduce false positives

Beside {{< ui >}}Default policy{{< /ui >}}, click {{< ui >}}Edit{{< /ui >}} to set AI Guard's default behavior. To override the default behavior, click {{< ui >}}Add Service Policy{{< /ui >}}, select the service and environment you want your override to apply to, then configure the more specialized policy.

#### Blocking policy {#blocking-policy}

By default, AI Guard evaluates conversations and returns an action (`ALLOW`, `DENY`, or `ABORT`) but does not block requests. To enable blocking so that `DENY` and `ABORT` actions actively prevent unsafe interactions from proceeding, configure the blocking policy for your services.

You can configure blocking at different levels of granularity, with more specific settings taking priority:
- **Organization-wide**: Apply a default blocking policy to all services and environments.
- **Per environment**: Override the organization default for a specific environment.
- **Per service**: Override the organization default for a specific service.
- **Per service and environment**: Override all of the above for a specific service in a specific environment (for example, enable blocking in production but not in staging).

#### Sensitive data scanning {#sensitive-data-scanning}

AI Guard can detect personally identifiable information (PII) such as email addresses, phone numbers, and SSNs, as well as secrets such as API keys and tokens, in LLM conversations. When you create or edit a policy for a service, you can choose to enable or disable sensitive data detection.

When enabled, AI Guard scans the last message in each evaluation call, including user prompts, assistant responses, tool call arguments, and tool call results. Findings appear on APM traces for visibility. Sensitive data scanning is detection-only; findings do not independently trigger blocking.

By default, AI Guard scans for a standard set of secrets, such as AWS keys and Datadog API keys. To customize which [scanning rules][14] AI Guard uses, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][15], where you can enable or disable individual rules, and create scanning groups with custom rules, scoped specifically to AI Guard evaluations.

### Block specific tools

You can configure AI Guard to block requests for specific tools, for specific services and environments. To do so, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Tool Blocklist{{< /ui >}}][8]. Click {{< ui >}}Add Tool Blocking Configuration{{< /ui >}}, select the service, environment, and tool, and choose whether AI Guard should follow the default service policy or block all requests for the tool.

### Evaluation sensitivity {#evaluation-sensitivity}

AI Guard assigns a confidence score to each threat category it detects (for example, prompt injection or jailbreaking). You can control the minimum confidence score required for AI Guard to flag a threat by going to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Evaluation Sensitivity{{< /ui >}}][7].

Evaluation sensitivity is a value between 0.0 and 1.0, with a default of 0.5.
- A **lower** value **increases** sensitivity: AI Guard flags threats even when the confidence is low, surfacing more potential attacks but also more false positives.
- A **higher** value **decreases** sensitivity: AI Guard only flags threats when the confidence is high, reducing noise but potentially missing some attacks.

### Add evaluation context {#evaluation-context}

You can give AI Guard additional context about a service, such as its purpose and the type of data it processes. AI Guard uses this context during evaluation to better distinguish legitimate agent behavior from genuine threats, which helps reduce false positives.

To add evaluation context for a service, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6]. Click {{< ui >}}Edit{{< /ui >}} beside the default policy, or add or edit a service policy, then enter your context in the {{< ui >}}Evaluation context{{< /ui >}} field (up to 1,000 characters). For example:

```text
This is a fintech app. Requests to query account balances or initiate transfers are expected and authorized.
```

As with the [blocking policy](#blocking-policy), evaluation context follows the same precedence, with more specific settings taking priority: organization-wide, per environment, per service, then per service and environment.

Use the [AI Guard Playground][19] to test how evaluation context affects the outcome of an evaluation before applying it to a service. The Playground has its own {{< ui >}}Evaluation Context{{< /ui >}} field that applies only to the conversation you're testing, so you can experiment without changing any service policy. Import an existing payload into the Playground, then add evaluation context to see how it changes the evaluation result.

### Add context with your system prompt {#system-prompt-context}

AI Guard evaluates the full conversation, including your system prompt, when assessing threats. Adding context about your agent's purpose, the data it handles, and the tools it is authorized to use helps AI Guard distinguish legitimate operations from genuine threats—reducing false positives without reducing security coverage.

<div class="alert alert-info">To add this kind of context without modifying your application code, use the <a href="#evaluation-context">Evaluation context</a> field in your service settings instead.</div>

#### What to include

In your system prompt, describe:
- **Agent purpose**: The agent's role and intended scope.
- **Authorized data**: The categories of data the agent is expected to read, write, or export.
- **Authorized tools**: The tools and operations the agent is permitted to call.

#### Example

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

#### Limitations

Do not use the system prompt to override AI Guard's security checks or to instruct AI Guard directly. AI Guard evaluates the system prompt as part of the conversation context, and ignores instructions that attempt to disable or weaken its own security checks.

## 6. (Optional) Limit access to AI Guard spans {#limit-access}

To restrict access to AI Guard spans for specific users, you can use [Data Access Control][9]. Follow the linked instructions to create a restricted dataset, scoped to **APM data**, with the `resource_name:ai_guard` filter applied. Then, you can grant access to the dataset to specific roles or teams.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /account_management/api-app-keys/
[3]: /account_management/api-app-keys/#scopes
[4]: /agent/?tab=Host-based
[5]: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[6]: https://app.datadoghq.com/security/ai-guard/settings/services
[7]: https://app.datadoghq.com/security/ai-guard/settings/evaluation-sensitivity
[8]: https://app.datadoghq.com/security/ai-guard/settings/tools
[9]: https://app.datadoghq.com/organization-settings/data-access-controls/
[10]: /security/ai_guard/setup/automatic_integrations/
[11]: /security/ai_guard/setup/manual_integrations/
[12]: /security/ai_guard/setup/sdk/
[13]: /security/ai_guard/setup/http_api/
[14]: /security/sensitive_data_scanner/scanning_rules/
[15]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[19]: https://app.datadoghq.com/security/ai-guard/playground
