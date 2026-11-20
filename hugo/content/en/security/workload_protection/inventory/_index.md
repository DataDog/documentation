---
title: Coverage
description: Assess Workload Protection coverage across hosts, ECS Fargate, and EKS Fargate workloads, including Agent, policy, and rule deployment status.
disable_toc: false
aliases:
  - /security/workload_protection/inventory/coverage_map
  - /security/workload_protection/inventory/hosts_and_containers
  - /security/workload_protection/inventory/serverless
further_reading:
  - link: "/security/detection_rules/#mitre-attck-map"
    tag: "Documentation"
    text: "MITRE ATT&CK map"
  - link: "https://app.datadoghq.com/release-notes/review-your-workload-protection-coverage-with-the-coverage-map"
    tag: "Release Note"
    text: "Review your Workload Protection coverage with the Coverage map"
---

Workload Protection [Coverage][1] provides a real-time view of security coverage across your hosts, ECS Fargate, and EKS Fargate workloads. Use Coverage to assess protection posture, identify gaps, and act on unprotected or misconfigured workloads.

Coverage reflects whether the policies and Agent rules on each resource loaded successfully. For how policies reach your Agents, see [Enable and deploy policies][5].

To identify and address coverage gaps, see [Review and Improve Coverage][6].

{{< img src="security/workload_protection/coverage_page/coverage_explorer.png" alt="Explorer view of the Coverage page showing resources in a faceted table" width="100%">}}

## Views

Coverage has two views. Use the toggle at the top of the page to switch between them:

- {{< ui >}}Explorer{{< /ui >}}: A faceted table of your resources. Search and filter resources by {{< ui >}}Agent{{< /ui >}}, {{< ui >}}Rule{{< /ui >}}, {{< ui >}}Policy{{< /ui >}}, {{< ui >}}Infrastructure{{< /ui >}}, and {{< ui >}}Container{{< /ui >}} facets, then open a resource to inspect its Agent rules and policy deployment status.

- {{< ui >}}Map{{< /ui >}}: A visual map where each resource appears as a hexagon colored by its coverage status severity.

{{< img src="security/workload_protection/coverage_page/coverage_map.png" alt="Map view of the Coverage page showing resources as hexagons colored by coverage status" width="100%">}}

In both views, you can:

- {{< ui >}}Group by{{< /ui >}} Cloud Provider, OS, Agent Version, Severity, or Kubernetes Cluster.
- Refresh the view on demand.

A resource appears in Coverage as soon as its Agent loads its ruleset. When a resource goes offline, it is removed from Coverage within 15 minutes.

## Coverage statuses

### Resource coverage status

Each resource's coverage status falls into one of two severity categories, based on the rules loaded on it:

| Severity | Meaning |
|----------|---------|
| Pass  | All rules loaded successfully or were filtered as expected. |
| Error | One or more rules have errors that need to be fixed, or the resource reported incomplete data. |

In the Map view, resources are displayed as hexagons colored by severity. Click a hexagon to inspect a resource and view its policies and rules.

### Policy statuses

Each policy loaded on a resource has one of the following statuses:

- {{< ui >}}Loaded{{< /ui >}}: All of the policy's rules pass.
- {{< ui >}}Error{{< /ui >}}: One or more of the policy's rules are in error.

### Rule statuses

Each rule reports one of the following statuses:

- {{< ui >}}Loaded{{< /ui >}}: The rule loaded successfully.
- {{< ui >}}Filtered{{< /ui >}}: The rule was intentionally not applied (for example, the Agent version is too low or the event type is disabled).
- {{< ui >}}Error{{< /ui >}}: The rule failed to load.

When a rule is filtered or in error, a **verdict** explains why:

| Verdict | Meaning |
|---------|---------|
| `syntax_error` | The rule expression is invalid. |
| `unknown` | The Agent could not load the rule. |
| `filtered_agent_version` | The Agent version is too low for this rule. |
| `filtered_event_type_disabled` | The event type is disabled in the configuration. |
| `filtered_rule_filter` | The rule was excluded by a rule filter. |

To understand why a rule is failing, select the resource to open its side panel. The side panel lists the resource's policies and rules. For each rule, it shows the expression, the status and verdict, and the error message reported by the Agent.

{{< img src="security/workload_protection/coverage_page/coverage_side_panel.png" alt="Resource side panel showing policy and rule statuses with verdicts" width="100%">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/workload-protection/inventory/coverage
[5]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management#enable-and-deploy-policies
[6]: /security/workload_protection/inventory/review_improve_coverage
