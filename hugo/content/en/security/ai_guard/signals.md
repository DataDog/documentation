---
title: Triage and Investigate AI Guard Signals
description: Create detection rules for AI Guard evaluations, review the automatic investigations of the signals they generate, and alert on AI Guard activity.
further_reading:
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: /security/ai_guard/setup/
  tag: Documentation
  text: Set Up AI Guard
- link: /security/detection_rules/
  tag: Documentation
  text: Detection Rules
- link: /security/notifications/rules/
  tag: Documentation
  text: Notification Rules
- link: /account_management/rbac/data_access/
  tag: Documentation
  text: Data Access Control
- link: "https://www.datadoghq.com/blog/detect-when-your-ai-agent-copies-a-self-replicating-prompt-injection/"
  tag: "Blog"
  text: "Detect when your AI agent copies a self-replicating prompt injection"
---

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard security signals provide visibility into threats and attacks AI Guard detects in your applications. These signals are built on top of [AAP (Application and API Protection) security signals][1] and integrate with Datadog's security monitoring workflows.

## Understand AI Guard signals

Datadog creates AI Guard security signals when it detects a threat based on a configured detection rule. Signals indicating threats such as prompt injection, jailbreaking, or tool misuse appear in the Datadog Security Signals explorer. These signals can provide:

- **Threat detection**: Attack context based on your configured detection rules
- **Action insights**: Blocked or allowed actions information according to your rule settings
- **Rich investigation context**: Attack categories detected, AI Guard evaluation results, and links to related AI Guard spans for comprehensive analysis
- **Custom runbooks**: Custom remediation guidance and response procedures for specific threat scenarios

