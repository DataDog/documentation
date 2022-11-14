---
aliases:
- 63b-aux-345
- /security_monitoring/default_rules/63b-aux-345
- /security_monitoring/default_rules/cis-gcp-1.3.0-2.2
disable_edit: true
integration_id: google_logging_log_sink
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_logging_log_sink
title: Log sinks are configured for all log entries
type: security_rules
---

## Description: 
It is recommended to create a sink that will export copies of all log entries. This can help aggregate logs from multiple projects and export them to a Security Information and Event Management (SIEM).

## Rationale: 
Log entries are held in Cloud Logging. To aggregate logs, export them to a SIEM. To keep them longer, it is recommended to set up a log sink. To export logs, create a filter that selects the log entries to export, and then choose a destination, such as Cloud Storage, BigQuery, or Cloud Pub/Sub, to which to export them. The filter and destination are held in an object called a sink. To ensure all log entries are exported to sinks, ensure that there is no filter configured for a sink. Sinks can be created in projects, organizations, folders, and billing accounts.

**Note:**
1. A sink created by [these commands](#from-the-command-line), exports logs to storage buckets. However, sinks can be configured to export logs to BigQuery, or Cloud Pub/Sub, or a `Custom Destination`.
2. While creating a sink, do not use the sink option `--log-filter` to ensure the sink exports all log entries.
3. A sink can be created at a folder or organization level that collects the logs of all the projects underneath, bypassing the option `--include-children` in the `gcloud` command.

### Impact: 
There are no costs or limitations in Cloud Logging for exporting logs, but the destinations to which the logs are exported charge for storing or transmitting the log data.

### Default value:
By default, there are no sinks configured.

## Remediation: 

### From the console
1. Go to the Logs Router page by visiting [https://console.cloud.google.com/logs/router][1].
2. Click **CREATE SINK**.
3. Fill out the fields for the Sink details sections.
4. Select **Cloud Logging bucket** in the Select sink destination dropdown menu.
5. Select a log bucket in the Sink destination drop down menu.
6. If an inclusion filter is not provided for this sink, all ingested logs will be routed to the destination provided above. This may result in higher than expected resource usage.
7. Click **Create Sink**.

### From the command line

1. To create a sink to export all log entries in a Google Cloud Storage bucket:
   ```
   gcloud logging sinks create <sink-name>
   storage.googleapis.com/DESTINATION_BUCKET_NAME
   ```
2. Sinks can be created for a folder or organization, which will include all projects.
   ```
   gcloud logging sinks create <sink-name> 
   storage.googleapis.com/DESTINATION_BUCKET_NAME --include-children -- folder=FOLDER_ID | --organization=ORGANIZATION_ID
   ```

## References:
1. [https://cloud.google.com/logging/docs/reference/tools/gcloud-logging][2] 
2. [https://cloud.google.com/logging/quotas][3]
3. [https://cloud.google.com/logging/docs/routing/overview][4]
4. [https://cloud.google.com/logging/docs/export/using_exported_logs][5]
5. [https://cloud.google.com/logging/docs/export/configure_export_v2][6]
6. [https://cloud.google.com/logging/docs/export/aggregated_exports][7]
7. [https://cloud.google.com/sdk/gcloud/reference/beta/logging/sinks/list][8]

[1]: https://console.cloud.google.com/logs/router
[2]: https://cloud.google.com/logging/docs/reference/tools/gcloud-logging
[3]: https://cloud.google.com/logging/quotas
[4]: https://cloud.google.com/logging/docs/routing/overview
[5]: https://cloud.google.com/logging/docs/export/using_exported_logs
[6]: https://cloud.google.com/logging/docs/export/configure_export_v2
[7]: https://cloud.google.com/logging/docs/export/aggregated_exports
[8]: https://cloud.google.com/sdk/gcloud/reference/beta/logging/sinks/list
