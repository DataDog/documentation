---
title: IOC Explorer
further_reading:
- link: /security/threat_intelligence/
  tag: documentation
  text: Threat Intelligence
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence
  tag: documentation
  text: Bring Your Own Threat Intelligence
---

{{< callout url="" btn_hidden="true" header="false" >}}
The IOC Explorer is in Preview.
{{< /callout >}}

## Overview

Indicators of Compromise (IOC) are evidence that your systems have experienced a security breach. With the [IOC Explorer][1], you can view more details about compromises, and see related signals and logs.

For more information on the intelligence sources the IOC Explorer displays, see [Threat intelligence sources][2].

## Prerequisites

To view data in the IOC Explorer, all of the following must be true:
- Your organization must subscribe to Cloud SIEM.
- The indicator of compromise must be in a threat feed that was available to Datadog at the time of the log acquisition.
- A log that has a matching entity in threat intelligence must be acquired.
- The log must be in the time frame shown on the Explorer. The time frame is fixed to the last 30 days.

## Use the IOC Explorer

To access the IOC Explorer in Datadog, go to **Security** > **Cloud SIEM** > **Investigate** > [**IOC Explorer**][1].

### Query and filter indicators of compromise

You can write custom queries or apply filters to determine which indicators of compromise you can see in the explorer. You can do so by:
- Severity score
- [Entity type][3]
- [Threat intelligence source][2]
- [Threat intelligence category][4]

Additionally, you can click a column in the Explorer to sort by that column's values.

### Get more context on an indicator of compromise

You can click an indicator of compromise to open a side panel that contains additional information about it:
- When the indicator was first and last seen in a threat intel feed
  <div class="alert alert-info" style="margin-bottom: 0">This is distinct from the first or last time the indicator was seen in a log.</div>
- Any categories and ratings assigned to it, and the sources associated with those ratings
- A breakdown of the indicator's severity score
- Signal matches, which you can view in Signals Explorer
- Related logs, which you can view in Log Explorer

## Understand severity scoring

It's important to have proper context behind how Datadog calculated a severity score for an indicator, so you can properly prioritize its investigation. For example, [IP addresses][5] can be volatile and require frequent reassessments as a result.

In the IOC Explorer side panel, you can see the factors Datadog takes into account. It starts with a base score based on its classification, then raises or lowers the score based on additional factors:
- **Classification**: The base score associated with the indicator's category and intent
- **Corroboration**: Whether the indicator appears on multiple threat intelligent feeds
- **Persistence**: How long threat intelligence feeds have been reporting on the indicator
- **Hosting Type**: Used for IP and domain entity types; evaluates whether the hosting infrastructure is commonly used for attacks
- **Signal Activity**: Whether Datadog has seen the evaluator in your environment

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/ioc-explorer
[2]: /security/threat_intelligence/#threat-intelligence-sources
[3]: /security/threat_intelligence/#entity-types
[4]: /security/threat_intelligence/#threat-intelligence-categories
[5]: /security/threat_intelligence/#ip-addresses-dynamic-and-transient