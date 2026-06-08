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
- **Retention query**: `resource_name:ai_guard`
- **Span rate**: 100%
- **Trace rate**: 100%

## 5. Configure AI Guard policies {#configure-policies}

AI Guard provides settings to control how evaluations are enforced, how sensitive threat detection is, and whether sensitive data scanning is enabled.

### Blocking policy {#blocking-policy}

By default, AI Guard evaluates conversations and returns an action (`ALLOW`, `DENY`, or `ABORT`) but does not block requests. To enable blocking so that `DENY` and `ABORT` actions actively prevent unsafe interactions from proceeding, configure the [blocking policy][6] for your services.

You can configure blocking at different levels of granularity, with more specific settings taking priority:
- **Organization-wide**: Apply a default blocking policy to all services and environments.
- **Per environment**: Override the organization default for a specific environment.
- **Per service**: Override the organization default for a specific service.
- **Per service and environment**: Override all of the above for a specific service in a specific environment (for example, enable blocking in production but not in staging).

### Evaluation sensitivity {#evaluation-sensitivity}

AI Guard assigns a confidence score to each threat category it detects (for example, prompt injection or jailbreaking). You can control the minimum confidence score required for AI Guard to flag a threat by going to **Security** > **AI Guard** > **Settings** > [**Evaluation Sensitivity**][7].

Evaluation sensitivity is a value between 0.0 and 1.0, with a default of 0.5.
- A **lower** value **increases** sensitivity: AI Guard flags threats even when the confidence is low, surfacing more potential attacks but also more false positives.
- A **higher** value **decreases** sensitivity: AI Guard only flags threats when the confidence is high, reducing noise but potentially missing some attacks.

### Sensitive data scanning {#sensitive-data-scanning}

AI Guard can detect personally identifiable information (PII) such as email addresses, phone numbers, and SSNs, as well as secrets such as API keys and tokens, in LLM conversations. To enable sensitive data scanning, go to **Security** > **AI Guard** > **Settings** > [**Services**][8], then configure sensitive data detection for your services.

When enabled, AI Guard scans the last message in each evaluation call, including user prompts, assistant responses, tool call arguments, and tool call results. Findings appear on APM traces for visibility. Sensitive data scanning is detection-only — findings do not independently trigger blocking.

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
[8]: https://app.datadoghq.com/security/ai-guard/settings/services
[9]: https://app.datadoghq.com/organization-settings/data-access-controls/
[10]: /security/ai_guard/setup/automatic_integrations/
[11]: /security/ai_guard/setup/manual_integrations/
[12]: /security/ai_guard/setup/sdk/
[13]: /security/ai_guard/setup/http_api/
