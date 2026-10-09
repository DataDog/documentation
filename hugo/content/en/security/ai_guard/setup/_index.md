---
title: Set Up AI Guard
description: Set up AI Guard to evaluate and block unsafe prompts, responses, and tool calls in your AI agents.
aliases:
  - /security/ai_guard/onboarding/
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Set up AI Guard to start evaluating agent prompts, responses, and tool calls for threats. After setup, the default policy monitors every evaluation, and you can [enable blocking][1] when you're ready.

AI Guard protects each agent as a separate service. Complete these steps for every service you want to protect.

AI Guard connects to AI agents through several integration methods: automatic integrations, manual integrations, or the SDK. The setup steps detailed here are the same for every method. In step 3, you choose the method that fits your agent's language and libraries.

## 1. Check prerequisites {#prerequisites}

Confirm you have the permissions and components AI Guard needs.

<!-- TODO: Confirm that GA organizations don't need a backend feature flag enabled. If they do, add it back here as a requirement. -->

### Permissions

Some setup steps require specific Datadog permissions. An admin might need to create a role with these permissions and assign it to you:

| Permission | ID | Type | Description |
| --- | --- | --- | --- |
| {{< ui >}}AI Guard Evaluate{{< /ui >}} | `ai_guard_evaluate` | Write | Required to call the AI Guard evaluation API and to create an application key with the `ai_guard_evaluate` scope. |
| {{< ui >}}AI Guard View{{< /ui >}} | `ai_guard_view` | Read | Required to view the AI Guard UI, including signals, spans, and read-only settings. |
| {{< ui >}}AI Guard Write{{< /ui >}} | `ai_guard_write` | Write | Required to change AI Guard configuration, such as policies and sensitive data scanning. |
| {{< ui >}}User Access Manage{{< /ui >}} | `user_access_manage` | Write | Required only to restrict access to AI Guard spans with Data Access Control. |

### Datadog Agent and Datadog SDK

Every integration method runs on the Datadog SDK and sends AI Guard data through the Datadog Agent. The Agent must be running and reachable from your application.

AI Guard requires these minimum Datadog SDK versions:

| Language | Datadog SDK | Minimum version |
| --- | --- | --- |
| Python | `dd-trace-py` | 3.19.0. |
| Node.js | `dd-trace-js` | 5.69.0. |
| Java | `dd-trace-java` | 1.54.0. |
| Ruby | `dd-trace-rb` | 2.25.0. |

Some integrations require a later version. Each integration page lists its own requirements.

<div class="alert alert-info">
<p>By default, running the Datadog SDK and the Agent turns on other Datadog products, which are billed separately from AI Guard:</p>
<ul>
<li>The Datadog SDK sends full APM traces. To turn off APM tracing but keep AI Guard, set <code>DD_APM_TRACING_ENABLED=false</code>.</li>
<li>The Agent reports Infrastructure Monitoring data. To turn it off, set <code>DD_INFRASTRUCTURE_MODE=none</code>. This setting requires Agent 7.77.0 or later.</li>
</ul>
<p>AI Guard spans are billed either way.</p>
</div>

## 2. Create API and application keys {#create-keys}

AI Guard authenticates every evaluation with a Datadog API key and application key, so your application needs both before it can send evaluations.

1. Create an API key and an application key. See [API and Application Keys][2].
1. When you add [scopes][3] to the application key, add the `ai_guard_evaluate` scope. The user who creates the application key must have the {{< ui >}}AI Guard Evaluate{{< /ui >}} permission.
1. Store both keys where your application reads its environment variables. Each integration page lists the variables to set.

## 3. Instrument your application {#instrumentation}

Instrument each agent with the integration method that matches its language and libraries, so AI Guard can evaluate LLM traffic.

AI Guard identifies each protected agent by its `DD_SERVICE` and `DD_ENV` values. Use the same service name that the agent reports to APM. Discover reports protection status for that service, and policies apply to that service and environment.

### Find the agent language and libraries

If you don't know which language or LLM libraries an agent uses, check its APM service page.

1. In Datadog, go to {{< ui >}}APM{{< /ui >}} and open the agent's service page.
1. Find the language icon next to the service name.
1. Open the {{< ui >}}operation{{< /ui >}} dropdown. Operations such as `openai.request`, `anthropic.request`, `langchain.request`, or `litellm.request` show which LLM libraries the agent calls.

### Choose an integration method

Choose the first integration method that applies to the agent:

1. If the agent's LLM traffic goes through LiteLLM Proxy, use the [LiteLLM Proxy integration][4].
1. If the agent uses a supported framework or LLM client, use the matching [automatic integration][5] or [manual integration][6].
1. If no integration covers the agent's framework, but the agent is written in Python, Node.js, Java, or Ruby, use the [SDK][7].
1. If none of these apply, use the [HTTP API][8]. HTTP API evaluations don't create spans, so they don't appear in Datadog. Skip the remaining setup steps.

