---
title: AI Guard Security Signals
private: true
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

## Create detection rules

You can create custom detection rules by defining thresholds for when you want to receive notifications; for example, more than 5 `DENY` actions in 10 minutes. When AI Guard evaluations exceed those thresholds, it generates security signals.

To create AI Guard detection rules:
1. In Datadog, go to the [AI Guard detection rule explorer][2], then click **New Rule**.
   {{< img src="security/ai_guard/ai_guard_detection_rules_1.png" alt="AI Guard Detection Rules Explorer" style="width:100%;" >}}
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
     </tbody>
   </table>
1. Under **Define Rule Conditions**, define your threshold conditions, set severity levels, choose who should get notifications for new signals and how often, and choose security responses to take.
1. Under **Describe your Playbook**, customize the notification and define tags to send with the signals.

For more comprehensive detection rule capabilities, see [detection rules][3].

## Investigate signals

To view and investigate AI Guard security signals, and correlate them with other security events, you can view signals in two places:
- [Application and API Protection Security Signals explorer][4]
- [Cloud SIEM Security Signals explorer][5]

  In the Cloud SIEM Security Signals explorer, beside the search bar, click the **Filter** icon and select the **App & API Protection** checkbox to view AI Guard signals.

The Security Signals explorers allow you to filter, prioritize, and investigate AI Guard signals alongside other application security threats, providing a unified view of your security posture.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/security_signals/
[2]: https://app.datadoghq.com/security/ai-guard/settings/detection-rules
[3]: /security/detection_rules/
[4]: https://app.datadoghq.com/security/ai-guard/signals
[5]: https://app.datadoghq.com/security/siem/signals
