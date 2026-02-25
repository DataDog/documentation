---
title: Agent Rules
disable_toc: false
---

## Overview

- agent events are the telemetry pilar for both threats detection and runtime security posture evaluation
- the overall philosophy is to send to the backend only the runtime events that are relevant for security monitoring, filtering benign activity as early as possible to limit the performance impact on the host where the agent is deployed
- Workload protection has a custom query language (called SecL) to define which events should be sent to the backend
- Rules are deployed using policies which can be managed in the app with Remote Configuration or manually by modifying the agent configuration files, or using Terraform.

Agent events are the foundational telemetry signal used by the security platform to power both threat detection and runtime security posture evaluation. They capture low-level runtime activity from workloads and provide the raw, high-fidelity data needed to reason about what is actually happening on a system, rather than relying solely on static configuration or periodic scans.

{{< img src="security/workload_protection/workload_protection_agent_architecture.png" alt="Workload Protection detection architecture overview" width="100%">}}

The overall design philosophy is to be selective by default. Only runtime events that are relevant for security monitoring are sent to the backend, while benign or low-risk activity is filtered out as early as possible within the agent itself. This early filtering is critical to reducing noise, limiting data volume, and minimizing the performance impact on the host where the agent is deployed.

The goal of this page is to guide you through the different steps needed to write and deploy an agent rule.

### OOTB rules

By default, the Workload Protection agent ships with a set of out-of-the-box agent rules (called "default" rules) that are fully managed by Datadog (you can find them [here][1]). These rules are continuously maintained and updated by our security engineers, with new rules regularly introduced to reflect emerging malware behaviors, evolving attack techniques, and patterns that are known to be malicious or security-relevant.

Users retain full control over how and where these rules are applied within their infrastructure. Default rules can be selectively deployed to specific environments or workloads (see the [Policy Management][2] page), cloned to customize their expressions, refined to tighten or relax filtering logic, or extended with "actions" to enable proactive remediation workflows.

The scope of these rules spans a broad spectrum of security coverage. Some rules focus on collecting low-level telemetry that provides valuable context during threat investigations, while others are designed to detect high-confidence indicators of compromise that warrant immediate attention and response.

## 1) Writing custom agent rules in SecL

Within Workload Protection, agent rules are written with a custom query language called SecL. SecL allows precise definitions of which events should be observed, matched, and forwarded to the Datadog backend based on runtime context. You can find more in the dedicated [SecL Guide][3] page.

## 2) Deploying agent rules with policies

Agent rules are packaged and deployed using policies, which can be managed centrally in the application via Remote Configuration, or defined manually through agent configuration files. For infrastructure-as-code workflows, the same policies can also be managed and versioned using Terraform. You can learn more about the deployment of agent rules in the [Policy management][2] page.

## 3) (optional) Leverage variables and actions for advanced use cases

Variables and actions extend the Agent detection logic beyond simple event matching. Actions can be used to collect additional telemetry (such as file hashes) or to operate on SecL variables, which enable the construction of advanced, stateful detection logic based on state machines. Visit the [Variables and Actions][4] page for more.

[1]: https://app.datadoghq.com/security/workload-protection/agent-rules?ruleQuery=defaultRule%3Atrue
[2]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
[3]: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[4]: /security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions