---
"categories":
- "cloud"
- "google cloud"
- "log collection"
- "ai/ml"
"custom_kind": "integration"
"dependencies": []
"description": "Track key Google Cloud Machine Learning metrics."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_ml/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/"
  "tag": "Blog"
  "text": "Best practices for monitoring ML models in production"
"git_integration_title": "google_cloud_ml"
"has_logo": true
"integration_id": "google-cloud-ml"
"integration_title": "Google Machine Learning"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_ml"
"public_title": "Datadog-Google Machine Learning Integration"
"short_description": "Track key Google Cloud Machine Learning metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Machine Learning is a managed service that enables you to easily build machine learning models, that work on any type of data, of any size.

Get metrics from Google Machine Learning to:

- Visualize the performance of your ML Services.
- Correlate the performance of your ML Services with your applications.

## Setup

### Installation

If you haven't already, set up the [Google Cloud Platform integration first][1]. There are no other installation steps that need to be performed.

### Log collection

Google Cloud Machine Learning logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud Machine Learning logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud Machine Learning logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "google_cloud_ml" >}}


### Events

The Google Cloud Machine Learning integration does not include any events.

### Service Checks

The Google Cloud Machine Learning integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_ml/google_cloud_ml_metadata.csv
[5]: https://docs.datadoghq.com/help/

