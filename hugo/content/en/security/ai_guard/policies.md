---
title: Manage AI Guard Policies
description: Control how AI Guard evaluates and enforces decisions for each service and environment.
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard policies decide what AI Guard identifies as unsafe and what happens to an unsafe request, so you can tune protection for each agent without changing application code.

Start with the default policy, then add custom policies for services and environments that need different settings.

Manage AI Guard policies on the {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} page. Creating and modifying policies requires the {{< ui >}}AI Guard Write{{< /ui >}} permission.

## How AI Guard policies work

Knowing how AI Guard applies policies helps you decide which services need a custom policy.

There are two kinds of policies:

- **Default policy**: Applies to every service and environment unless a custom policy overrides it. The default policy ships in {{< ui >}}Monitor only{{< /ui >}} mode.
- **Custom policies**: Override the default policy for a specific service, a specific environment, or a specific service in a specific environment.

### Policy scope and inheritance

Policy scope and inheritance determine which policy applies to each request, so you can customize protection for specific services and environments.

AI Guard applies policies based on the service and environment of each request: `DD_SERVICE` and `DD_ENV` for agents, or `service` and `env` in `data.attributes.meta` for the HTTP API. Requests without these values use the default policy.

Policies range from least to most specific:

1. Default policy
2. Policy for a specific service in all environments
3. Policy for all services in a specific environment
4. Policy for a specific service in a specific environment

When more than one policy matches a request, AI Guard applies the most specific one.

Custom policies inherit settings from their parent policy, which is the next broader policy that exists. Inherited settings remain in-sync with the parent policy unless you override them. Overridden settings use only the custom policy value. For example, overriding custom rules or individual tool behaviors replaces the parent settings rather than adding to them.

## Policy settings

Policy settings control how AI Guard evaluates and enforces decisions.

Policies include these settings:

