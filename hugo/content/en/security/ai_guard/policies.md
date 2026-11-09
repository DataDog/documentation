---
title: Manage AI Guard Policies
description: Control how AI Guard evaluates and enforces decisions for each service and environment.
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard policies decide what AI Guard identifies as unsafe and what happens to an unsafe request, so you can tune protection for each agent without changing application code.

Start with the default policy, then add custom policies for services and environments that need different settings.

Manage AI Guard policies on the AI Guard {{< ui >}}Policies{{< /ui >}} tab. Creating and modifying policies requires the {{< ui >}}AI Guard Write{{< /ui >}} permission.

## How AI Guard policies work

AI Guard includes two kinds of policies:

- **Default policy**: Applies to every service and environment unless a custom policy overrides it. The default policy starts in {{< ui >}}Monitor only{{< /ui >}} mode.
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

Custom policies inherit settings from their parent policy, which is the next broader policy that exists. Inherited settings remain in sync with the parent policy unless you override them. Overridden settings use only the custom policy value. For example, overriding custom rules or individual tool behaviors replaces the parent settings rather than adding to them.

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

Enforcement mode decides whether a `DENY` action stops a request. The default policy starts with enforcement mode set to {{< ui >}}Monitor only{{< /ui >}}, so you can observe AI Guard decisions on real traffic before you let AI Guard block anything.

In both modes, AI Guard returns `ALLOW` or `DENY` for every evaluation. The modes differ in what happens after a `DENY`:

- {{< ui >}}Monitor only{{< /ui >}}: AI Guard detects and tags unsafe requests, but never blocks them.
- {{< ui >}}Block unsafe{{< /ui >}}: AI Guard rejects requests it judges unsafe.

<div class="alert alert-info">Before you switch a policy to {{< ui >}}Block unsafe{{< /ui >}}, update every agent in the policy scope to handle blocked requests. Otherwise, a blocked request can make the agent fail or let the request through. See the <a href="#blocking-policy">Turn on blocking</a> section.</div>

### Evaluation sensitivity

Evaluation sensitivity balances false positives against missed threats, so you can match AI Guard to your risk tolerance for each service or environment.

AI Guard assigns a confidence score to each attack category it detects. Sensitivity sets the minimum confidence AI Guard needs to flag a threat:

- **Lower** values are more aggressive. AI Guard flags threats even at low confidence, surfacing more potential attacks and more false positives.
- **Higher** values are more lenient. AI Guard flags threats only at high confidence, reducing noise but potentially missing some attacks.

Sensitivity is a percentage. The {{< ui >}}Policies{{< /ui >}} tab and the policy editor label each value:

| Sensitivity | Label |
| --- | --- |
| 0-24% | {{< ui >}}Aggressive{{< /ui >}} |
| 25-49% | {{< ui >}}Moderate{{< /ui >}} |
| 50% | {{< ui >}}Balanced{{< /ui >}} (Default) |
| 51-74% | {{< ui >}}Lenient{{< /ui >}} |
| 75-100% | {{< ui >}}Very lenient{{< /ui >}} |

Policies can use one sensitivity for every attack category, or a separate sensitivity for each one. To set a separate value for each attack category, select {{< ui >}}Customize by attack category{{< /ui >}}. The policy then shows the {{< ui >}}Custom{{< /ui >}} label. For a description of each attack category, click {{< ui >}}What does AI Guard detect?{{< /ui >}} on the {{< ui >}}Policies{{< /ui >}} tab.

<div class="alert alert-warning">{{< ui >}}Switch to general evaluation{{< /ui >}} discards the per-category values and returns the policy to one sensitivity for every attack category. You can't undo the switch.</div>

### Evaluation context

Evaluation context describes what an application does and what data the application handles. With evaluation context, AI Guard can distinguish expected agent behavior from a genuine threat and flag fewer false positives.

For example, a fintech application might describe account queries and transfers as expected operations:

{{< code-block lang="text" wrap="true" >}}
This is a fintech app. Requests to query account balances or initiate transfers are expected and authorized.
{{< /code-block >}}

Evaluation context is limited to 1,000 characters. Evaluation context isn't available for custom policies that target all services in a specific environment.

<div class="alert alert-tip">AI Guard also evaluates the agent's system prompt, so a detailed system prompt reduces false positives in the same way as evaluation context. Describe the purpose of the agent, the data the agent is authorized to read, write, or export, and the tools the agent is authorized to call. AI Guard ignores instructions in the system prompt that disable or weaken AI Guard checks.</div>

### Sensitive data scanning

Sensitive data scanning finds personal information and secrets in agent conversations, so you can identify and optionally redact sensitive data before your agent sends it to the model.

