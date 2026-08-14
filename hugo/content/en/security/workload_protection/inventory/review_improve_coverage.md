---
title: Review and Improve Coverage
disable_toc: false
---

For information about Coverage views and statuses, see [Coverage][1].

Use the procedures on this page to reduce blind spots, verify policy alignment, and help Workload Protection detect and respond to threats across your environment. You can incorporate these checks into compliance, CI/CD, and infrastructure reviews.

The widget at the top of the Coverage page shows the percentage of your resources secured with Workload Protection, along with any findings.

{{< img src="security/workload_protection/coverage/coverage_top_widgets.png" alt="Coverage page top widgets showing resource coverage, rule loading status, Workload Protection adoption, and Remote Config deployment" width="100%">}}

## Find workloads without protection

- **View without WP**: Hosts running the Datadog Agent without Workload Protection enabled. This opens Fleet Automation, where you can [set up Workload Protection][3].
- **View without Agents**: Hosts not running the Datadog Agent, which can't be evaluated by Workload Protection. This opens the Infrastructure Catalog.

## Find outdated or incomplete Agents

- **View outdated**: Resources running an agent version older than the minimum supported version (`7.65.0`), which might not support the latest Workload Protection features.
- **View incomplete**: Resources reporting incomplete or invalid data.

Update or deploy the Datadog Agent to help ensure complete coverage.

## Fix policy or rule deployment errors

To find and fix resources with rule errors:

1. In the Explorer, filter by severity **Error**, or in the Map, select an **Error** hexagon.
2. Select a failing resource to open its side panel and review its policies. Policies with failing rules show a status of **Error**.
3. Review a failing rule's verdict (for example, `syntax_error` or `unknown`) and error message to understand why it failed.
4. [Edit the rule][4] as needed.
5. Redeploy and confirm the fix in Coverage.

## Confirm that new rules loaded

You can use Coverage to test and iterate on custom security rules:

1. Write and deploy a [new custom rule][4].
2. In Coverage, search for the rule by rule ID, policy ID, or hostname.
3. Confirm that the agent has loaded the rule successfully.
4. If errors appear, review the verdict, fix the rule, and redeploy.

## Review detection coverage

Use the Explorer facets (under the **Rule** and **Policy** groups) to filter resources by the detection content applied to them, including MITRE ATT&CK tactics and techniques. This shows which parts of the MITRE ATT&CK framework are covered across your infrastructure.

For information about the MITRE ATT&CK map available in SIEM or Workload Protection, see [MITRE ATT&CK map][2].

## Workload coverage triage and response cycle

As an example of how to use Coverage to triage and respond to coverage issues, here is a sequence that starts by establishing a baseline, closing blind spots, and securing the most critical assets. It then verifies enforcement mechanisms, restores agent health, and aligns detection coverage with known adversary behaviors. Finally, it applies rule updates, confirms effectiveness, and records the state for audit and incident reference.

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

[1]: /security/workload_protection/inventory/
[2]: /security/detection_rules/#mitre-attck-map
[3]: /security/workload_protection/setup/
[4]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
