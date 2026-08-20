---
title: Agent Rules
description: Learn how Agent rules determine which runtime activity the Datadog Agent collects and sends to Datadog as Agent events.
disable_toc: false
---

Agent rules determine which runtime activity the Datadog Agent collects and sends to Datadog as Agent events. These events provide the telemetry that Workload Protection uses for threat detection and runtime security posture evaluation. Detection rules and finding rules in the Datadog backend analyze those events to generate security signals and findings. Agent events capture low-level runtime activity from workloads and provide the raw, high-fidelity data needed to understand what is actually happening on a system, rather than relying solely on static configuration or periodic scans.

To reduce noise, data volume, and performance impact, the Agent filters benign or low-risk activity before sending events to Datadog. Agent rules use Datadog Security Language (SECL) to define this filtering. Policies deploy Agent rules through Remote Configuration, Agent configuration files, or Terraform.

## Out-of-the-box Agent rules {#ootb-rules}

Workload Protection includes out-of-the-box (OOTB) Agent rules, called default rules, that Datadog manages. To view them, see [Agent Rules][1] in Datadog. Datadog security engineers maintain these rules. They add rules for emerging malware behavior, evolving attack techniques, and other security-relevant activity.

You can deploy default rules selectively to environments or workloads, clone them to customize their expressions, refine their filtering logic, or add actions. For deployment options, see [Policy Management][2].

To create an Agent rule and threat detection rule together, use the {{< ui >}}Assisted rule creator{{< /ui >}} or manual flow. See [Create the custom Agent and detection rules together][3] in the [Detection Rules][4] documentation.

## Write custom Agent rules in SECL

Workload Protection Agent rules use a custom expression language called SECL to specify which events to observe, match, and send to Datadog based on runtime context. For more information, see the [SECL guide][5].

## Deploy Agent rules with policies

Agent rules are packaged and deployed in policies. Manage policies centrally in Datadog with Remote Configuration, manually with Agent configuration files, or as code with Terraform. For more information, see [Policy Management][2].

## Use variables and actions

Variables and actions extend Agent rules beyond event matching. Actions can collect additional telemetry, such as file hashes, respond to threats, or operate on SECL variables. SECL variables enable the construction of advanced, stateful detection logic based on state machines. For more information, see [Variables and actions][6].

[1]: https://app.datadoghq.com/security/workload-protection/agent-rules?ruleQuery=defaultRule%3Atrue
[2]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
[3]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together
[4]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[6]: /security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
