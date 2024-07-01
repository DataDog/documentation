---
"categories":
- "cloud"
- "google cloud"
"custom_kind": "integration"
"dependencies": []
"description": "Track the size of logs ingested into Google Cloud Logging."
"doc_link": "https://docs.datadoghq.com/integrations/google_stackdriver_logging/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/collect-stackdriver-logs-with-datadog/"
  "tag": "Blog"
  "text": "Collect Google Cloud logs with Datadog"
"git_integration_title": "google_stackdriver_logging"
"has_logo": true
"integration_id": "google-stackdriver-logging"
"integration_title": "Google Cloud Logging"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_stackdriver_logging"
"public_title": "Datadog-Google Cloud Logging Integration"
"short_description": "Track the size of logs ingested into Google Stackdriver."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Google Cloud Logging product allows you to store, search, analyze, monitor, and alert on log data and events from Google Cloud Platform.

Datadog pulls **metrics** from Google Cloud Logging to:

- Visualize the performance of your Google Cloud logs.
- Correlate the performance of your Google Cloud logs with your applications.

## Setup

### Installation

Metrics from Google Cloud logs are included as part of the [Google Cloud Platform integration][1]. There are no additional installation steps required.

### Log collection

Google Cloud logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

## Data Collected

### Metrics
{{< get-metrics-from-git "google_stackdriver_logging" >}}


**Note**: Datadog collects Google Cloud Logging [user-defined metrics][4] with the prefix `gcp.logging.user`.

### Events

The Google Cloud Logging integration does not include any events.

### Service Checks

The Google Cloud Logging integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_stackdriver_loggin/google_stackdriver_logging_metadata.csv
[4]: https://cloud.google.com/logging/docs/logs-based-metrics/#user-defined_metrics_interface
[5]: https://docs.datadoghq.com/help/

