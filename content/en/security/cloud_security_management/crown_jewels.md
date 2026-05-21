---
title: Crown Jewels
is_beta: true
further_reading:
- link: "/security/cloud_security_management/misconfigurations/"
  tag: "Documentation"
  text: "Cloud Security Misconfigurations"
- link: "/security/cloud_security_management/vulnerabilities/"
  tag: "Documentation"
  text: "Cloud Security Vulnerabilities"
- link: "/security/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Sensitive Data Scanner"
---

<div class="alert alert-info">
Crown Jewels is in Preview. To request access, contact your Datadog account team or reach out to <a href="mailto:support@datadoghq.com">support@datadoghq.com</a>.
</div>

## Overview

Crown Jewels is an inventory of your most critical cloud resources, automatically detected from the telemetry you already send to Datadog. The list is the starting point for prioritizing security work across Cloud Security: vulnerabilities, misconfigurations, and identity risks linked to a crown jewel can be filtered, sorted, and routed differently from the rest of your findings.

The goal is straightforward. Most security teams have more findings than they can act on. Knowing which resources matter most lets you cut a large queue into the subset that needs attention first.

Datadog generates the initial list for you by applying a set of detection rules across different sources of telemetry, including APM, logs, and cloud storage. From there, you can curate the list to match what matters most in your environment.

## What gets detected

Crown Jewels evaluates three resource types in Preview:

| Resource Type | What we look at |
|---|---|
| Services | APM-instrumented services and inferred services |
| Databases | Database instances observed through APM and Database Monitoring |
| Buckets | S3 buckets observed by Agentless Scanning and Sensitive Data Scanner |

A resource is added to the list when one or more detection signals indicate that it handles sensitive data, holds credentials, or sits at a structurally important position in your environment.

### Detection signals

| Signal | Source | Example |
|---|---|---|
| Secrets in APM spans | APM trace data | A service with AWS access keys observed in span attributes |
| Sensitive fields in logs | Sensitive Data Scanner | A service with credit card numbers, emails, or credentials detected in log events |
| Sensitive column names | APM Database Monitoring | A database with columns named `password`, `ssn`, `email`, etc. |
| Sensitive data at rest | Agentless Scanning + Sensitive Data Scanner | An S3 bucket containing PII, credentials, or other sensitive content |
| Dependency choke point | APM service map | A service with high upstream caller count (failure or compromise has broad blast radius) |

If none of these telemetry sources are enabled for a given resource, Crown Jewels cannot detect it. Coverage scales with the depth of your Datadog instrumentation.

## How the list is used

Every resource on the Crown Jewels list is tagged `@risk.is_crown_jewel:true`. The tag propagates to findings associated with that resource through Datadog's security data model:

- A misconfiguration on a virtual machine attached to a crown jewel service is marked as a crown jewel finding.
- A vulnerability in a container image running on a crown jewel service is marked as a crown jewel finding.
- An identity risk involving a role with access to a crown jewel resource is marked as a crown jewel finding.

This propagation lets you use `@risk.is_crown_jewel:true` as a filter or facet in:

- **Vulnerability Explorer** to focus remediation on findings tied to critical resources.
- **Misconfiguration Explorer** to scope hardening work (including identity risks) to the assets that matter most.

A typical pattern: filter Vulnerability Explorer to `severity:critical` AND `@risk.is_crown_jewel:true`.

## Reviewing and editing the list

When you open the Crown Jewels page, Datadog has already populated the list. Each entry shows:

- The resource type and name.
- The detection signal that triggered inclusion.
- A summary of the underlying evidence.

Treat the auto-generated list as a draft. You can:

- **Remove** entries that do not match your understanding of what is critical (for example, a service flagged because of a low-value URL string).
- **Add** resources Datadog did not auto-detect but that you know are critical to your business.

We encourage you to curate the list so it reflects what is actually critical to your business.

## Soft requirements

Crown Jewels relies on telemetry from other Datadog products. The richer your instrumentation, the more accurate the auto-detected list. None of the items below are strictly required, you still get value from Crown Jewels without them, but each one increases the surface Datadog can evaluate.

| To detect | You need |
|---|---|
| Services | APM enabled on the workload |
| Database column names | APM with Database Monitoring instrumented queries |
| Sensitive data in logs | Sensitive Data Scanner enabled on relevant log indexes |
| Sensitive data in S3 | Agentless Scanning enabled with Sensitive Data Scanner for cloud storage |
| Dependency choke points | APM service map populated (multiple instrumented services calling the target) |

Crown Jewels does not require any new instrumentation. If a telemetry source is missing, the detection signals that depend on it are unavailable, and you can still add the corresponding resources manually.

## Privacy and data handling

Crown Jewels runs on telemetry you have already sent to Datadog. It does not move data outside of your Datadog account or send data to third parties. Detection runs in the same regional infrastructure as your other Cloud Security data.

## Requesting access

Crown Jewels is rolled out per organization during Preview. To enable it on your Datadog organization:

- Contact your Datadog account team, or
- Email [support@datadoghq.com](mailto:support@datadoghq.com) referencing "Crown Jewels Preview access."

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