**Supported frameworks**

| Framework or library | Language | Method |
| --- | --- | --- |
| LangChain | Python | Automatic integration. |
| OpenAI SDK | Python, Node.js | Automatic integration. |
| Anthropic SDK | Python, Node.js | Automatic integration. |
| AI SDK | Node.js | Automatic integration. |
| RubyLLM | Ruby | Automatic integration. |
| Amazon Strands | Python | Manual integration. |
| LiteLLM Proxy | Python | Manual integration. |

## 4. Create a retention filter for AI Guard spans {#retention-filter}

Create a retention filter so Datadog keeps every AI Guard span. APM samples spans by default, so without a retention filter, Datadog can drop AI Guard spans and they never appear in AI Guard, even though AI Guard is still evaluating your agent's requests.

Create a [custom retention filter][9] with these settings:

- {{< ui >}}Retention query{{< /ui >}}: `resource_name:ai_guard`.
- {{< ui >}}Span rate{{< /ui >}}: 100%.
- {{< ui >}}Trace rate{{< /ui >}}: 100%.

## 5. (Optional) Limit access to AI Guard spans {#limit-access}

Optionally restrict who can view AI Guard spans, because they can contain sensitive prompts, responses, and tool call data from your agents.

You must have the {{< ui >}}User Access Manage{{< /ui >}} permission to complete this task.

1. In Datadog, go to [Data Access Control][10] and create a restricted dataset scoped to {{< ui >}}APM data{{< /ui >}}.
1. Apply the filter `resource_name:ai_guard`.
1. Grant access to the dataset to specific roles or teams.

## Verify the setup {#verify}

Confirm that AI Guard is evaluating agent traffic.

1. Send several requests through the agent.
1. In Datadog, go to {{< ui >}}Security > AI Guard > Discover{{< /ui >}}.
1. Find the agent service. After its evaluations arrive, the service appears under {{< ui >}}Protected by AI Guard{{< /ui >}}.

### Troubleshooting: Traces don't appear

If expected evaluations don't appear in AI Guard, check these causes in order.

1. **AI Guard isn't enabled.** `DD_AI_GUARD_ENABLED` defaults to `false`. When it's unset, integrations don't evaluate anything, and in Node.js, Java, and Ruby, SDK calls return `ALLOW` without calling AI Guard. Set `DD_AI_GUARD_ENABLED=true`.

   <!-- TODO: Confirm this cause. Replaced "AI Guard does nothing, even if your code calls the SDK," because SDK calls don't fail when AI Guard is disabled: Node.js, Java, and Ruby return `ALLOW`, and Python still calls the API. Node.js and Python were checked in the tracer source; Java and Ruby weren't re-checked. Also confirm that automatic and manual integrations evaluate nothing when the variable is unset. That part is inferred, not checked. -->
1. **The application key is missing the scope.** If evaluation calls fail with a 401 or 403 error, confirm the application key has the `ai_guard_evaluate` scope.
1. **The Agent isn't reachable.** Confirm the Datadog Agent is running and that your application can connect to it.
1. **No retention filter exists.** Confirm a retention filter matches `resource_name:ai_guard` at 100% span and trace rates. See [Create a retention filter for AI Guard spans](#retention-filter).
1. **The service or environment isn't set.** Confirm `DD_SERVICE` and `DD_ENV` are set, so AI Guard can match the agent to its policy and show it in Discover.

To confirm the Datadog SDK reaches AI Guard, check the `datadog.ai_guard.evaluations` metric for your service. If the metric is above zero but spans don't appear, the cause is span retention, not AI Guard.

### Troubleshooting: AI Guard spans are empty

If AI Guard spans appear but don't show evaluated messages, set `DD_TRACE_API_VERSION=v0.4` in your application environment. The Datadog SDK sends AI Guard span content only with trace API version `v0.4`.

<!-- TODO: confirm this still applies to current tracer versions. Source dated June 2026. -->

[1]: /security/ai_guard/policies/
[2]: /account_management/api-app-keys/
[3]: /account_management/api-app-keys/#scopes
[4]: /security/ai_guard/setup/manual_integrations/#litellm-proxy
[5]: /security/ai_guard/setup/automatic_integrations/
[6]: /security/ai_guard/setup/manual_integrations/
[7]: /security/ai_guard/setup/sdk/
[8]: /security/ai_guard/setup/http_api/
[9]: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[10]: https://app.datadoghq.com/organization-settings/data-access-controls/
