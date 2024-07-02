---
"categories":
- cloud
- data stores
- google cloud
- log collection
- ai/ml
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Google Cloud Vertex AI empowers machine learning developers to train high-quality custom machine learning models with minimal machine learning expertise and effort."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_vertex_ai/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/"
  "tag": Blog
  "text": Monitor Google Cloud Vertex AI with Datadog
"git_integration_title": "google_cloud_vertex_ai"
"has_logo": true
"integration_id": "google-cloud-vertex-ai"
"integration_title": "Google Cloud Vertex AI"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"monitors":
  "[Google Cloud Vertex AI] Fluctuating Replica Count": assets/monitors/fluctuating_replica_count_monitor.json
  "[Google Cloud Vertex AI] High CPU Utilization": assets/monitors/high_cpu_util_monitor.json
  "[Google Cloud Vertex AI] High Memory Usage": assets/monitors/high_memory_usage_monitor.json
"name": "google_cloud_vertex_ai"
"public_title": "Datadog-Google Cloud Vertex AI Integration"
"short_description": "Train high-quality custom machine learning models with minimal machine learning expertise and effort."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Vertex AI empowers machine learning developers, data scientists, and data engineers to take their projects from 
ideation to deployment, quickly and cost-effectively. Train high-quality custom machine learning models with minimal
machine learning expertise and effort.

## セットアップ

### インストール

#### Metric collection

Google Cloud Vertex AI is included in the [Google Cloud Platform integration][1] package. 
If you haven't already, set up the [Google Cloud Platform integration][1] first to begin collecting out-of-the-box metrics. 

#### 構成

To collect Vertex AI labels as tags, enable the Cloud Asset Viewer role.

You can use [service account impersonation][2] and automatic project discovery to integrate Datadog with [Google Cloud][1].

This method enables you to monitor all projects visible to a service account by assigning IAM roles 
in the relevant projects. You can assign these roles to projects individually, or you can configure 
Datadog to monitor groups of projects by assigning these roles at the organization or folder level. 
Assigning roles in this way allows Datadog to automatically discover and monitor all projects in the 
given scope, including any new projects that may be added to the group in the future. 

#### Log collection

Google Cloud Vertex AI logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][3].

Once this is done, export your Google Cloud Vertex AI logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][4] and filter Google Cloud Vertex AI logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_vertex_ai" >}}


### サービスチェック

Google Cloud Vertex AI does not include any service checks.

### イベント

Google Cloud Vertex AI does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[3]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[4]: https://console.cloud.google.com/logs/viewer
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_vertex_ai/metadata.csv
[6]: https://docs.datadoghq.com/help/

