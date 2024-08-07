---
title: Data Retention Periods
disable_sidebar: true
aliases:
    - /developers/guide/data-collection-resolution-retention
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
filter_all: All
content: "TK The following table lists the attributes automatically applied to data sent to Datadog by the Agent by each of the RUM, Logs, and APM products, as applicable to the data domain. Optionally, filter the list by product or search by keyword or description text to find the attributes you're interested in. TK"
---

Find below a summary of Datadog data type and default retention period:

| Product | Data Type | Default Retention Period |
|---------|-----------|--------------------------|
| Bits AI | Prompts/Responses | 120 days |
| Event Management | Events | 15 months |
| Continuous Profiler | Profiles | 8 days, 1 year for profiles visualized in UI |
| Continuous Profiler | Profile metrics | 6 months |
| APM | Indexed spans | Maximum 30 days |
| APM | Sampled traces | 30 days | 
| APM | Viewed traces in UI | Indefinite |
| APM | Trace metrics | 15 months |

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}