The {{< ui >}}Sensitive data scanning{{< /ui >}} setting has these options:

| Option | Description |
| --- | --- |
| {{< ui >}}Disabled{{< /ui >}} | AI Guard doesn't scan requests for sensitive data. (Default) |
| {{< ui >}}Scanning{{< /ui >}} | AI Guard scans requests for sensitive data, reports the findings on the AI Guard span, and returns the messages unchanged. |
| {{< ui >}}Scanning and redacting{{< /ui >}} | AI Guard scans requests for sensitive data and redacts the matches. Redaction requires direct SDK calls or the HTTP API. |

Sensitive data scanning support depends on the integration method:

- **Automatic integrations**: Report sensitive data findings, but don't redact messages.
- **Manual integrations**: Don't support sensitive data scanning.
- **SDK calls**: Report findings and support redaction. The SDK returns the redacted conversation, and your code sends the redacted conversation to the model.
- **HTTP API**: Reports findings and supports redaction. AI Guard returns the replacements in `redaction_replacements`, and your code applies them before sending the content to the model.

For setup steps and SDK examples, see [Redact Sensitive Data][6].

### Tools policies

Tools policies control how AI Guard handles tool calls, so you can block certain tools and always allow tools you trust.

Each policy sets a default behavior for every tool call in the policy scope, and individual tools can override the default behavior:

| Behavior | Description |
| --- | --- |
| {{< ui >}}Evaluate{{< /ui >}} | AI Guard evaluates every tool call. (Default) |
| {{< ui >}}Pass{{< /ui >}} | AI Guard allows every tool call. AI Guard still evaluates tool calls set to {{< ui >}}Pass{{< /ui >}} and reports the results, but never blocks them. Tool calls set to {{< ui >}}Pass{{< /ui >}} still count toward usage. |
| {{< ui >}}Block{{< /ui >}} | AI Guard rejects every tool call in the scope. |
| {{< ui >}}Inherit{{< /ui >}} | The tool uses the behavior from the parent policy. Available for individual tools in a custom policy. |

