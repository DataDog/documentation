---
title: AI Guard Security Signals
further_reading:
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: Documentation
  text: Get Started with AI Guard
- link: /security/detection_rules/
  tag: Documentation
  text: Detection Rules
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard security signals provide visibility into threats and attacks AI Guard detects in your applications. These signals are built on top of [AAP (Application and API Protection) security signals][1] and integrate with Datadog's security monitoring workflows.

## Understand AI Guard signals

Datadog creates AI Guard security signals when it detects a threat based on a configured detection rule. Signals indicating threats such as prompt injection, jailbreaking, or tool misuse appear in the Datadog Security Signals explorer. These signals can provide:

- **Threat detection**: Attack context based on your configured detection rules
- **Action insights**: Blocked or allowed actions information according to your rule settings
- **Rich investigation context**: Attack categories detected, AI Guard evaluation results, and links to related AI Guard spans for comprehensive analysis
- **Custom runbooks**: Custom remediation guidance and response procedures for specific threat scenarios

To help you prioritize your remediation efforts, AI Guard automatically assigns a severity level to every security signal. You can create [custom detection rules](#create-detection-rules) to customize severity levels and define specific security responses.

## Create detection rules

You can create custom detection rules by defining thresholds for when you want to receive notifications; for example, more than 5 `DENY` actions in 10 minutes. When AI Guard evaluations exceed those thresholds, it generates security signals.

To create AI Guard detection rules:
1. In Datadog, go to the [AI Guard detection rule explorer][2], then click **New Rule**.
   {{< img src="security/ai_guard/ai_guard_detection_rules_1.png" alt="AI Guard Detection Rules Explorer" style="width:100%;" >}}
1. Under **Define your Real-time rule**, choose the type of rule to create.
1. Under **Define Search Queries**, define the types of tags you want to create signals for. You can use the following AI Guard attributes to filter and target specific threat patterns:
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
             <li><code>jailbreak</code></li>
             <li><code>indirect-prompt-injection</code></li>
             <li><code>destructive-tool-call</code></li>
             <li><code>denial-of-service-tool-call</code></li>
             <li><code>security-exploit</code></li>
             <li><code>authority-override</code></li>
             <li><code>role-play</code></li>
             <li><code>instruction-override</code></li>
             <li><code>obfuscation</code></li>
             <li><code>system-prompt-extraction</code></li>
             <li><code>data-exfiltration</code></li>
           </ul>
         </td>
       </tr>
       <tr>
         <td><code>@ai_guard.blocked</code></td>
         <td>Filter based on whether an action in the trace was blocked</td>
         <td><code>true</code> or <code>false</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.tools</code></td>
         <td>Filter by specific tool names involved in the evaluation</td>
         <td><code>get_user_profile</code>, <code>user_recent_transactions</code>, etc.</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.categories</code></td>
         <td>Filter by sensitive data categories detected by Sensitive Data Scanner</td>
         <td><code>credentials</code>, <code>email_address</code>, etc.</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.rule_tags</code></td>
         <td>Filter by specific sensitive data rule tags</td>
         <td><code>aws_access_key_id</code>, <code>aws_secret_access_key</code>, <code>claude_api_key</code>, <code>email_address</code>, etc.</td>
       </tr>
     </tbody>
   </table>
1. Under **Define Rule Conditions**:
   1. Define your threshold conditions, if applicable to the type of rule you chose.
   1. Set the severity level of the security signals AI Guard generates with this rule.
   1. Choose who should get notifications for new signals and how often.
   1. Choose security responses to take, such as automated IP or user blocking, and IP flagging.
   1. Configure additional settings, such as updating the same signal instead of creating a new one if AI Guard detects new values within a set amount of time, and decreasing signal severity for non-production environments.
1. Under **Describe your Playbook**, customize the notification and define tags to send with the signals.
1. Click **Save Rule**.

For more comprehensive detection rule capabilities, see [detection rules][3].

## Investigate signals

To view and investigate AI Guard security signals, and correlate them with other security events, you can view signals in two places:
- [Application and API Protection Security Signals explorer][4]
- [Cloud SIEM Security Signals explorer][5]

  In the Cloud SIEM Security Signals explorer, beside the search bar, click the **Filter** icon and select the **App & API Protection** checkbox to view AI Guard signals.

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

Additionally, you can click **Explore in graph view** to see the requests in the conversation graphed out, or view the span in [APM][8] or [LLM Observability][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/security_signals/
[2]: https://app.datadoghq.com/security/ai-guard/settings/detection-rules
[3]: /security/detection_rules/
[4]: https://app.datadoghq.com/security/ai-guard/signals
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://app.datadoghq.com/security/ai-guard/investigate
[7]: /security/ai_guard/setup/#blocking-policy
[8]: /tracing/
[9]: /llm_observability/