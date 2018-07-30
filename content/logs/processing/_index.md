---
title: Processing
kind: documentation
description: "Parse & Enrich your logs to create valuable facets & metrics in the Logs Explorer."
further_reading:
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "logs/faq/how-to-investigate-a-log-parsing-issue"
  tag: "FAQ"
  text: How to investigate a log parsing issue?
- link: "logs/faq/log-parsing-best-practice"
  tag: "FAQ"
  text: Log Parsing - Best Practice
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: Control the volume of logs indexed by Datadog
---

## Overview

To access the processing panel use the left `Logs` menu:

{{< img src="logs/processing/processing_panel.png" alt="Pipelines panel" responsive="true" style="width:50%;" >}}

## Technical limits

To make sure the Log Management solution functions in an optimal way we set the following technical limits and rules to your log events as well as to some product features. These have been designed so you may never reach them.

### Limits applied to ingested log events

* The size of a log event should not exceed 25K bytes.
* Log events can be submitted up to 6h in the past and 2h in the future.
* A log event once converted to JSON format should contain less than 256 attributes, each of those attribute’s key should be less than 50 characters, be nested in less than 10 successive levels and their respective value be less than 1024 characters if promoted as a facet.
* A log event should not have more than 100 tags and each tag should not exceed 256 characters for a maximum of 10 millions unique tag per day.

Log events which do not comply with these limits might be transformed or truncated by the system. Or simply not indexed if outside of the provided time range. However, be sure that Datadog always tries to do its best to preserve as much as possible the provided user data.

### Limits applied to provided features

* The maximum number of facets is 100.
* The maximum number of processing pipeline on a platform is 100.
* The maximum number of processor per pipeline is 20.
* The maximum number of parsing rule within a grok processor is 10. We reserve the right to disable underperforming parsing rules that might impact our service performance.

Contact support if you reach one of these limits as Datadog might be able to provide you more.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explore/#facets
[2]: /logs/explore/#search-bar
[3]: /logs/processing/parsing
[4]: /logs/processing/#log-date-remapper
[5]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[6]: https://docs.datadoghq.com/getting_started/tagging/#tags-best-practices
