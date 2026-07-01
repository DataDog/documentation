---
title: Coverage
disable_toc: false
aliases:
  - /security/workload_protection/inventory/coverage_map
  - /security/workload_protection/inventory/hosts_and_containers
  - /security/workload_protection/inventory/serverless
further_reading:
  - link: "security/detection_rules/#mitre-attck-map"
    tag: "Documentation"
    text: "MITRE ATT&CK map"
  - link: "https://app.datadoghq.com/release-notes/review-your-workload-protection-coverage-with-the-coverage-map"
    tag: "Release Note"
    text: "Review your Workload Protection coverage with the Coverage map"
---

Workload Protection [Coverage][1] provides a real-time view of security coverage across your hosts, ECS Fargate, and EKS Fargate workloads. Use Coverage to assess protection posture, identify gaps, and take action on unprotected or misconfigured workloads.

{{< img src="security/cws/workload_protection_coverage_map.png" alt="Use the Coverage page to get real-time visibility into Workload Protection status across all your resources and see which policies are applied" width="100%">}}

## Views

Coverage has two views. Use the toggle at the top of the page to switch between them:

- **Explorer**: A faceted table of your resources. Filter with the facet groups in the sidebar (**Agent**, **Rule**, **Policy**, **Infrastructure**, and **Container**), then open a resource to inspect its agent rules and policies deployment status.
- **Map**: A visual map where each resource appears as a hexagon colored by its coverage status severity.

{{< img src="security/cws/workload_protection_coverage_map_views.png" alt="Toggle between the Explorer and Map views on the Coverage page" width="100%">}}

In both views, you can:

- **Group by** Cloud Provider, OS, Agent Version, Severity, or Kubernetes Cluster.
- Refresh the view on demand.

A resource appears in Coverage as soon as its agent loads its ruleset. When a resource goes offline, it is removed from Coverage within 15 minutes.

## Key functionality

* **Real-time visibility**: Resources appear as soon as their agent loads a ruleset, and are removed within 15 minutes of going offline.
* **Granular filtering**: Search and filter by agent, rule, policy, infrastructure, and container facets.
* **Detailed inspection**: Navigate from a high-level map or table to a detailed resource, policy, or rule view.
* **Actionable findings**: Highlight resources in a warning or error state so you can respond promptly.
* **Coverage analytics**: Track rule deployment health, outdated agents, and incomplete data.

## Key benefits

* Reduce blind spots by monitoring for unprotected workloads.
* Shorten detection and response times with direct remediation workflows.
* Maintain continuous compliance and policy alignment.
* Integrate posture checks into CI/CD and infrastructure reviews.

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

- **Loaded**: All of the policy's rules pass.
- **Error**: One or more of the policy's rules are in error.

### Rule statuses

Each rule reports one of the following statuses:

- **Loaded**: The rule loaded successfully.
- **Filtered**: The rule was intentionally not applied (for example, the agent version is too low or the event type is disabled).
- **Error**: The rule failed to load.

When a rule is filtered or in error, a **verdict** explains why:

| Verdict | Meaning |
|---------|---------|
| `syntax_error` | The rule expression is invalid. |
| `unknown` | The agent could not load the rule. |
| `filtered_agent_version` | The agent version is too low for this rule. |
| `filtered_event_type_disabled` | The event type is disabled in the configuration. |
| `filtered_rule_filter` | The rule was excluded by a rule filter. |

To understand why a rule is failing, select the resource to open its side panel. The side panel lists the resource's policies and rules, and for each rule shows its expression, status and verdict, and the error message reported by the agent.

{{< img src="security/cws/workload_protection_coverage_map_side_panel.png" alt="Resource side panel showing policy and rule statuses with verdicts" width="100%">}}

## Use cases

Here are some ways to use Coverage to improve your workload security.

### Detect and remediate policy deployment issues

To find and fix resources with rule errors:

1. In the Explorer, filter by severity **Error**, or in the Map, select an **Error** hexagon.
2. Select a failing resource to open its side panel and review its policies. Policies with failing rules show a status of **Error**.
3. Review a failing rule's verdict (for example, `syntax_error` or `unknown`) and error message to understand why it failed.
4. [Edit the rule][4] as needed.
5. Redeploy and confirm the fix in Coverage.

### Review agent deployment coverage

The widget at the top of the Coverage page shows the percentage of your resources secured with Workload Protection, along with any findings. Use the widget's buttons to investigate:

{{< img src="security/cws/workload_protection_coverage_map_top_widget.png" alt="Coverage page top widget showing the percentage of resources secured with Workload Protection" width="100%">}}

- **View outdated**: Resources running an agent version older than the minimum supported version (`7.65.0`), which might not support the latest Workload Protection features.
- **View incomplete**: Resources reporting incomplete or invalid data.
- **View without WP**: Hosts running the Datadog Agent without Workload Protection enabled. This opens Fleet Automation, where you can [set up Workload Protection][3].
- **View without Agents**: Hosts not running the Datadog Agent, which can't be evaluated by Workload Protection. This opens the Infrastructure Catalog.

Update or deploy the Datadog Agent to help ensure complete coverage.

### Search assets by MITRE ATT&CK techniques and tactics

Use the Explorer facets (under the **Rule** and **Policy** groups) to filter resources by the detection content applied to them, including MITRE ATT&CK tactics and techniques. This shows which parts of the MITRE ATT&CK framework are covered across your infrastructure.

For information about the MITRE ATT&CK map available in SIEM or Workload Protection, see [MITRE ATT&CK map][2].

### Experiment with new rules

You can use Coverage to test and iterate on custom security rules:

1. Write and deploy a [new custom rule][4].
2. In Coverage, search for the rule by rule ID, policy ID, or hostname.
3. Confirm that the agent has loaded the rule successfully.
4. If errors appear, review the verdict, fix the rule, and redeploy.

## Workload coverage triage and remediation cycle

As an example of how to use Coverage to triage and remediate coverage issues, here is a sequence that starts by establishing a baseline, closing blind spots, and securing the most critical assets. It then verifies enforcement mechanisms, restores agent health, and aligns detection coverage with known adversary behaviors. Finally, it applies rule updates, confirms effectiveness, and records the state for audit and incident reference.

1. Do a full environment view to establish baseline coverage status.
2. Focus on assets that appear fully covered. Validate that their policies, rules, and agents are working as intended before addressing visible gaps. This uncovers silent failures in trusted systems that would otherwise be ignored.
3. Identify all unprotected or partially protected workloads.
4. Prioritize assets with the highest business impact and exposure.
5. Verify policy deployment and enforcement on those assets.
6. Check for outdated or unhealthy agents on all remaining workloads.
7. Map current detection coverage to MITRE ATT&CK to find gaps in tactics and techniques.
8. Deploy or update detection rules to close those gaps.
9. Reassess coverage to confirm posture changes took effect.
10. Log the final state for compliance and future comparison.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/workload-protection/inventory/coverage
[2]: /security/detection_rules/#mitre-attck-map
[3]: /security/workload_protection/getting_started/
[4]: /security/workload_protection/detect_and_monitor/detection_rules