To help you prioritize your remediation efforts, AI Guard automatically assigns a severity level to every security signal. You can create [custom detection rules](#create-detection-rules) to customize severity levels and define specific security responses.

Datadog automatically investigates the signals created by out-of-the-box AI Guard detection rules, and writes a verdict, severity, and title onto each signal. See [Dynamic signals](#dynamic-signals).

## Dynamic signals {#dynamic-signals}

With dynamic signals, an AI agent investigates each signal created by an out-of-the-box AI Guard detection rule. The agent reviews the full conversation behind the signal and decides whether it is a real attack. It then writes its verdict, severity, title, and evidence onto the signal. You can then triage, filter, and get notified based on the result of the investigation instead of the rule match alone.

Dynamic signals don't change AI Guard evaluations or blocking: the investigation runs after the signal is created and only updates the signal.

### How dynamic signals work

1. An out-of-the-box AI Guard detection rule creates a signal.
1. The investigation collects the AI Guard evaluations of the conversations that triggered the signal, from the same service and environment. When your application sets `usr.session_id` on AI Guard evaluations, the investigation uses it to link the turns of a conversation.
1. The investigation reads metadata from the related APM spans, such as the operation, resource, duration, status, and errors.
1. Datadog updates the signal with the investigation result.
1. Datadog evaluates your [notification rules](#notify-on-investigated-signals) again for the updated signal.

### Which signals are investigated

- Datadog investigates signals created by out-of-the-box AI Guard detection rules, which are the Datadog-managed rules in the [AI Guard detection rule explorer][2]. Signals from custom rules, including cloned out-of-the-box rules, are not investigated.
- Each signal is investigated once, automatically.
- Signals older than 30 days can't be investigated, because their spans are no longer retained.
- Datadog runs up to 50 investigations per organization per clock hour. Signals over this limit are not investigated, and their investigation status shows the reason. To increase the limit, contact [Datadog support][13].

### Investigation results

Each investigation produces the following result, shown in the signal side panel:

| Field | Description |
|---|---|
| Verdict | `attack`: the conversation contains an attack against the AI application.<br>`false_positive`: the activity is benign.<br>`inconclusive`: the available evidence is not enough to decide. |
| Confidence | `low`, `medium`, or `high`, based on the strength and completeness of the evidence. Not set for `inconclusive` verdicts. |
| Severity | The security impact of the incident. See [Severity](#severity). Not set for `false_positive` verdicts. |
| Title | A short description of what happened, in 12 words or fewer. |
| Summary | What the signal contains, followed by the outcome, the data exposed (if any), and the risk. |
| Classification | The [MITRE ATLAS][14] tactic and techniques that match the attack. |
| Outcome | Whether the attack succeeded, whether the model complied with the malicious instructions, whether AI Guard blocked it, and how far the attack progressed: attempted, observed, or confirmed. |
| Injection | Whether a prompt injection is present, its type (direct, indirect, triggered, jailbreak, or other), where it entered the conversation, and excerpts of the injected content. |
| Data exposure | The types of data exposed, where they came from, and where they were sent. |
| Risk | Why the activity is harmful and how an attacker benefits. |
| Evidence | Up to five points from the conversation that support the verdict. |
| Coverage | How many messages the investigation reviewed, whether it saw the full conversation, and any gaps in the evidence. |

Sensitive data detected in the conversation is redacted from the result. Injection excerpts contain attacker-controlled text quoted from the conversation.

#### Severity

The investigation sets the severity with the following rules, applied in order:

| Severity | When |
|---|---|
| None | The verdict is `false_positive`. |
| `info` | The verdict is `inconclusive`, or the verdict is `attack` with `low` confidence. |
| `critical` | The attack succeeded, and it goes beyond reconnaissance or discovery. |
| `high` | The attack goes beyond reconnaissance or discovery and did not succeed, but the model complied with the malicious instructions and AI Guard did not block it. |
| `medium` | The attack goes beyond reconnaissance or discovery and did not succeed, because the model did not comply or AI Guard blocked it. Also applies to reconnaissance or discovery that disclosed the probed information. |
| `low` | Any other attack, such as reconnaissance or discovery that did not succeed. |

An AI Guard `DENY` or `ABORT` action counts as a block only when the service enforces it with a [blocking policy][7].

### Signal severity and title

When the investigation completes, Datadog replaces the signal's severity and title with the investigation severity and title, including in notifications. The signal keeps these values when it receives later events.

- The rule severity and title are kept in `@workflow.ai_guard.original_severity` and `@workflow.ai_guard.original_title` when the investigation changes them.
- A `false_positive` verdict keeps the rule severity.
- The update is not a triage change: it doesn't change the signal's triage state or assignee.

### Signal attributes

The investigation adds the following attributes to the signal. You can use them in the Signals explorer search and in [notification rules](#notify-on-investigated-signals).

| Attribute | Description | Faceted |
|---|---|---|
| `@workflow.ai_guard.investigated` | `true` when an investigation updated the signal. | Yes |
| `@workflow.ai_guard.verdict` | `attack`, `false_positive`, or `inconclusive`. | Yes |
| `@workflow.ai_guard.confidence` | `low`, `medium`, or `high`. Empty for `inconclusive` verdicts. | Yes |
| `@workflow.ai_guard.severity` | `info`, `low`, `medium`, `high`, or `critical`. Empty for `false_positive` verdicts. | No |
| `@workflow.ai_guard.title` | The investigation title. | No |
| `@workflow.ai_guard.original_severity` | The rule severity, when the investigation changed the signal severity. | No |
| `@workflow.ai_guard.original_title` | The rule title, when the investigation changed the signal title. | No |

### View investigations

In the [AI Guard Signals explorer][4], signals with a `false_positive` verdict are hidden by default. To show them, or to filter on another verdict, use the verdict facet in the facet panel.

<!-- TODO: add screenshot security/ai_guard/dynamic_signals_explorer.png: AI Guard Signals explorer with the verdict facet -->

Click a signal to open its side panel. The investigation section shows the status of the investigation and, when it completes, its result:

- **In progress**: the investigation is waiting for the conversation to complete or is running.
- **Completed**: the result is available, and the signal is updated.
- **Failed**: the investigation could not complete. The section shows the reason. See [Troubleshoot investigations](#troubleshoot-investigations).

<!-- TODO: add screenshot security/ai_guard/dynamic_signals_side_panel.png: signal side panel with a completed investigation -->

### Notify on investigated signals

After an investigation updates a signal, Datadog evaluates your notification rules again, and every rule that matches the updated signal sends a notification. Use the investigation attributes to get notified only about the signals that matter.

To get notified when an investigation finds an attack:

1. On the [Notification Rules][15] page, click {{< ui >}}New Notification Rule{{< /ui >}}.
1. Enter a **Name** for the notification rule.
1. Select **Signal** as the source type.
1. Select all severity levels. After the investigation, the signal severity is the investigation severity.
1. In the query, enter `ai_guard_rule:true @workflow.ai_guard.verdict:attack`.
   - To exclude low-confidence results, add `@workflow.ai_guard.confidence:(medium OR high)`.
   - To get notified only about the most severe attacks, select the `high` and `critical` severity levels instead of all levels.
1. Under **Destination**, add the recipients.
1. Click {{< ui >}}Save{{< /ui >}}.

<!-- TODO: add screenshot security/ai_guard/dynamic_signals_notification_rule.png: notification rule with the verdict query -->

For more information, see [Notification Rules][16].

**Notes**:
- A notification rule on `ai_guard_rule:true` alone notifies twice for each signal: when the signal is created, and again after the investigation.
- Datadog sends notifications after the investigation only for signals that are still active. Automatic investigations run while the signal is still active.
- [Suppression rules][17] still apply.

### Troubleshoot investigations

When an investigation fails, the investigation section of the signal side panel shows one of the following reasons:

| Reason | Cause | Resolution |
|---|---|---|
| This signal is older than the 30-day span retention, so its evidence is no longer available. | The signal's spans have expired. | No action is possible for this signal. |
| No spans for this signal are visible to the investigation. They may be restricted by data access controls. | The spans of the AI application are in a Restricted Dataset that AI Guard can't access. | Grant AI Guard access to the spans. See [Spans restricted by Data Access Control](#spans-restricted-by-data-access-control). |
| The signal could not be found. | The signal was not available when the investigation ran. | No action is needed. If the issue persists, contact [Datadog support][13]. |
| Not all of the signal's evidence could be retrieved. | The spans of the conversation could not be fully processed. | If the issue persists, contact [Datadog support][13]. |
| Too many investigations were requested for this organization in the last hour. | The organization reached the limit of 50 investigations per clock hour. | The limit resets at the start of each hour. To increase the limit, contact [Datadog support][13]. |
| The investigation timed out. | The investigation did not complete in time. | If the issue persists, contact [Datadog support][13]. |
| An internal error has occurred. | An unexpected error occurred. | If the issue persists, contact [Datadog support][13]. |

#### Spans restricted by Data Access Control

The investigation reads spans as the **AI Guard** user of your organization. If you use [Data Access Control][18], AI Guard can't read spans in a Restricted Dataset unless you grant it access. The investigation then fails with the reason `No spans for this signal are visible to the investigation. They may be restricted by data access controls.`

To grant AI Guard access to a Restricted Dataset:

1. Log in as a user with the Datadog Admin role, or with a role that has the `user_access_manage` permission.
1. In Organization Settings, go to [Access Control][19].
1. In the {{< ui >}}Restricted Datasets{{< /ui >}} section, open the Restricted Dataset that contains the APM traces of your AI application.
1. Under {{< ui >}}Designate Users with Access{{< /ui >}}, add **AI Guard**. AI Guard is listed under {{< ui >}}Agents and Automated Processes{{< /ui >}}. If it isn't listed, type `AI Guard` in the selector to search for it.
1. Save the policy.
1. Repeat for each Restricted Dataset that contains the APM traces of your AI applications.

<!-- TODO: add screenshot security/ai_guard/dynamic_signals_dac_agent.png: Designate Users with Access selector with AI Guard under Agents and Automated Processes -->

If [data not in a Restricted Dataset][20] is {{< ui >}}Restricted{{< /ui >}} for APM traces, AI Guard also needs access to that data. Add AI Guard to a Restricted Dataset that covers these spans, or grant it [unrestricted access][21] to APM traces. To grant unrestricted access, create a policy in the {{< ui >}}Unrestricted User Groups{{< /ui >}} tab and add AI Guard under {{< ui >}}Designate User Groups{{< /ui >}}. If AI Guard isn't listed, search for it.

<div class="alert alert-warning">Unrestricted access lets AI Guard read all APM traces, including traces in Restricted Datasets created later. Prefer adding AI Guard to the specific Restricted Datasets it needs.</div>

<div class="alert alert-warning">Users who can view AI Guard signals can view the investigation results, including conversation excerpts. This applies even if they can't access the underlying spans.</div>

The change applies to signals created after you save the policy. Signals that already failed are not investigated again.

### Data access

Investigations run as the **AI Guard** managed user of your organization, which has the following permissions:

- `apm_read`, to read the spans of the conversation
- `security_monitoring_signals_read` and `security_monitoring_signals_write`, to read the signal and write the investigation result
- `security_monitoring_dataset_read`

Actions taken by AI Guard appear in [Audit Trail][22].

## Create detection rules

You can create custom detection rules by defining thresholds for when you want to receive notifications; for example, more than 5 `DENY` actions in 10 minutes. When AI Guard evaluations exceed those thresholds, it generates security signals.

To create AI Guard detection rules:
1. In Datadog, go to the [AI Guard detection rule explorer][2], then click {{< ui >}}New Rule{{< /ui >}}.
   {{< img src="security/ai_guard/ai_guard_detection_rules_1.png" alt="AI Guard Detection Rules Explorer" style="width:100%;" >}}
1. Under {{< ui >}}Define your Real-time rule{{< /ui >}}, choose the type of rule to create.
1. Under {{< ui >}}Define Search Queries{{< /ui >}}, define the types of tags you want to create signals for. You can use the following AI Guard attributes to filter and target specific threat patterns:
   <table>
     <thead>
       <tr>
         <th>Tag</th>
         <th>Description</th>
         <th>Possible values</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><code>@ai_guard.action</code></td>
         <td>Filter by AI Guard's evaluation result</td>
         <td><code>ALLOW</code> or <code>DENY</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.attack_categories</code></td>
         <td>Target specific attack types</td>
         <td>
           <ul>
             <li><a href="/security/ai_guard/#attack-categories">Attack category tags</a></li>
             <li><code>tool-blocked</code> and <code>tool-allowed</code>, added by tool policies</li>
             <li><code>regexp-blocked</code>, added by custom rules</li>
           </ul>
         </td>
       </tr>
       <tr>
         <td><code>@ai_guard.blocked</code></td>
         <td>Filter based on whether an action in the trace was blocked</td>
         <td><code>true</code> or <code>false</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.tool_name</code></td>
         <td>Filter by specific tool names involved in the evaluation</td>
         <td><code>get_user_profile</code>, <code>user_recent_transactions</code>, etc.</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.category</code></td>
         <td>Filter by sensitive data categories detected by Sensitive Data Scanner</td>
         <td><code>credentials</code>, <code>email_address</code>, etc.</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.rule_tag</code></td>
         <td>Filter by specific sensitive data rule tags</td>
         <td><code>aws_access_key_id</code>, <code>aws_secret_access_key</code>, <code>claude_api_key</code>, <code>email_address</code>, etc.</td>
       </tr>
     </tbody>
   </table>
1. Under {{< ui >}}Define Rule Conditions{{< /ui >}}:
   1. Define your threshold conditions, if applicable to the type of rule you chose.
   1. Set the severity level of the security signals AI Guard generates with this rule.
   1. Choose who should get notifications for new signals and how often.
   1. Choose security responses to take, such as automated IP or user blocking, and IP flagging.
   1. Configure additional settings, such as updating the same signal instead of creating a new one if AI Guard detects new values within a set amount of time, and decreasing signal severity for non-production environments.
1. Under {{< ui >}}Describe your Playbook{{< /ui >}}, customize the notification and define tags to send with the signals.
1. Click {{< ui >}}Save Rule{{< /ui >}}.

For more comprehensive detection rule capabilities, see [detection rules][3].

**Note**: Signals created by custom detection rules are not investigated by [dynamic signals](#dynamic-signals).

## Investigate signals

To view and investigate AI Guard security signals, and correlate them with other security events, you can view signals in two places:
- [Application and API Protection Security Signals explorer][4]
- [Cloud SIEM Security Signals explorer][5]

  In the Cloud SIEM Security Signals explorer, beside the search bar, click the {{< ui >}}Filter{{< /ui >}} icon and select the {{< ui >}}App & API Protection{{< /ui >}} checkbox to view AI Guard signals.

The Security Signals explorers allow you to filter, prioritize, and investigate AI Guard signals alongside other application security threats, providing a unified view of your security posture.

You can create or link cases directly from an AI Guard security signal, and click any signal to open a side panel containing additional context.

## Get additional context with spans

AI Guard spans offer detailed information about the assessments it made and why. When you open a span from the [Investigate][6] page or from a signal, you can get context on the specific prompts your AI agent used, read exact inputs and outputs, and see any attack categories that contributed to AI Guard assessing a tool call as unsafe.

### Get context on a span

When you click on a span in the explorer, you can see:
- The service and environment the requests occurred in
- The [blocking policy][7] configured for that service, which determines whether AI Guard blocks unsafe requests, or detects and tags them without blocking them
- The user who interacted with the agent
- The specific inputs and outputs from your agent, and whether they came from LLMs or external tools
- Whether AI Guard assessed each request as safe or unsafe
- Whether AI Guard blocked the request
- If AI Guard assessed the call as unsafe, which attack categories it included
- Whether the request included sensitive data, and if so, what type of sensitive data
- Additional tags, which you can use to filter spans in the explorer

Additionally, you can click {{< ui >}}Explore in graph view{{< /ui >}} to see the requests in the conversation graphed out, or view the span in [APM][8] or [Agent Observability][9].

## Alert on AI Guard activity with Datadog Monitors {#set-up-datadog-monitors}

To create monitors for alerting at certain thresholds, you can use [Datadog Monitors][10]. You can monitor AI Guard evaluations with either APM traces or with metrics. For both types of monitor, you should set your alert conditions, name for the alert, and define notifications; Datadog recommends using Slack.

### APM monitor

Follow the instructions to create an [APM monitor][11], with its scope set to {{< ui >}}Trace Analytics{{< /ui >}}.

- To monitor denied evaluations, use the query `@ai_guard.action:DENY`.
- To monitor blocked traffic, use the query `@ai_guard.blocked:true`.

### Metric monitor

Follow the instructions to create a [metric monitor][12].

- To monitor denied evaluations, use the metric `datadog.ai_guard.evaluations` with the tag `action:deny`.
- To monitor blocked traffic, use the metric `datadog.ai_guard.evaluations` with the tag `blocking_enabled:true`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/security_signals/
[2]: https://app.datadoghq.com/security/ai-guard/settings/detection-rules
[3]: /security/detection_rules/
[4]: https://app.datadoghq.com/security/ai-guard/signals
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://app.datadoghq.com/security/ai-guard/investigate
[7]: /security/ai_guard/policies/#blocking-policy
[8]: /tracing/
[9]: /llm_observability/
[10]: /monitors/
[11]: /monitors/types/apm/?tab=traceanalytics
[12]: /monitors/types/metric/
[13]: /help/
[14]: https://atlas.mitre.org/
[15]: https://app.datadoghq.com/security/configuration/notification-rules
[16]: /security/notifications/rules/
[17]: /security/suppressions/
[18]: /account_management/rbac/data_access/
[19]: https://app.datadoghq.com/organization-settings/access-controls
[20]: /account_management/rbac/data_access/#strict-mode
[21]: /account_management/rbac/data_access/#unrestricted-user-groups
[22]: /account_management/audit_trail/
