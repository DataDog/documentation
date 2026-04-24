---
title: IOC Explorer
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026"
  tag: "Blog"
  text: "What's new in Cloud SIEM: AI-powered investigations, enhanced threat intelligence, and scalable security operations"
- link: /security/threat_intelligence/
  tag: documentation
  text: Threat Intelligence
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence
  tag: documentation
  text: Bring Your Own Threat Intelligence
---

## Overview

Indicators of Compromise (IOC) are evidence that your systems have experienced a security breach. The [IOC Explorer][1] is a searchable, filterable investigation surface where you can investigate, sort, and prioritize compromises. You can also view related matches in Signals Explorer and Logs Explorer, so you can investigate potential compromises in more detail.

{{< img src="security/security_monitoring/ioc_explorer_2.png" alt="The IOC Explorer, showing an IP address that has been flagged as an indicator of compromise" style="width:100%;" >}}

## Prerequisites

To view data in the IOC Explorer, all of the following must be true:
- Your organization must subscribe to Cloud SIEM.
- The indicator of compromise must be in a threat feed that was available to Datadog at the time of the log acquisition.
  - For more information on the threat intelligence feeds the IOC Explorer displays content from, see [Threat intelligence sources][2].
- A log that has a matching entity in threat intelligence must be acquired.
- The time frame for the Explorer is fixed to the last 30 days. The log must be from within that time frame. If your organization has recently onboarded, the Explorer shows data from when you onboarded.

## Use the IOC Explorer

To access the IOC Explorer in Datadog, go to **Security** > **Cloud SIEM** > **Investigate** > [**IOC Explorer**][1].

### Query and filter indicators of compromise

You can write custom queries or apply filters to determine which indicators of compromise you can see in the explorer. You can query or filter by:
- Severity score
- Signal name
- [Threat intelligence source][2]
- Tag, including outputs from the scoring engine
- Indicator
- [Indicator type][3]
- [Threat intelligence category][4]
- AS type
- [Matched OCSF fields](#understand-ocsf-matching)

Additionally, you can click a column heading in the Explorer to sort by that column's values.

### Understand OCSF matching

You can turn the **OCSF Matching** toggle on or off to have more control over how Datadog identifies IOC matches.
- Turn the toggle **on** if you want **higher-confidence matches** tied to normalized security attributes:
  - When the toggle is on, IOC matches only appear in the Explorer if values appear in mapped OCSF fields, such as the source IP, destination IP, or client IP. This helps ensure the match reflects the structured meaning of the data, rather than just the presence of the IOC somewhere in the raw log.
- Turn the toggle **off** if you want **broader threat hunting** across the full event payload:
  - When the toggle is off, IOC matches appear in the Explorer if IOCs appear anywhere in the event, including unstructured text like a message body, or other freeform fields.

#### Example

Alice sends Bob an email, with the message body mentioning `192.0.2.100` as part of a discussion about an emerging threat.
- If the OCSF Matching toggle is **on**, Datadog only matches IOCs found in the relevant mapped OCSF fields, such as Alice or Bob's IP addresses, if those are captured in normalized network fields. It doesn't match `192.0.2.100` because it only appears in the email body, not in a mapped OCSF field. The IOC doesn't appear in the IOC Explorer.
- If the OCSF Matching toggle is **off**, Datadog matches `192.0.2.100` from the message body, because it searches across the entire payload, rather than structured OCSF fields only. The IOC appears in the IOC Explorer.

### Get more context on an indicator of compromise

In the IOC Explorer, click an indicator of compromise to view additional information you can use to prioritize your remediation efforts:
- Any categories assigned to the indicator, and the threat intelligence feeds it appeared in
- Any ratings assigned to the indicator, and the threat intelligence feeds associated with those ratings
- A breakdown of the indicator's severity score
- The environment associated with the indicator, including related sources and services
- Related items the indicator can have an impact on
- Links to related investigation surfaces:
  - Signal matches, which you can view in Signals Explorer
  - Related logs, which you can view in Log Explorer

## Understand severity scoring

It's important to have proper context for the severity score for an indicator, so you can properly prioritize investigations. For example, [IP addresses][5] can be volatile and require frequent reassessments as a result.

In the IOC Explorer side panel, you can see the factors that contribute to the severity score. Severity score starts from a base score based on classification, and increases or decreases based on additional factors:
- **Classification**: The base score associated with the indicator's category and intent
- **Corroboration**: Whether the indicator appears on multiple threat intelligent feeds
- **Persistence**: How long threat intelligence feeds have been reporting on the indicator
- **Hosting Type**: Used for IP and domain entity types; evaluates whether the hosting infrastructure type is commonly used for attacks
- **Signal Activity**: Whether the indicator has been observed in Signals

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/ioc-explorer
[2]: /security/threat_intelligence/#threat-intelligence-sources
[3]: /security/threat_intelligence/#entity-types
[4]: /security/threat_intelligence/#threat-intelligence-categories
[5]: /security/threat_intelligence/#ip-addresses-dynamic-and-transient