Tools with their own behavior appear in the {{< ui >}}Individual policies{{< /ui >}} table. To give a tool its own behavior, see the [Set behavior for specific tools](#set-behavior-for-specific-tools) section.

AI Guard adds the `tool-blocked` attack category to evaluations of a tool set to {{< ui >}}Block{{< /ui >}}, and the `tool-allowed` attack category to evaluations of a tool set to {{< ui >}}Pass{{< /ui >}}.

### Custom rules

Custom rules flag messages that contain specific keywords or match a regular expression, so you can guarantee AI Guard flags content you never want an agent to process or produce.

Unlike evaluation sensitivity and evaluation context, custom rules are deterministic: AI Guard always flags a message that matches a rule. Custom rules match only the content you specify, so they don't detect paraphrases or other variations of that content.

AI Guard checks custom rules against the last message in each evaluation call, including user prompts, assistant responses, tool call arguments, and tool call results. When a message matches a rule, AI Guard returns `DENY` with the `regexp-blocked` attack category, and the `reason` names the rule that matched. Whether AI Guard blocks the request depends on the enforcement mode. See the [Enforcement mode](#enforcement-mode) section.

There are two kinds of custom rules:

- {{< ui >}}Keywords{{< /ui >}}: Matching ignores case and matches whole words only. For example, `confidential` matches `Confidential` but not `confidentiality`. All keywords combined are limited to 1,000 characters.
- {{< ui >}}Regular expressions{{< /ui >}}: Patterns use the [Sensitive Data Scanner regex syntax][7]. Each pattern is limited to 1,000 characters. A regular expression can have a name, which AI Guard includes in the `reason` when the rule matches.

## Edit or create a policy

The default policy protects every service you set up from the start, so editing the default policy is the fastest way to tune AI Guard.

When a service or environment needs different settings, create a custom policy instead.

1. On the AI Guard {{< ui >}}Policies{{< /ui >}} tab, open a policy:
   - To edit the default policy, click {{< ui >}}Edit{{< /ui >}} in the {{< ui >}}Default policy{{< /ui >}} header.
   - To edit a custom policy, click the policy in the custom policies list.
   - To create a custom policy, click {{< ui >}}Add Custom Policy{{< /ui >}}. Under {{< ui >}}Scope{{< /ui >}}, select a {{< ui >}}Service{{< /ui >}} and an {{< ui >}}Environment{{< /ui >}}. To cover every service or every environment, select {{< ui >}}All{{< /ui >}} for that value. {{< ui >}}Service{{< /ui >}} and {{< ui >}}Environment{{< /ui >}} can't both be {{< ui >}}All{{< /ui >}}.
1. Change the settings as needed. In a custom policy, override only the settings that differ from the parent policy. For details, see the [Policy settings](#policy-settings) section.

   <div class="alert alert-info">Before you switch a policy to {{< ui >}}Block unsafe{{< /ui >}}, update every agent in the policy scope to handle blocked requests. Otherwise, a blocked request can make the agent fail or let the request through. See the <a href="#blocking-policy">Turn on blocking</a> section.</div>

1. (Optional) Test the change in the {{< ui >}}Simulator{{< /ui >}} panel, which evaluates sample conversations with your unsaved settings.
1. Save the policy. It applies to new evaluations within seconds after you save.

### Set behavior for specific tools

Override the default behavior for specific tools, such as blocking a tool an agent must never call.

For details about tool behavior, see the [Tools policies](#tools-policies) section.

1. In the policy editor, under {{< ui >}}Individual policies{{< /ui >}}, click {{< ui >}}Add{{< /ui >}}.
1. In {{< ui >}}Add tools{{< /ui >}}, type or select tool names. To add a tool that isn't in the list, type the tool name, then select {{< ui >}}Add option{{< /ui >}}.
1. Under {{< ui >}}Behavior{{< /ui >}}, select {{< ui >}}Evaluate{{< /ui >}}, {{< ui >}}Pass{{< /ui >}}, or {{< ui >}}Block{{< /ui >}}, then click {{< ui >}}Add{{< /ui >}}.
1. Save the policy.

## Turn on blocking {#blocking-policy}

Turn on blocking to stop unsafe requests instead of only reporting them.

Switching to {{< ui >}}Block unsafe{{< /ui >}} turns AI Guard decisions into enforcement for every agent in the policy scope.

1. Update each agent in the policy scope to handle blocked requests. See the [Handle blocked requests](#handle-blocked-requests) section.
1. In the policy, set {{< ui >}}Enforcement mode{{< /ui >}} to {{< ui >}}Block unsafe{{< /ui >}}. See the [Edit or create a policy](#edit-or-create-a-policy) section.

### Handle blocked requests

Blocking only works as intended if each agent handles blocked requests, so the agent returns a safe response instead of failing or letting the request through.

Manual integrations and the HTTP API handle blocked requests differently from automatic integrations and SDK calls:

- **Manual integrations**: Each integration hooks into its framework at several evaluation points, and responds to a block differently at each one. See [Evaluated operations for manual integrations][2].
- **HTTP API**: No Datadog SDK sits between your code and AI Guard, so nothing blocks the request for you. When the action is `DENY` and `is_blocking_enabled` is `true`, stop the request and return a safe response. See [Evaluate messages with the HTTP API][3].

With automatic integrations and SDK calls, the Datadog SDK raises `AIGuardAbortError` when AI Guard blocks a request, and an agent that doesn't catch the error fails. Catch the error and return a safe response. `AIGuardAbortError` carries the details of the blocked request:

{{< tabs >}}
{{% tab "Python" %}}

The error is `ddtrace.aiguard.AIGuardAbortError`, with the fields `action`, `reason`, `tags`, `tag_probs`, and `sds`.

<div class="alert alert-warning"><code>AIGuardAbortError</code> derives from <code>BaseException</code>, not <code>Exception</code>. Catch <code>AIGuardAbortError</code> by name, because <code>except Exception:</code> doesn't catch the error.</div>

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

Monitors on blocked requests tell your team when AI Guard blocks traffic for a service, without someone watching the {{< ui >}}Policies{{< /ui >}} tab.

1. On the AI Guard {{< ui >}}Policies{{< /ui >}} tab, in the {{< ui >}}Alerting{{< /ui >}} column, click {{< ui >}}Set up alerting{{< /ui >}} for a custom policy. The button opens a Trace Analytics monitor with a query for blocked AI Guard spans in the policy scope, such as `@ai_guard.blocked:true service:<SERVICE> env:<ENV>`.
1. Complete the alert conditions and notifications, then save the monitor.

The default policy has no {{< ui >}}Set up alerting{{< /ui >}} button. For other AI Guard monitor queries, see [Alert on AI Guard activity with Datadog Monitors][8].


[2]: /security/ai_guard/setup/manual_integrations/#evaluated-operations
[3]: /security/ai_guard/setup/http_api/#evaluate-messages-with-the-http-api
[4]: /security/ai_guard/setup/sdk/#per-call-blocking-options
[6]: /security/ai_guard/sensitive_data_redaction/
[7]: /security/sensitive_data_scanner/scanning_rules/custom_rules/
[8]: /security/ai_guard/signals/#set-up-datadog-monitors
