---
title: Coverage
disable_toc: false
further_reading:
- link: "security/detection_rules/#mitre-attck-map"
  tag: "Documentation"
  text: "MITRE ATT&CK map"
- link: "https://app.datadoghq.com/release-notes/review-your-workload-protection-coverage-with-the-coverage-map"
  tag: "Release Note"
  text: "Review your Workload Protection coverage with the coverage map"
---

Workload Protection [Coverage][1] provides a real-time view of security coverage across all your workloads, including hosts, containers, and serverless environments. Use Coverage to assess protection posture, identify gaps, and take immediate action.

{{< img src="security/cws/workload_protection_coverage_map.png" alt="Leverage the Coverage map to get real time visibility into the workload protection status across all your hosts and see which policies are effectively applied" width="100%">}}

Coverage consolidates critical protection data into one view so you can:

* Identify the workloads protected by security agents and policies.
* Detect misconfigurations, outdated agents, and missing rules.
* Validate that detection policies align with security baselines and frameworks like MITRE ATT\&CK. See also, [MITRE ATT&CK map][2].
* Prioritize remediation for high-risk assets.

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

## Improving workload security using Coverage

Here are some ways to use Coverage to improve your workload security.

### Eliminate gaps in security coverage

To eliminate unknown workloads from your environment and reduce attack surface, do the following:

- Identify which hosts are in a **Warning** or **Incomplete Coverage** state.
- Focus on the **orange hexagons** (warnings). These warnings indicate potential blind spots such as missing agents, outdated policies, or disabled rules.
- Use the **Incomplete infrastructure coverage** banner to see exactly which assets are at risk and why.

### Prioritize policy remediation

Coverage uses policy and rule metadata to show the exact version, status, and source of each deployment. This exposure ensures every workload is aligned with your security baselines, minimizing the window of exposure.

To see where deployments failed or rules are not enforced, do the following:

1. Filter by **Policy Status** or **Policy Rule Status**.
2. Select a workload.
3. In the workload details pane, select **Edit** for a policy. The policy appears.
4. Redeploy or fix policy configs.

### Detect and address stale or misconfigured agents

Coverage refreshes **every 5 minutes**, helping you spot the agents that need attention.

To spot stale or misconfigured agents, do the following:

1. In **Improve infrastructure coverage**, click **NO WP**. **NO WP** shows how many hosts are running the Datadog Agent with Workload Protection enabled.
   1. Click **Inspect Hosts Without WP**. Fleet Automation appears, allowing you to [set up Workload Protection][3].
2. In **Improve infrastructure coverage**, click **NO AGENT**. **NO AGENT** show how many hosts are not running the Datadog Agent, and therefore can't be evaluated by Workload Protection.
   1. Click **Inspect Hosts Without Agent**. The Resource Catalog appears, allowing you to address hosts missing agents.
3. Filter by **Agent Version** to detect outdated agents lacking recent security updates.
4. Investigate **Snapshot Health Issues** to catch and fix health issues before they mask attacks.

### Validate policy deployment against MITRE ATT&CK coverage

In **Filter by tactics, techniques, and policy types**, built-in filters for **Tactics**, **Techniques**, and **Policies** show exactly which parts of the MITRE ATT&CK framework are covered.

To use these filters to strengthen detection and response alignment with proven MITRE ATT&CK framework threat models, do the following:

1. Click **Tactics** to Filter for high-priority tactics (for example, `TA004-privilege-escalation`, `TA004-persistence`), to ensure those are protected across all hosts.
2. After the map updates for the tactic you selected, click **Techniques** and select a technique to identify gaps in technique coverage for critical systems.
3. Click Policies and select a policy type to see the distribution of policies across the filtered infrastructure.

For information about the MITRE ATT&CK map available in SIEM or Workload Protection, see [MITRE ATT&CK map][2].

### Continuous posture management

You can use Coverage as part of your reactive security culture by incorporating it into your scheduled security reviews.

To treat Coverage as part of your scheduled security reviews, do the following:

- Integrate the Coverage map into your CI/CD and IaC review processes to ensure every new host is automatically protected.
- Schedule weekly reviews to track progress toward 100% green coverage.

### Compliance and audit reporting

For regulated environments, the ability to demonstrate continuous workload protection is essential. Coverage provides visual evidence and timestamped data that can be used in frameworks like PCI DSS, HIPAA, SOC 2, or ISO 27001. Security teams can export or capture the view as part of audit documentation, proving coverage at a specific point in time.

### Policy effectiveness validation

Coveraged can be used for policy effectiveness validation. Rather than assuming a policy is active across the environment, Coverage allows teams to confirm deployments and spot workloads where enforcement has failed or configurations are broken. This prevents false assurance and ensures that detection rules remain consistently applied across all systems.

### Detection engineering gap analysis

Coverage can be used for gap analysis. By mapping MITRE ATT&CK tactics and techniques to current workload coverage, teams can see exactly where detection is thin. If certain tactics, such as defense evasion, are underrepresented, security engineers can adjust or create rules to address those gaps and strengthen detection capabilities.

### Post-incident lessons learned

After an event, teams can compare coverage data from before the incident to the environment after remediation. This confirms that exploited gaps have been addressed and that similar workloads are now fully protected, reducing the risk of a repeat compromise.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/workload-protection/inventory/coverage
[2]: /security/detection_rules/#mitre-attck-map
[3]: /security/workload_protection/setup/