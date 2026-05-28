---
title: Crown Jewels
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

{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="Join the Preview!">}}
Crown Jewels is in Preview. Use this form to submit your request today.
{{< /callout >}}

## Overview

Crown Jewels is an inventory of your most critical cloud resources, automatically detected from the telemetry you already send to Datadog. The list is the starting point for prioritizing remediation work across Cloud Security: you can sort, filter and route vulnerabilities, misconfigurations, and identity risks that are linked to a crown jewel differently from the rest of your findings.

Most security teams have more findings than they can act on, but by knowing which resources matter most, you can start addressing the subset of findings that need attention first.

Datadog generates the initial list for you by applying a set of detection rules across different sources of telemetry, including APM, logs, and cloud storage. From there, you can curate the list to match what matters most in your environment.

## What gets detected

Crown Jewels evaluates three resource types:

| Resource Type | Data evaluated |
|---|---|
| Services | APM-instrumented services and inferred services |
| Databases | Database instances observed through APM and Database Monitoring |
| Buckets | S3 buckets observed by Agentless Scanning and Sensitive Data Scanner |

Datadog adds a resource to the list when one or more detection signals indicate that the resource handles sensitive data, holds credentials, or sits at a structurally important position in your environment.

### Detection signals

| Signal | Source | Example |
|---|---|---|
| Secrets in APM spans | APM trace data | A service with AWS access keys observed in span attributes |
| Sensitive fields in logs | Sensitive Data Scanner | A service with credit card numbers, emails, or credentials detected in log events |
| Sensitive column names | APM Database Monitoring | A database with columns named `password`, `ssn`, `email`, etc. |
| Sensitive data at rest | Agentless Scanning + Sensitive Data Scanner | An S3 bucket containing PII, credentials, or other sensitive content |
| Dependency choke point | APM service map | A service with high upstream caller count (failure or compromise has broad blast radius) |

Crown Jewels can only make detections based on the telemetry sources that are enabled for a given resource. Coverage scales with the depth of your Datadog instrumentation.

## Use the list to filter findings

Every resource on the Crown Jewels list is tagged `@risk.is_crown_jewel:true`. The tag propagates to findings associated with that resource through Datadog's security data model. All of the following would be marked as crown jewel findings:

- A misconfiguration on a virtual machine attached to a crown jewel service
- A vulnerability in a container image running on a crown jewel service
- An identity risk involving a role with access to a crown jewel resource

This propagation lets you use `@risk.is_crown_jewel:true` as a filter or facet in:

- **Vulnerability Explorer** to focus remediation on findings tied to critical resources.
- **Misconfiguration Explorer** to scope hardening work (including identity risks) to the assets that matter most.

You can combine the filter with other criteria; for example, you can filter the Vulnerability Explorer to `severity:critical` AND `@risk.is_crown_jewel:true`.

## Review and edit the list

To view your Crown Jewels, go to **Security** > **Settings** > **Cloud Security** > [**Crown Jewels**][1]. Datadog automatically populates the list with entries showing:

- The resource type and name.
- The detection signal that triggered inclusion.
- A summary of the underlying evidence.

Treat the automatically generated list as a draft that you can curate so it reflects what is actually critical to your business. You can:

- **Remove** entries that do not match your understanding of what is critical (for example, a service flagged because of a low-value URL string).
- **Add** resources Datadog did not auto-detect but that you know are critical to your business.


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


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/critical-asset
