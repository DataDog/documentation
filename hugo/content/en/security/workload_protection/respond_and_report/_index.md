---
title: Respond and Report
disable_toc: false
site_support_id: workload_security_active_protection
aliases:
  - /security/workload_protection/respond_and_report/active_protection
  - /security/workload_protection/respond_and_report/automated_response
  - /security/workload_protection/respond_and_report/response
  - /security/workload_protection/respond_and_report/remediation
  - /security/workload_protection/guide/active-protection
  - /security/cloud_security_management/guide/active-protection
further_reading:
- link: "security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules"
  tag: "Documentation"
  text: "Workload Protection detection rules"
- link: "security/workload_protection/getting_started"
  tag: "Documentation"
  text: "Getting started with Workload Protection"
- link: "/security/workload_protection/getting_started/advanced_configuration"
  tag: "Documentation"
  text: "Workload Protection Agent configuration"
- link: "https://learn.datadoghq.com/courses/workload-protection-detect-compromises"
  tag: "Learning Center"
  text: "Detect Host and Container Compromises with Workload Protection"
---

After Workload Protection surfaces runtime risk through Agent events, signals, and findings, **Respond and Report** is where you configure enforcement, drive response, and measure outcomes.

## Enable enforcement

Both **Automated response** and **Response** rely on enforcement in the Agent to kill processes or containers when a matching rule or action is triggered.

### Turn on enforcement in `system-probe`

Both response features rely on `runtime_security_config.enforcement` in `/etc/datadog-agent/system-probe.yaml`. Default values are sufficient in most setups, and both features are enabled by default. For the full parameter reference, see [Workload Protection Agent configuration][4].

In addition to disabling enforcement, you can specify binaries to protect from response actions (none by default) or control which rule sources can trigger response actions (`file` rules and `remote-config`, both enabled by default).

### RBAC for response

Both **Automated response** and **Response** require specific RBAC permissions. The following [roles and permissions][5] are commonly used:

- The `security_monitoring_cws_agent_rules_actions` permission lets users configure Automated response and manually respond to threats.
  - A user with the Datadog Admin role must create a role that includes this permission, then assign that role only to users who manage Automated response or need to run manual Response actions.
- The **Datadog Standard** role lets users create and update custom rules by default, as long as the changes do not modify **protection** settings on the rule. Users with the Standard role cannot enable a disabled rule that includes an Automated response action and cannot use manual Response actions.

## Automated response

Automated response enables you to proactively block and terminate threats identified by the Datadog Agent detection rules using the Workload Protection {{< ui >}}Automated response{{< /ui >}} feature.

Automated response streamlines threat detection and targeted response, resulting in risk reduction, allowing DevSecOps and security teams to tackle evolving threats effectively:

- Security decides which threats warrant an automated action.
- DevOps decides which applications and resources are resilient enough to withstand targeted protection.

The end result is threat detection followed by immediate surgical mitigation against high confidence, true positive attacks.

### Automated response availability

If Automated response is active for an Agent rule, you can see it by looking at the rule:

1. In [Agent Configuration][2], open the rule.
2. In the rule, there is an **Automated Response** action in the list of active actions.

When Automated response applies to a rule that generated a signal, you can see it by doing the following:

1. In [Signals][1], open a signal.
2. In the signal, view **Next Steps**. If available for the matching rule, **Proactively block threats** displays **Automated response enabled**.

### Configure Automated response on Agent rules

By default, all OOTB Agent rules (such as crypto mining) are in an active state. You must configure the Automated response action manually.
You can change the protection option to **Blocking** on an Agent rule and the Agent terminates the corresponding processes instantly.

#### Protection options

You have three options for Agent rules:

- **Inactive state:** The Agent does not monitor for the rule events and does not send detections to the Datadog backend.
- **Active state:** This is the default setting for enabled rules. The Agent monitors for the enabled rule and displays detections in [Signals][1].
- **Active with Automated response state:** The Agent monitors for the enabled rule, terminates the corresponding actions instantly, and displays detections in [Signals][1].

<div class="alert alert-info">Automated response is applied to all threats detected after automated response is enabled. Automated response is not retroactive.</div>

To enable automated response on an Agent rule:

1. In [Agent Configuration][2], open a rule. If there is no Automated Response in the **Agent's actions** section, then Automated response is not available for that rule yet.
2. Click **Edit**.
3. In the Agent rule, in **Add actions for the agent to follow**, check **Automated Response**.

   {{< img src="security/cws/guide/automated-response-activation.png" alt="An Agent rule Protection section displaying the Automated response action" style="width:100%;" >}}
4. In **Link the rule to policies**, validate that the rule is active in at least one policy.
5. Click **Update Agent Rule**.

### Report blocked attack attempts

After Automated response is enabled for an Agent rule, blocked threats appear in [Signals][1].

A signal for a blocked threat contains the messages `SECURITY RESPONSE` and `The process <THREAT NAME> was automatically killed because it exhibited malicious behavior.`:

{{< img src="security/cws/guide/automated-response-signal-messages.png" alt="Signal messages" style="width:100%;" >}}

## Response

If you do not want to automatically kill processes based on rules, you can respond manually after a [Workload Protection signal][6] is triggered.

<div class="alert alert-info">Response and Agent enforcement capabilities depend on your Datadog subscription and organization settings. Contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> if you are unsure whether the feature is enabled for your account.</div>

You can take actions directly from the signal side panel to protect your infrastructure after a signal is generated.

### Enable the Response feature

Complete the following once per environment (hosts or containers running the Workload Protection-enabled Agent).

#### Prerequisites

- Datadog **Agent 7.78** or later on the hosts that should execute response actions.
- [**Remote Configuration**][3] is enabled so response policies can be delivered to the Agent.
- Enforcement is enabled in `system-probe` as described in [Turn on enforcement in `system-probe`](#turn-on-enforcement-in-system-probe).

#### Enable network probes for network isolation

Network isolation uses eBPF **Traffic Control** classifiers and raw packet programs. The required network probes are enabled by default in `event_monitoring_config.network` in `system-probe.yaml`.

### Available actions

The Agent supports the following **enforcement** action types for response workflows:

#### Kill

Terminate a malicious process or all processes in a compromised **container** (cgroup), depending on scope.

#### Network filter (network isolation)

Block network traffic using an eBPF-based filter (for example, drop egress to specific ports). Any isolation can be reverted.

### Action statuses

When a response action runs, the Agent reports a **status** for each action. The table below summarizes the main outcomes for each action type.

| Status | Description | Kill | Network isolation |
| --- | --- | --- | --- |
| `performed` | The action completed successfully. | {{< X >}} | {{< X >}} |
| `partially_performed` | Part of the kill succeeded (for example, some processes terminated) but not all targets could be killed. | {{< X >}} | |
| `removed` | An isolation rule was **removed** from the current ruleset while it was present before—used when **reverting** network isolation. | | {{< X >}} |
| `error` | An error occurred during the response. The action failed and the process or container is still running or not isolated. | {{< X >}} | {{< X >}} |
| `not_triggered` | The Agent did not find the targeted resource. The container or process may have exited before the response action ran. | {{< X >}} | {{< X >}} |

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/workload-protection/agent-rules
[3]: /agent/remote_config/?tab=configurationyamlfile
[4]: /security/workload_protection/getting_started/advanced_configuration
[5]: /account_management/rbac/permissions
[6]: /security/workload_protection/investigate_and_triage/security_signals
[7]: /security/workload_protection/getting_started/kubernetes
