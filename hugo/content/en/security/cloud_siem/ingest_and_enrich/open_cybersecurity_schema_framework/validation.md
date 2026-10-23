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

Cloud SIEM validates samples of security logs mapped to OCSF against the schema declared in each log. The [Cloud SIEM - OCSF Log Quality dashboard][3] helps you identify sources with mapping issues and track log quality after making changes. For background on the schema and supported pipelines, see [Open Cybersecurity Schema Framework in Cloud SIEM][1].

## Configure validation outputs

1. Navigate to [**Security > Cloud SIEM > Settings > OCSF Validation**][2].
1. Turn on **Enable OCSF validation outputs** to send validation metrics to your organization. This setting is on by default.
1. Optionally, turn on **Send detailed finding logs** to receive a log for each validation error or warning found in sampled records. This setting is off by default.

{{< img src="security/security_monitoring/ocsf/validation_settings.png" alt="OCSF validation settings with validation outputs enabled and detailed finding logs disabled" style="width:100%;" >}}

Finding logs require validation outputs to be enabled. Turning off validation outputs stops both metrics and finding logs. Changes affect subsequent validation results; existing metrics and logs remain available according to their retention settings.

## Explore the OCSF Log Quality dashboard

Open the [Cloud SIEM - OCSF Log Quality dashboard][3] and select a time range with validation results. Use the `source` and `ocsf_version` filters to focus on a log source and schema version. The `error_type` and `warning_type` filters narrow the corresponding analysis widgets. Dashboard counts and percentages describe sampled logs, not all logs from a source.

{{< img src="security/security_monitoring/ocsf/validation_dashboard.png" alt="Top of the Cloud SIEM OCSF Log Quality dashboard showing filters and Validation Quality widgets" style="width:100%;" >}}

| Dashboard section | What it shows | How to use it |
| --- | --- | --- |
| Validation Quality | Counts of sampled, valid, and invalid logs; active OCSF sources; validation success rate; and average required-field coverage. **Validation Success Rate** is the percentage of sampled logs without errors. **Avg Required Fields %** is the average proportion of required OCSF fields present in sampled logs. | Compare the success-rate trend with the counts and field coverage to see whether quality is improving. |
| Attribute Coverage | Average required- and recommended-field coverage over time, plus average and minimum coverage by source. Coverage measures whether fields are present, not whether their values are correct. | Find sources with missing fields and compare their average coverage with the lowest observed coverage. |
| Failed Log Validation Groups | Sources with the most invalid sampled logs and recurring validation error log patterns. | Identify an affected source and inspect repeated failures. Log patterns require detailed finding logs to be enabled. |
| Error Analysis | Validation error counts by type and source, including a trend by error type. A log with an error is invalid, and one log can produce multiple errors. | Find the most common schema failures and the sources they affect. Error counts can exceed invalid-log counts. |
| Warning Analysis | Warning counts by type and source. Warnings can occur on otherwise valid logs, and one log can produce multiple warnings. | Review potential quality gaps after addressing validation errors. |

If the dashboard has no data, check the selected time range, whether the source has OCSF-mapped logs, and whether validation outputs are enabled. No data does not mean that all logs are valid.

### Investigate a failed source

1. In the dashboard, set the `source` filter to a source with invalid logs or low field coverage.
1. Use **Error Analysis** to find the most common error type. If detailed finding logs are enabled, inspect **Validation Error Log Patterns** or search Logs Explorer for `service:ocsf-runtime-validation` and the source. Finding logs include the validation message, type, OCSF attribute path, and a `log_url` link to the sampled original log.
1. Open the original log and inspect its `ocsf` attributes. Compare the affected field with the OCSF schema for that log's class and version. The `log_url` link points to the original log, which must still be available and accessible to you.
1. Correct an editable source mapping, such as a [custom OCSF processor][5], or review the source data and relevant [integration pipeline][4]. Then compare the source's results after a later validation run.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[2]: https://app.datadoghq.com/security/configuration/siem/ocsf
[3]: https://app.datadoghq.com/dash/integration/32530/cloud-siem---ocsf-log-quality
[4]: /logs/log_configuration/pipelines/?tab=source#integration-pipelines
[5]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/
