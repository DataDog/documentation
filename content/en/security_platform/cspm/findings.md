---
title: Findings Explorer
kind: documentation
aliases:
  - /security_platform/findings
further_reading:
- link: "security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration rules"
- link: "security_platform/cspm/frameworks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
---

{{< site-region region="us" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is currently in public beta.
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED or US3.
</div>
{{< /site-region >}}

## Overview

The Posture Findings page allows you to:

- View more details about your posture findings
- Review the rules applied to your resources by CSPM
- Review details about resource configurations
- Read descriptions and guidelines based on industry resources for remediating a misconfigured resource
- Use the “time selector” to explore security configuration posture, including the configuration of individual resources, at any point in the past.

{{< img src="security_platform/cspm/findings/findings-time-window.png" alt="Set a findings time window using the dropdown" style="width:65%;">}}

## Findings

A finding is the primary primitive for a rule evaluation against a resource. Every time a resource is evaluated against a rule, a finding is generated with a **Pass** or **Fail** status. Resources are evaluated in increments between 15 minutes or up to 4 hours (depending on type). Datadog generates new findings as soon as a new scan is completed, and stores a complete history of all findings for the past 15 months so they are available in case of an investigation or audit.

{{< img src="security_platform/cspm/findings/posture-management-overview.png" alt="An overview of the Posture Management Findings page" style="width:100%;">}}

Clicking on an individual finding that has **failed** to see details about the misconfigured resource, the rule description, its framework or industry benchmark mapping, and suggested remediation steps.

{{< img src="security_platform/cspm/findings/signal-overview.png" alt="Failed signals in the side panel" style="width:65%;">}}

Aggregate findings by rule using the query search bar. This view provides a checklist of all of the rules that Datadog scans. Filtering by `evaluation:fail` status narrows the list to all rules that have issues that need to be addressed. The side panel shows details of each resource that has been evaluated by the rule.

{{< img src="security_platform/cspm/findings/evaluation-fail.png" alt="Filtering by evaluation fail" style="width:100%;">}}

Findings can also be aggregated by resource to rank order resources that have failed the most rule evaluations so you can prioritize remediation.

{{< img src="security_platform/cspm/findings/no-security-group-ingress.png" alt="Ranked order resources in the side panel" style="width:65%;">}}

The side panel lists rules that were evaluated against the resource, some of which you may choose to be addressed to improve your security configuration posture.

{{< img src="security_platform/cspm/findings/eval-fail-group-by-resource.png" alt="Group and aggregate by resource in search" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
