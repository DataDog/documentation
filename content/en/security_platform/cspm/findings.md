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

The Findings page helps drill into the details of CSPM findings, the configuration of resources, and descriptions and remediation guidelines for remediating a misconfigured resource.

The Security Posture Findings page allows you to:

- View more details about your security posture findings;
- Review the rules applied to their resources by CSPM
- Review details about resource configurations
- Read descriptions and guidelines based on industry resources for remediating a misconfigured resource
- Use the “time selector” to explore security configuration posture, including the configuration of individual resources, at any point in the past.

## Findings

A finding is the primary primitive for a rule evaluation against a resource. Every time a resource is evaluated against a rule, a finding is generated with a **Pass** or **Fail** status. Resources are evaluated in increments between 15 minutes or up to 4 hours (depending on type). Datadog generates new findings as soon as a new scan is completed, and stores a complete history of all findings for the past 15 months so they are available in case of an investigation or audit.

[img here]

Clicking on an individual finding that has **failed** to see details about the misconfigured resource, the rule description, its framework or industry benchmark mapping, and suggested remediation steps.

[img here]

Aggregate findings by rule using the query search bar. This view provides a checklist of all of the rules that Datadog scans. Filtering by `evaluation:fail` status narrows the list to all rules that have issues that need to be addressed. The side panel shows details of each resource that has been evaluated by the rule.

[img here]

Findings can also be aggregated by resource to rank order resources that have failed the most rule evaluations so you can prioritize remediation.

[img here]

The side panel lists rules that were evaluated against the resource, some of which you may choose to be addressed to improve your security configuration posture.

[img here]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
