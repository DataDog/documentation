---
title: Monitor OCSF Log Quality
description: Use OCSF validation metrics and finding logs to assess and improve the quality of security log mappings.
disable_toc: false
further_reading:
- link: "/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/"
  tag: "Documentation"
  text: "Open Cybersecurity Schema Framework in Cloud SIEM"
- link: "/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/"
  tag: "Documentation"
  text: "Configure an OCSF processor"
- link: "/logs/log_configuration/pipelines/"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Cloud SIEM validates a sample of logs that contain OCSF data against the OCSF schema declared in each log. Use the **Cloud SIEM - OCSF Log Quality** dashboard to find sources with invalid records, inspect field coverage, and track quality after changing a log pipeline. For background on the schema and supported pipelines, see [Open Cybersecurity Schema Framework in Cloud SIEM][1].

Validation reports whether a sampled record conforms to its OCSF schema. A record is **valid** when the validator finds no errors. A valid record can still have warnings. Validation results do not measure whether the underlying security event is accurate or whether every incoming log has an OCSF mapping.

## Configure validation outputs

1. Navigate to [**Cloud SIEM > Configuration > OCSF Validation**][2].
1. Turn on **Enable OCSF validation outputs** to send validation metrics to your organization. This setting is on by default.
1. Optionally, turn on **Send detailed finding logs** to receive a log for each validation error or warning found in sampled records. This setting is off by default.

The finding logs setting is available only when validation outputs are enabled. Turning off validation outputs stops both customer-facing metrics and finding logs, and also turns off the finding logs setting. Re-enabling validation outputs does not automatically re-enable finding logs. Existing metrics and logs remain available according to their retention settings. Changes take effect on subsequent validation runs.

## Explore the OCSF Log Quality dashboard

Open [Dashboards][3] and search for **Cloud SIEM - OCSF Log Quality**. Set a time range that includes recent validation runs. Use the `source` and `ocsf_version` filters to focus on a log source and schema version. The `error_type` and `warning_type` filters narrow the corresponding analysis widgets.

| Dashboard section | What it shows | How to use it |
| --- | --- | --- |
| Validation Quality | Sampled log counts, validation success rate, active OCSF sources, and average required-field coverage. | Check overall quality and whether it changes between runs. |
| Attribute Coverage | Average coverage over time and average and minimum coverage for required and recommended fields by source. | Find sources whose sampled records are missing expected fields. |
| Failed Log Validation Groups | Sources with the most invalid sampled records and patterns in validation error logs. | Prioritize a source, then inspect a pattern for repeated failures. The log patterns require detailed finding logs. |
| Error Analysis | Error counts by type and by source. | Identify the schema failure to correct in a pipeline or source mapping. |
| Warning Analysis | Warning counts by type and source. | Review possible data-quality gaps, including warnings on otherwise valid records. |

**Validation success rate** is the number of valid sampled logs divided by the total number of valid and invalid sampled logs. **Required fields %** and **Recommended fields %** measure the proportion of fields present in each sampled record for those field categories. The dashboard averages those percentages; the per-source tables also show the minimum observed percentage. An error can make a record invalid even when its required-field coverage is high.

### Investigate a failed source

1. In the dashboard, set the `source` filter to a source with invalid logs or low field coverage.
1. Use **Error Analysis** to find the most common error type. If detailed finding logs are enabled, inspect **Validation Error Log Patterns** or search Logs Explorer for `service:ocsf-runtime-validation` and the source. Finding logs include the validation message, type, OCSF attribute path, and a `log_url` link to the sampled original log.
1. Open the original log and inspect its `ocsf` attributes. Compare the affected field with the OCSF schema for that log's class and version.
1. Correct the relevant [integration pipeline][4] or [custom OCSF processor][5], then compare the source's results after a later validation run.

## Understand the data and its limits

- Validation runs every four hours and examines the preceding 60 minutes of OCSF-mapped logs. It samples up to 200 logs per source in that window. Counts and percentages describe those samples, not the full volume of logs or a continuous four-hour period.
- A source appears when its logs contain OCSF version metadata in the sampled window. No dashboard data can mean there were no matching logs, the selected time range excludes a run, customer-facing outputs are disabled, or a run did not produce results. It does not establish that all logs are valid.
- A single sampled log can produce multiple errors or warnings. Error and warning counts therefore need not equal the number of invalid logs.
- Detailed finding logs are separate from the source logs they describe. The `log_url` link points to the sampled source log; access depends on that log's availability and your permissions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[2]: https://app.datadoghq.com/security/configuration/siem/ocsf
[3]: https://app.datadoghq.com/dashboard/lists
[4]: /logs/log_configuration/pipelines/?tab=source#integration-pipelines
[5]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/
