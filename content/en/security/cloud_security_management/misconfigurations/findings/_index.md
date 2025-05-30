---
title: Explore Misconfigurations
aliases:
  - /security_platform/findings
  - /security_platform/cspm/findings
  - /security/cspm/findings
  - /security/misconfigurations/findings
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default Cloud Security Misconfigurations cloud configuration compliance rules"
- link: "security/cspm/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
---

The Cloud Security Misconfigurations [Findings page][1] allows you to:

- Review the detailed configuration of a resource.
- Review the compliance rules applied to your resources by Cloud Security Misconfigurations.
- Review tags for more context about who owns the resource and where it resides in your environment.
- Read descriptions and guidelines based on industry resources for remediating a misconfigured resource.
- Use the time selector to explore your security configuration posture at any point in the past.

In addition to reviewing and responding to misconfigurations, you can set notifications for failed misconfigurations, and configure signals to correlate and triage misconfigurations in the same view as real-time threats generated by [Cloud SIEM][2] and [Workload Protection][3]. This enables you to accelerate investigations, as the root causes for many of today's cloud breaches are misconfigured services that have been exploited by attackers.

## Misconfigurations

A misconfiguration is the primary primitive for a rule evaluation against a resource. Every time a resource is evaluated against a rule, a misconfiguration is generated with a **Pass** or **Fail** status. Resources are evaluated in increments between 15 minutes and four hours (depending on type). Datadog generates new misconfigurations as soon as a scan is completed, and stores a complete history of all misconfigurations for the past 15 months so they are available in case of an investigation or audit.

## Explore your cloud misconfigurations

Misconfigurations are displayed on the [Misconfigurations Findings page][1]. Aggregate misconfigurations by rule using the **Group by** filters and query search bar. For example, filtering by `evaluation:fail` narrows the list to all compliance rules that have issues that need to be addressed. Misconfigurations can also be aggregated by resource to rank resources that have the most failed misconfigurations so you can prioritize remediation.

{{< img src="security/csm/findings_page.png" alt="Cloud Security Misconfigurations Findings page" style="width:100%;">}}

Select a misconfiguration to view the resources that have been evaluated by the rule, the rule description, its framework or industry benchmark mappings, and suggested remediation steps.

{{< img src="security/cspm/findings/finding-side-panel3.png" alt="A list of impacted resources in the side panel" style="width:65%;">}}

Group findings by **Resources** and select a resource to see the full list of compliance rules that were evaluated against the resource, along with their statuses.

{{< img src="security/cspm/findings/resource-rules-evaluated2.png" alt="Group and aggregate by resource in search" style="width:65%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now
[2]: /security/cloud_siem/
[3]: /security/workload_protection/
[4]: /security/default_rules/cis-aws-1.5.0-2.1.5/