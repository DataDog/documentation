---
title: Global Known-Good Indicators
description: "Learn how Datadog-managed known-good indicators reduce false-positive threat intelligence matches in Cloud SIEM."
further_reading:
- link: /security/threat_intelligence/
  tag: documentation
  text: Threat Intelligence
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
  tag: documentation
  text: Bring Your Own Threat Intelligence
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: documentation
  text: IOC Explorer
---

## Overview

Datadog maintains a global list of known-good indicators for Cloud SIEM. These indicators identify infrastructure or artifacts that Datadog has determined should not be treated as threatening, even when they appear in a third-party threat intelligence feed.

When an incoming log contains an exact match for a global known-good indicator, Cloud SIEM prevents that match from being treated as a threat intelligence finding. This reduces false positives from broadly benign infrastructure while preserving the original log for investigation.

Global known-good indicators are managed by Datadog. You cannot add, remove, or configure these entries for your organization.

## How global known-good indicators work

**Flow**: Incoming log → global known-good check in Cloud SIEM log processing → threat intelligence enrichment → known-good matches are not treated as threat intelligence findings.

Cloud SIEM evaluates global known-good indicators while it enriches incoming logs with threat intelligence:

1. Cloud SIEM extracts supported indicators from the log.
1. Cloud SIEM checks for an exact match against the Datadog-managed known-good list.
1. If an indicator is known good, Cloud SIEM does not treat it as a threat intelligence finding.
1. The original log remains available in Log Explorer for correlation and investigation.

Global known-good indicators affect new logs after the list has propagated through Cloud SIEM processing. They do not change enrichment that was already stored on historical logs.

## Supported indicators and matching

Global known-good indicators support exact matches for:

- IP addresses
- Domains
- SHA-256 file hashes

The known-good list does not use partial domains, wildcard patterns, or CIDR ranges.

## Use global known-good indicators during investigations

Global known-good indicators reduce noise from known false-positive threat intelligence matches. They do not exclude logs from ingestion, retention, or other security analysis.

Continue to investigate relevant log context, detections, and behavioral evidence. An indicator that is known good in one context can still be associated with suspicious activity in another context.

For information about Datadog-curated threat intelligence, see [Threat Intelligence][1]. To add organization-managed threat intelligence, see [Bring Your Own Threat Intelligence][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threat_intelligence/
[2]: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
