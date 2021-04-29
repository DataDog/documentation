---
title: CSPM Findings
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

## Overview

The Findings page helps drill into the details of CSPM findings, the configuration of resources, and descriptions and remediation guidelines for remediating a misconfigured resource.

Use the **time selector** to explore compliance posture, including the configuration of individual resources, at any point in the past.

## Findings

A finding is the primary primitive for a rule evaluation against a resource. Every time a resource is evaluated against a rule, a finding is generated with a **Pass** or **Fail** status. Resources are evaluated every 15 minutes or up to 4 hours (depending on type). Datadog generates new findings as soon as a new scan is completed, and stores a complete history of all findings for the past 15 months so they are available in the case of a breach forensics investigation or rigorous compliance audit.

[img here]

Click on an individual finding to see details about the misconfigured resource, the rule description, its compliance or industry benchmark mapping, and remediation steps.

[img here]

Findings can be aggregated by rule using the query search bar. This view provides a checklist of all of the rules that Datadog scans. Filtering by `evaluation:fail` status narrows the list to all rules that have issues that need to be addressed. The side panel shows details of each resource that has been evaluated by the rule.

[img here]

Findings can also be aggregated by resource to rank order resources with the most violations that need immediate attention.

[img here]

The side panel lists rules that were evaluated against the resource, some of which need to be addressed to improve compliance posture.

[img here]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
