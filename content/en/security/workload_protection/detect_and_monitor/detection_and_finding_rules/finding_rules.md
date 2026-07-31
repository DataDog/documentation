---
title: Finding Rules
disable_toc: false
aliases:
  - /security/workload_protection/detect_and_monitor/finding_rules
further_reading:
  - link: "/security/workload_protection/investigate_and_triage/security_findings"
    tag: "Documentation"
    text: "Investigate and triage findings"
  - link: "/security/workload_protection/detect_and_monitor/agent_rules/secl_guide"
    tag: "Documentation"
    text: "SecL guide"
  - link: "/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules"
    tag: "Documentation"
    text: "Detection rules"
---

## Overview

Finding rules describe the backend logic used to evaluate your runtime security posture by analyzing [Agent events][1]. When a finding rule matches, Workload Protection generates a [finding][2] for the affected resource.

Unlike [detection rules][3], which surface point-in-time threats as security signals, finding rules track ongoing bad practices and misconfigurations. A finding represents a resource (a host or container) that is actively failing a security policy, not a single suspicious event.

Finding rules use existing Agent events to surface practical security recommendations such as package manager usage in containers, IMDS access patterns, or unnecessary privilege configurations. This helps you address real-world risks that are not direct threats but represent risky practices in production environments.

## OOTB finding rules {#ootb-finding-rules}

Workload Protection includes out-of-the-box (OOTB) finding rules maintained by Datadog. These rules continuously surface bad practices and risky configurations in production workloads. Datadog develops new default rules on an ongoing basis, and new rules are automatically imported into your account. For the full list, see [OOTB rules list][8].

Browse and review finding rules deployed to your organization in the Workload Protection [finding rules][6] list in Datadog. Each rule includes a description of the security risk, the resource types it applies to, and remediation guidance.

To reduce noise for expected configurations, use a findings automation to mute a rule without disabling it. See [Findings automation][7].

## Create a custom finding rule

Custom finding rules follow the same creation process as [detection rules][3], with one key difference: they target a specific resource type—host or container—rather than detecting a point-in-time event.

To create a custom finding rule, go to the Workload Protection [finding rules][6] page and click **New Rule**.

The rule editor walks you through five steps.

### Step 1: Select a resource type and define search query

Select the type of resource the finding rule evaluates:

- **Host**: The rule applies to hosts. Workload Protection automatically prepends `-@container.id:*` to your query to exclude container events.
- **Container**: The rule applies to containers. Workload Protection automatically prepends `@container.id:*` to your query to include only container events.

{{< img src="security/workload_protection/detect_and_monitor/finding_rules_editor.png" alt="Finding rule editor showing the Host and Container resource type selector and search query preview" width="100%">}}

Define the query that selects which [Agent events][1] the rule evaluates. The search query determines which events are considered when deciding whether a resource is failing the rule.

You can:

- Filter on **specific fields** in Agent events to refine the query and make the finding more precise. For example, filter on `@process.executable.path`, `@file.path`, or `@agent.rule_id`. Similar to [detection rules][3], finding rules can query any field from the backend event schema, which includes all Agent event fields plus additional enrichment such as infrastructure context, process ancestry, and threat intelligence. See [Linux backend syntax][9] and [Windows backend syntax][10] for the full set of available fields.
- Combine multiple conditions to scope the rule to a subset of your infrastructure or workloads.

Use the [Agent Events explorer][5] to test your query and validate which events match before you publish the rule.

### Step 2: Define finding severity

Define the severity a finding has when the rule is triggered.

### Step 3: Describe the finding

Configure the **name**, **description**, and **remediation guidance** that appear when a finding is generated.

1. Enter a **Rule name**. The name appears in the finding rules list and becomes the title of the generated finding.
2. In the **Rule message** section, use Markdown to describe what the finding means and how to address it. Include a `## Remediation` header in the message body—Workload Protection uses this section to surface remediation steps directly in the finding side panel.
3. Use the **Tag resulting findings** dropdown to add tags to generated findings. For example, `security:posture` or `compliance:pci`.

**Note**: The `## Remediation` header is required for remediation steps to display correctly in the finding side panel.

[1]: /security/workload_protection/investigate_and_triage/agent_events
[2]: /security/workload_protection/investigate_and_triage/security_findings
[3]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: https://app.datadoghq.com/security/configuration/findings-automation
[5]: https://app.datadoghq.com/security/agent-events
[6]: https://app.datadoghq.com/security/workload-protection/finding-rules
[7]: /security/automation_pipelines/mute
[8]: /security/default_rules/#workload-activity
[9]: /security/workload_protection/backend_linux
[10]: /security/workload_protection/backend_windows
