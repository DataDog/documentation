---
title: Threat intelligence
description: Enrich Workload Protection Agent events with Datadog-curated threat intelligence, or import your own database.
disable_toc: false
further_reading:
  - link: "/security/threat_intelligence/"
    tag: "documentation"
    text: "Threat Intelligence at Datadog"
  - link: "/security/detection_rules/"
    tag: "documentation"
    text: "Detection Rules"
---

Workload Protection enriches [Agent events][1] with [Threat Intelligence][2] curated by Datadog. This enrichment adds reputation context to entities observed on your hosts and containers, such as IP addresses and file hashes, to help you assess whether an event is part of a known malicious campaign.

For general concepts, sources, categories, intents, and life cycle information that apply across all Datadog security products, see [Threat Intelligence][2]. This page covers the details specific to Workload Protection.

## Entity types for Workload Protection

Workload Protection supports the following [entity types][3]:

- IP addresses
- Domains
- File hashes: `SHA1`, `SHA256`, and `ssdeep`

`ssdeep` hashes support fuzzy matching, which helps identify files that are similar, but not identical, to a known malicious file.

## Supported categories for Workload Protection

Workload Protection supports the following threat intelligence categories:

- `malware`
- `exploitation`
- `cryptomining`
- `supply_chain_attack_infrastructure`
- `custom`

For category definitions and intents that apply across Datadog security products, see [Threat intelligence categories][5].

## Using threat intelligence in detection rules

[Detection rules][4] in Workload Protection can reference threat intelligence keys such as category (`@threat_intel.results.category`) and intent (`@threat_intel.results.intention`) in the search query or rule conditions. For example, a rule can trigger when a file executed on a workload matches the hash of a known malware sample, categorized as `malware` with intent `malicious`.

<div class="alert alert-info">Threat intelligence sources and categories are not configurable.</div>

## Threat intelligence facets

Threat intelligence [sources, categories, and intents][6] are available as facets and filters. You can see threat intelligence enrichments on matching events in the [Agent Events Explorer][1] and on the resulting [security signals][7].

## Threat intelligence on security signals

When an Agent event matches a threat intelligence indicator, Workload Protection generates a security signal that displays the matched entity along with its source, category, and intent.

{{< img src="security/workload_protection/detect_and_monitor/threat_intelligence_signal.png" alt="A Workload Protection security signal displaying threat intelligence enrichment details" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/workload_protection/investigate_and_triage/agent_events
[2]: /security/threat_intelligence/
[3]: /security/threat_intelligence/#entity-types
[4]: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /security/threat_intelligence/#threat-intelligence-categories
[6]: /security/threat_intelligence/#threat-intelligence-facets
[7]: /security/workload_protection/investigate_and_triage/security_signals
[8]: /security/workload_protection/investigate_and_triage/security_signals/investigate#correlated-events
