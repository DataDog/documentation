---
title: How Workload Protection works
disable_toc: false
further_reading:
- link: "/security/workload_protection/setup"
  tag: "Documentation"
  text: "Setting up Workload Protection"
- link: "/security/workload_protection/detect_and_monitor/agent_rules"
  tag: "Documentation"
  text: "Agent rules"
- link: "/security/workload_protection/detect_and_monitor/detection_and_finding_rules"
  tag: "Documentation"
  text: "Detection and finding rules"
---

Workload Protection detects threats and evaluates runtime security posture by collecting activity from your workloads. It evaluates that activity in two places: on the Datadog Agent, and in Datadog.

[Agent rules][1] decide which system activity the Agent sends to Datadog. Matching activity becomes an [agent event][2]. In Datadog, [detection rules][3] turn agent events into [signals][5], and [finding rules][4] turn them into [findings][6]. [Notification rules][7] route signals to your team. [Response actions][10], which run in the Agent, stop the activity.

## Collecting runtime activity

The Datadog Agent collects runtime activity from your workloads. The collection mechanism depends on the platform:

- **Linux**: the eBPF Agent, which offers the broadest feature support.
- **AWS Fargate**: the eBPF-less Agent. Fargate does not provide eBPF access, so this Agent uses ptrace instead. It covers File Integrity Monitoring and process execution monitoring.
- **Windows**: a Windows driver.

For the distributions, versions, and cloud environments each one supports, see [Setting up Workload Protection][9].

## Evaluating activity

{{< img src="security/workload_protection/detect_and_monitor/threat_detection_pipeline_2.png" alt="Workload Protection detection architecture overview" width="100%">}}

Workload Protection uses the following pipeline to protect your workloads:

1. The [Agent rules][1] evaluate system activity on the Agent host.
2. When activity matches an Agent rule expression, the Agent generates an [Agent Event][2] and passes it to the Datadog backend.
3. The Datadog backend evaluates the agent events to see if they match any threat [Detection rules][3] or [Finding rules][4].
4. If a detection rule matches, a signal is generated and displayed in [Signals][5].
5. If a finding rule matches, a finding is generated and displayed in [Findings][6].
6. If the value of one of the attributes of an agent event matches a [threat intelligence indicator][8], a signal is generated and displayed in [Signals][5].
7. Any [Notification Rules][7] that match the severity, detection rule type, tags, and attributes of the generated signal are triggered.

### Why evaluation is split between the Agent and Datadog

Workload Protection detection rules are complex, correlating several datapoints across time and processes. Evaluating all of them on the Agent host would place considerable demand on that host's compute resources.

Datadog keeps the Agent lightweight instead. The Agent runs efficient rules that filter out activity that is not security relevant, and Datadog evaluates the rest with detection and finding rules. For more detail on this division, see [Agent rules][1].

## Responding to threats

Response actions run in the Agent. The Agent can terminate a process or container, or block network traffic using an eBPF-based filter. You can trigger these actions two ways:

- **Automated response** attaches an action to an Agent rule, so the Agent acts as soon as the rule matches.
- **Response** lets you act manually from a signal after it is generated.

Both depend on enforcement being enabled in the Agent. See [Respond and Report][10].

## Managing rules and policies

Agent rules are grouped into [policies][11]. Datadog delivers policies to your Agents using {{< tooltip glossary="Remote Configuration" case="title" >}}, so you can change which rules are active without redeploying the Agent. Datadog ships updates to its own threat definitions through the same channel.

You can manage rules and policies from the Datadog UI, the CLI, or the Datadog Terraform provider. The Terraform provider lets you define and version your rules as code outside the app.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/workload_protection/detect_and_monitor/agent_rules
[2]: /security/workload_protection/investigate_and_triage/agent_events
[3]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[5]: /security/workload_protection/investigate_and_triage/security_signals
[6]: /security/workload_protection/investigate_and_triage/security_findings
[7]: /security/notifications/rules
[8]: /security/workload_protection/detect_and_monitor/threat_intelligence
[9]: /security/workload_protection/setup
[10]: /security/workload_protection/respond_and_report
[11]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