- [**Enforcement mode**](#enforcement-mode): Whether AI Guard only reports unsafe requests, or blocks them.
- [**Evaluation sensitivity**](#evaluation-sensitivity): How readily AI Guard flags threats.
- [**Evaluation context**](#evaluation-context): What AI Guard knows about the application.
- [**Sensitive data scanning**](#sensitive-data-scanning): Whether AI Guard scans requests for sensitive data, and whether AI Guard redacts matches.
- [**Tools policies**](#tools-policies): Whether AI Guard evaluates, passes, or blocks tool calls.
- [**Custom rules**](#custom-rules): Keywords and regular expressions that AI Guard always flags as unsafe.

### Enforcement mode

Enforcement mode decides whether a `DENY` action stops a request, so you can observe AI Guard decisions on real traffic before you let AI Guard block anything.

AI Guard returns `ALLOW` or `DENY` for every evaluation and records every evaluation as an AI Guard span, in both modes:

- {{< ui >}}Monitor only{{< /ui >}}: Detect and tag unsafe requests, and never block. The default policy uses {{< ui >}}Monitor only{{< /ui >}}.
- {{< ui >}}Block unsafe{{< /ui >}}: Reject requests judged unsafe.

<div class="alert alert-info">Before you switch a policy to {{< ui >}}Block unsafe{{< /ui >}}, update every agent in the policy scope to handle blocked requests. Otherwise, the agent fails when AI Guard blocks a request. See the <a href="#blocking-policy">Turn on blocking</a> section.</div>

### Evaluation sensitivity

Tuning evaluation sensitivity helps reduce false positives and missed threats, so you can match AI Guard to your risk tolerance for each service or environment.

AI Guard assigns a confidence score to each attack category it detects. Sensitivity sets the minimum confidence AI Guard needs to flag a threat:

- **Lower** values are more aggressive. AI Guard flags threats even at low confidence, surfacing more potential attacks and more false positives.
- **Higher** values are more lenient. AI Guard flags threats only at high confidence, reducing noise but potentially missing some attacks.

Sensitivity is a percentage. The {{< ui >}}Policies{{< /ui >}} page and the policy editor label each value:

| Sensitivity | Label |
| --- | --- |
| 0-24% | {{< ui >}}Aggressive{{< /ui >}} |
| 25-49% | {{< ui >}}Moderate{{< /ui >}} |
| 50% | {{< ui >}}Balanced{{< /ui >}} (Default) |
| 51-74% | {{< ui >}}Lenient{{< /ui >}} |
| 75-100% | {{< ui >}}Very lenient{{< /ui >}} |

Policies can use one sensitivity for every attack category, or a separate sensitivity for each attack category. {{< ui >}}Customize by attack category{{< /ui >}} sets a separate value for each attack category, and the policy shows the label {{< ui >}}Custom{{< /ui >}}. Switching back to one value with {{< ui >}}Switch to general evaluation{{< /ui >}} discards the per-category values, and you can't undo the switch. For a description of each attack category, click {{< ui >}}What does AI Guard detect?{{< /ui >}} on the {{< ui >}}Policies{{< /ui >}} page.

### Evaluation context

Evaluation context describes what an application does and what data the application handles. With evaluation context, AI Guard can tell expected agent behavior from a genuine threat and flag fewer legitimate requests.

For example, a fintech application might describe account queries and transfers as expected operations:

```text
This is a fintech app. Requests to query account balances or initiate transfers are expected and authorized.
```

Evaluation context is limited to 1,000 characters. Evaluation context isn't available for custom policies that target all services in a specific environment.

<div class="alert alert-tip">AI Guard also evaluates the agent's system prompt. A system prompt that describes the purpose of the agent, the data the agent is authorized to read, write, or export, and the tools the agent is authorized to call reduces false positives in the same way as evaluation context. AI Guard ignores instructions in the system prompt that disable or weaken AI Guard checks.</div>

### Sensitive data scanning

Sensitive data scanning finds personal information and secrets in agent conversations, so you can identify and optionally redact sensitive data before it's sent.

Sensitive data scanning is managed with these options:

| Option | Behavior |
| --- | --- |
| {{< ui >}}Disabled{{< /ui >}} | Don't scan requests for sensitive data. (Default) |
| {{< ui >}}Scanning{{< /ui >}} | Scan requests for sensitive data, and return the messages unchanged. |
| {{< ui >}}Scanning and redacting{{< /ui >}} | Scan requests for sensitive data and redact matches. Redaction requires direct SDK calls or the HTTP API. |

Automatic integrations, SDK calls, and the HTTP API report sensitive data findings. Redaction works with direct SDK calls and the HTTP API. AI Guard returns the content with sensitive values redacted, and your code sends the redacted content to the model. Automatic integrations report findings but don't redact messages. Manual integrations don't support sensitive data scanning.

For setup steps and SDK examples, see [Redact Sensitive Data][6].

### Tools policies

Tools policies control how AI Guard handles tool calls, so you can block certain tools and never block tools you trust.

Each policy sets a default behavior for every tool call in the policy scope, and individual tools can override the default behavior:

| Behavior | Description |
| --- | --- |
| {{< ui >}}Evaluate{{< /ui >}} | Send every tool call to AI Guard for evaluation. (Default) |
| {{< ui >}}Pass{{< /ui >}} | Let every tool call through without blocking the call. Tool calls set to {{< ui >}}Pass{{< /ui >}} still count toward usage. |
| {{< ui >}}Block{{< /ui >}} | Reject every tool call in the scope. |
| {{< ui >}}Inherit{{< /ui >}} | Apply the behavior from the parent policy. Available for individual tools in a custom policy. |

Tools with their own behavior appear in the {{< ui >}}Individual policies{{< /ui >}} table. To add a tool, click {{< ui >}}Add{{< /ui >}} in the {{< ui >}}Individual policies{{< /ui >}} table. In {{< ui >}}Add tools{{< /ui >}}, type or select tool names. To add a tool that isn't in the list, type the tool name, then select {{< ui >}}Add option{{< /ui >}}.

A tool set to {{< ui >}}Block{{< /ui >}} adds the `tool-blocked` tag to its evaluations, and a tool set to {{< ui >}}Pass{{< /ui >}} adds the `tool-allowed` tag.

### Custom rules

Custom rules flag messages that contain specific keywords or match a regular expression, so you can guarantee AI Guard flags content you never want an agent to process or produce.

Unlike evaluation sensitivity and evaluation context, custom rules are deterministic: AI Guard always flags a message that matches a rule. Custom rules require an exact match, so custom rules don't detect variations of the content you want to block.

AI Guard checks custom rules against the last message in each evaluation call, including user prompts, assistant responses, tool call arguments, and tool call results. When a message matches a rule, AI Guard returns `DENY` with the `regexp-blocked` attack category, and the `reason` names the rule that matched. Whether AI Guard blocks the request depends on the enforcement mode. See the [Enforcement mode](#enforcement-mode) section.

Custom rules come in two kinds:

- {{< ui >}}Keywords{{< /ui >}}: Matching ignores case and matches whole words only. For example, `confidential` matches `Confidential` but not `confidentiality`. All keywords combined are limited to 1,000 characters.
- {{< ui >}}Regular expressions{{< /ui >}}: Patterns use the [Sensitive Data Scanner regex syntax][7]. Each pattern is limited to 1,000 characters. A regular expression can have a name, which AI Guard displays when the rule matches.

## Edit or create a policy

The default policy protects every onboarded service from the start, so editing the default policy is the fastest way to tune AI Guard.

When a service or environment needs different settings, create a custom policy instead.

1. On the [{{< ui >}}Policies{{< /ui >}}][1] page, open a policy:
   - To edit the default policy, click {{< ui >}}Edit{{< /ui >}} in the {{< ui >}}Default policy{{< /ui >}} header.
   - To edit a custom policy, click the policy in the custom policies list.
   - To create a custom policy, click {{< ui >}}Add Custom Policy{{< /ui >}}. Under {{< ui >}}Scope{{< /ui >}}, select a {{< ui >}}Service{{< /ui >}} and an {{< ui >}}Environment{{< /ui >}}. To cover every service or every environment, select {{< ui >}}All{{< /ui >}} for that value. {{< ui >}}Service{{< /ui >}} and {{< ui >}}Environment{{< /ui >}} can't both be {{< ui >}}All{{< /ui >}}.
1. Change the settings as needed. In a custom policy, override only the settings that differ from the parent policy. For details, see the [Policy settings](#policy-settings) section.

   <div class="alert alert-info">Before you switch a policy to {{< ui >}}Block unsafe{{< /ui >}}, update every agent in the policy scope to handle blocked requests. Otherwise, the agent fails when AI Guard blocks a request. See the <a href="#blocking-policy">Turn on blocking</a> section.</div>

1. (Optional) Test the change in the {{< ui >}}Simulator{{< /ui >}} panel.
1. Save the policy.

   The policy applies to new evaluations within seconds after you save.

## Turn on blocking {#blocking-policy}

Turn on blocking to stop unsafe requests instead of only reporting them.

Switching to {{< ui >}}Block unsafe{{< /ui >}} turns AI Guard decisions into enforcement for every agent in the policy scope. To turn on blocking, first handle blocked requests in the code of each agent, then set {{< ui >}}Enforcement mode{{< /ui >}} to {{< ui >}}Block unsafe{{< /ui >}} in the policy. See the [Edit or create a policy](#edit-or-create-a-policy) section.

How you handle blocked requests depends on the integration method:

- **Automatic integrations and SDK calls**: Catch `AIGuardAbortError` and return a safe response. See the [Handle blocked requests with the SDK](#handle-blocked-requests-with-the-sdk) section.
- **Manual integrations**: Each integration responds to a block differently at each evaluation point. See [Evaluated operations for manual integrations][2].
- **HTTP API**: AI Guard doesn't block requests on its own. When the action is `DENY` and `is_blocking_enabled` is `true`, stop the request and return a safe response. See [Evaluate messages with the HTTP API][3].

### Handle blocked requests with the SDK

When AI Guard blocks a request, the Datadog SDK raises an error, and an agent that doesn't catch the error fails. Catch the error so the agent returns a safe response instead.

With automatic integrations and SDK calls, `AIGuardAbortError` carries the details of the blocked request:

{{< tabs >}}
{{% tab "Python" %}}

The error is `ddtrace.aiguard.AIGuardAbortError`, with the fields `action`, `reason`, `tags`, `tag_probs`, and `sds`.

`AIGuardAbortError` derives from `BaseException`, not `Exception`. Catch `AIGuardAbortError` by name, because `except Exception:` doesn't catch the error.

{{% /tab %}}
{{% tab "Node.js" %}}

The error is `AIGuardAbortError`, with the fields `reason`, `tags`, `tagProbabilities`, and `sds`. The Node.js error has no `action` field.

{{% /tab %}}
{{% tab "Java" %}}

The error is `datadog.trace.api.aiguard.AIGuard.AIGuardAbortError`, with the methods `getAction()`, `getReason()`, `getTags()`, `getTagProbabilities()`, and `getSds()`.

{{% /tab %}}
{{% tab "Ruby" %}}

The error is `Datadog::AIGuard::AIGuardAbortError`, with the fields `action`, `reason`, and `tags`.

{{% /tab %}}
{{< /tabs >}}

To keep one SDK call from raising `AIGuardAbortError` while the rest of the agent follows the policy, use a per-call blocking option. See [Per-call blocking options][4].

### Alert on blocked requests

Monitors on blocked requests tell your team when AI Guard blocks traffic for a service, without someone watching the {{< ui >}}Policies{{< /ui >}} page.

On the {{< ui >}}Policies{{< /ui >}} page, the {{< ui >}}Alerting{{< /ui >}} column has a {{< ui >}}Set up alerting{{< /ui >}} button for each custom policy. The button opens a Trace Analytics monitor with a query for blocked AI Guard spans in the policy scope, such as `@ai_guard.blocked:true service:<SERVICE> env:<ENV>`. Complete the alert conditions and notifications, then save the monitor. The default policy has no {{< ui >}}Set up alerting{{< /ui >}} button.

For other AI Guard monitor queries, see [Alert on AI Guard activity with Datadog Monitors][8].


[1]: https://app.datadoghq.com/security/ai-guard/policies
[2]: /security/ai_guard/setup/manual_integrations/#evaluated-operations
[3]: /security/ai_guard/setup/http_api/#evaluate-messages-with-the-http-api
[4]: /security/ai_guard/setup/sdk/#per-call-blocking-options
[6]: /security/ai_guard/setup/sensitive_data_redaction/
[7]: /security/sensitive_data_scanner/scanning_rules/custom_rules/
[8]: /security/ai_guard/signals/#set-up-datadog-monitors
