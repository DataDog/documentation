---
title: Respond to Threats
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
- link: "/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules"
  tag: "Documentation"
  text: "Workload Protection detection rules"
- link: "/security/workload_protection/setup"
  tag: "Documentation"
  text: "Setting up Workload Protection"
- link: "/security/workload_protection/setup/advanced_configuration"
  tag: "Documentation"
  text: "Workload Protection Agent configuration"
- link: "https://learn.datadoghq.com/courses/workload-protection-detect-compromises"
  tag: "Learning Center"
  text: "Detect Host and Container Compromises with Workload Protection"
---

Workload Protection can act on threats automatically when an Agent rule matches or manually when you respond to a signal. The Datadog Agent terminates processes and containers or blocks network traffic. Both methods depend on Agent enforcement.

For more information about where response fits in the detection pipeline, see [How Workload Protection works][7].

## Response requirements

Automated and manual response rely on enforcement in the Agent. Depending on the response action, the Agent can terminate a process or container or isolate it from the network.

### Configure Agent enforcement

Response actions use the `runtime_security_config.enforcement` settings in `/etc/datadog-agent/system-probe.yaml`. The default settings are sufficient for most configurations. For the full parameter reference, see [Workload Protection Agent configuration][4].

These settings let you exclude binaries from response actions or control which rule sources can trigger them. By default, no binaries are excluded, and the `file` and `remote-config` rule sources are allowed.

### Response permissions

Both **Automated response** and manual response require specific [RBAC permissions][5]:

- The `security_monitoring_cws_agent_rules_actions` permission lets users configure Automated response and manually respond to threats.
  - A user with the Datadog Admin role must create a role that includes this permission, then assign that role only to users who manage Automated response or need to run manual response actions.
- The **Datadog Standard** role lets users create and update custom rules by default, as long as the changes do not modify **protection** settings on the rule. Users with the Standard role cannot enable a disabled rule that includes an Automated response action and cannot use manual response actions.

## Automated response

Automated response enables you to proactively block threats identified by Datadog Agent detection rules by terminating matching processes.

Automated response streamlines threat detection and targeted response, resulting in risk reduction, allowing DevSecOps and security teams to tackle evolving threats effectively:

- Security decides which threats warrant an automated action.
- DevOps decides which applications and resources are resilient enough to withstand targeted protection.

The result is threat detection followed by immediate, targeted mitigation of high-confidence threats.

### Automated response availability

If Automated response is active for an Agent rule, you can verify it in the rule:

1. In [Agent Configuration][2], open the rule.
2. Confirm that {{< ui >}}Automated response{{< /ui >}} appears in the list of active actions.

To check whether Automated response applies to a rule that generated a signal:

1. In [Signals][1], open the signal.
2. View {{< ui >}}Next Steps{{< /ui >}}. If Automated response is available for the matching rule, {{< ui >}}Proactively block threats{{< /ui >}} displays {{< ui >}}Automated response enabled{{< /ui >}}.

### Configure Automated response on Agent rules

By default, all out-of-the-box (OOTB) Agent rules, such as crypto mining rules, are active. You must configure the Automated response action manually.

#### Agent rule configurations

Agent rules can be configured in the following ways:

- **Inactive:** The Agent does not monitor for the rule events and does not send detections to the Datadog backend.
- **Active:** This is the default setting for enabled rules. The Agent monitors for the enabled rule and displays detections in [Signals][1].
- **Active with Automated response:** The Agent monitors for the enabled rule, terminates matching processes, and displays detections in [Signals][1].

<div class="alert alert-info">Automated response is applied to all threats detected after automated response is enabled. Automated response is not retroactive.</div>

To enable Automated response on an Agent rule:

1. In [Agent Configuration][2], open a rule. If there is no {{< ui >}}Automated response{{< /ui >}} action in the {{< ui >}}Agent's actions{{< /ui >}} section, then Automated response is not available for that rule yet.
2. Click {{< ui >}}Edit{{< /ui >}}.
3. Under {{< ui >}}Add actions for the agent to follow{{< /ui >}}, select {{< ui >}}Automated response{{< /ui >}}.

   {{< img src="security/workload_protection/respond_and_report/automated_response_activation.png" alt="An Agent rule Protection section displaying the Automated response action" style="width:100%;" >}}
4. Under {{< ui >}}Link the rule to policies{{< /ui >}}, verify that the rule is {{< ui >}}Active{{< /ui >}} in at least one policy.
5. Click {{< ui >}}Update Agent Rule{{< /ui >}}.

### Review blocked attack attempts

After Automated response is enabled for an Agent rule, blocked threats appear in [Signals][1].

A signal for a blocked threat contains the messages `SECURITY RESPONSE` and `The process <THREAT NAME> was automatically killed because it exhibited malicious behavior.`

## Manual response {#response}

Manual response lets you protect your infrastructure from the signal side panel after Workload Protection generates a [signal][6]. Use manual response if you do not want an Agent rule to terminate processes automatically.

<div class="alert alert-info">Response and Agent enforcement capabilities depend on your Datadog subscription and organization settings. Contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> if you are unsure whether the feature is enabled for your account.</div>

{{< img src="security/workload_protection/respond_and_report/response_actions.png" alt="Response section showing isolate container and kill container actions with ISOLATED and KILLED statuses" style="width:100%;" >}}

### Manual response requirements

Confirm that each environment with hosts or containers running the Workload Protection-enabled Agent meets these requirements:

- Datadog **Agent 7.78** or later on the hosts that should execute response actions.
- [**Remote Configuration**][3] is enabled so response policies can be delivered to the Agent.
- Enforcement is enabled in `system-probe` as described in [Configure Agent enforcement](#configure-agent-enforcement).

#### Network isolation

By default, the Agent enables the network probes required for network isolation.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/workload-protection/agent-rules
[3]: /agent/remote_config/?tab=configurationyamlfile
[4]: /security/workload_protection/setup/advanced_configuration
[5]: /account_management/rbac/permissions
[6]: /security/workload_protection/investigate_and_triage/security_signals
[7]: /security/workload_protection/#responding-to-threats
