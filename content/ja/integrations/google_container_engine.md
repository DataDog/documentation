---
"categories":
- "cloud"
- "containers"
- "google cloud"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "GCE コンテナのリソースの使用状況を監視。"
"doc_link": "https://docs.datadoghq.com/integrations/google_container_engine/"
"draft": false
"git_integration_title": "google_container_engine"
"has_logo": true
"integration_id": "google-container-engine"
"integration_title": "Google Container Engine"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_container_engine"
"public_title": "Datadog-Google Container Engine Integration"
"short_description": "Monitor your GCE containers' resource usage."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

<div class="alert alert-warning">
This integration is deprecated. Instead, see the <a href="https://docs.datadoghq.com/integrations/google_kubernetes_engine">Google Kubernetes Engine integration</a> documentation. For more details about deprecated metrics, see the <a href="https://cloud.google.com/monitoring/api/metrics_gcp#gcp-container">Google Cloud metrics</a> documentation.
</div>

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_container_engine" >}}


### イベント

The Google Container Engine integration does not include any events.

### サービスチェック

The Google Container Engine integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][2].

[1]: https://github.com/DataDog/dogweb/blob/prod/integration/google_container_engine/google_container_engine_metadata.csv
[2]: https://docs.datadoghq.com/help/

