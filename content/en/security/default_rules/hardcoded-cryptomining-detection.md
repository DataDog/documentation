---
aliases:
- o2v-dml-922
- /security_monitoring/default_rules/o2v-dml-922
- /security_monitoring/default_rules/hardcoded-cryptomining-detection
disable_edit: true
integration_id: multi log sources
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: multi log sources
tactic: TA0040-impact
technique: T1496-resource-hijacking
threat_intel_category: cryptomining
title: Potential cryptomining detected through IP callback
type: security_rules
---

## Goal
Detect when a host is potentially infected with a cryptominer.

## Strategy
This rule compares the `@network.client.ip` standard attribute to a curated list of cryptomining pools.

## Triage and response
1. Determine if the `{{host}}` host should be contacting a cryptomining pool.
2. If not, begin your company's IR process.

**Note** You can use the signal sidepanel to assist with the initial investigation by looking at CPU utilization and processes to identify unauthorized activity.

## Changelog
- 8 April 2022 - Initial beta release to select organizations.
- 13 April 2022 - Added additional filters for specific ports to reduce false positives. 
- 26 April 2022 - Removed restrictedToOrgs settings, launching rule to all of production.
