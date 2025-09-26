---
title: Coverage
disable_toc: false
further_reading:
- link: "security/detection_rules/#mitre-attck-map"
  tag: "Documentation"
  text: "MITRE ATT&CK map"
- link: "https://app.datadoghq.com/release-notes/review-your-workload-protection-coverage-with-the-coverage-map"
  tag: "Release Note"
  text: "Review your Workload Protection coverage with the Coverage map"
---

Workload Protection [Coverage][1] provides a real-time view of security coverage across all your hosts. Use Coverage to assess protection posture, identify gaps, and take immediate action.

{{< img src="security/cws/workload_protection_coverage_map.png" alt="Leverage the Coverage map to get real time visibility into the workload protection status across all your hosts and see which policies are effectively applied" width="100%">}}


## Key functionality

* **Real-time visibility**: Coverage updates every five minutes for accurate, current status.
* **Granular filtering**: Search by policy, rule, version, status, tactic, or technique.
* **Direct drill-down**: Drill down from a high-level map to a detailed asset or policy view.
* **Actionable alerts**: Highlight workloads in a warning or failed state so you can respond promptly.
* **Coverage analytics**: Track rule deployment health, stale agents, and configuration issues.

## Key benefits

* Reduce blind spots by monitoring for unprotected workloads.
* Shorten detection and response times with direct remediation workflows.
* Maintain continuous compliance and policy alignment.
* Integrate posture checks into CI/CD and infrastructure reviews.

## Policy statuses

Hosts are identified with the following colors:

- Green: all rules in the policies applied to the host have passed.
- Orange: one or more rules in the policies applied to the host are in error.

{{< img src="security/cws/workload_protection_coverage_map.png" alt="Leverage the Coverage map to get real time visibility into the workload protection status across all your hosts and see which policies are effectively applied" width="100%">}}

Click an orange hexagon to view a host with policy rules in error.

Policies are displayed with the following statuses:

- **Fully Loaded:** all of the policy's rules pass.
- **Partially Loaded:** some of the policy's rules fail.
- **Fully Rejected:** the entire policy is failing.

## Use cases

Here are some ways to use Coverage to improve your workload security.

### Detect and remediate policy deployment issues
From the **Incomplete infrastructure coverage** status card on the Coverage page, you can address policy deployment issues:
1. In **Incomplete infrastructure coverage**, click **Warning**, and then select the policies in **Security coverage needs attention**. In the Coverage map, assets with policy deployment problems are displayed as orange hexagons.
2. Review the list of deployed policies. Policies are highlighted with statuses such as **Partially Loaded**, **Fully Rejected**, and so on.
3. In the policy details, do one of the following:
   - [Edit a policy][4].
   - View a policy's rule errors, and then [edit them][4] as needed.
4. Redeploy and confirm the fix in the Coverage map.

### Identify assets missing Workload Protection

From the **Incomplete infrastructure coverage** status card on the Coverage page, you can review assets without full Workload Protection (WP):

1. In **Improve infrastructure coverage**, click **NO WP**. **NO WP** shows how many hosts are running the Datadog Agent without Workload Protection enabled.
2. Click **Inspect Hosts Without WP**. Fleet Automation appears, allowing you to [set up Workload Protection][3].

### Identify assets missing key features

From the **Incomplete infrastructure coverage** status card on the Coverage page, you can find assets with gaps in protection.

1. In **Improve infrastructure coverage**, click **INFO** to review the `outdated_agent` flag. The `outdated_agent` flag means an outdated Agent version is running and might not support the latest Workload Protection features.
2. In **Improve infrastructure coverage**, click **NO AGENT**. **NO AGENT** shows how many hosts are not running the Datadog Agent, and therefore can't be evaluated by Workload Protection.
   1. Click **Inspect Hosts Without Agent**. The Resource Catalog appears, allowing you to address hosts missing agents.
3. Filter by **Agent Version** to detect outdated agents lacking recent security updates.
4. Update the Agent to ensure complete coverage.

### Search assets by MITRE ATT&CK techniques and tactics

From the **Filter by tactics, techniques, and policy types** status card on the Coverage page, built-in filters for **Tactics**, **Techniques**, and **Policies** show exactly which parts of the MITRE ATT&CK framework are covered.

To use these filters to strengthen detection and response alignment with proven MITRE ATT&CK framework threat models, do the following:

1. Click **Tactics** to filter for high-priority tactics (for example, `TA004-privilege-escalation`, `TA004-persistence`), to ensure those are protected across all hosts.
2. After the map updates for the tactic you selected, click **Techniques** and select a technique to identify gaps in technique coverage for critical systems.
3. Click **Policies** and select a policy type to see the distribution of policies across the filtered infrastructure.

For information about the MITRE ATT&CK map available in SIEM or Workload Protection, see [MITRE ATT&CK map][2].

### Experiment with new rules

You can use Coverage to test and iterate on custom security rules:

1. Write and deploy a [new custom rule][4].
2. In **Coverage**, search for the rule by rule ID, policy ID, or hostname.
3. Confirm that the agent has loaded the rule successfully.
4. If errors appear, review the details, fix the rule, and redeploy.

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
[3]: /security/workload_protection/setup/
[4]: /security/workload_protection/workload_security_rules/custom_rules