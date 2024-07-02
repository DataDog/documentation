---
"app_id": "bonsai"
"app_uuid": "ec3141f4-b722-4eaa-be49-47c6eec76da9"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": bonsai.req.total
      "metadata_path": metadata.csv
      "prefix": bonsai.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10053"
    "source_type_name": Bonsai
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Bonsai
  "sales_email": dev@onemorecloud.com
  "support_email": dev@onemorecloud.com
"categories":
- metrics
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/bonsai/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "bonsai"
"integration_id": "bonsai"
"integration_title": "Bonsai"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "bonsai"
"public_title": "Bonsai"
"short_description": "Bonsai Managed Elasticsearch"
"supported_os":
- linux
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Category::Metrics"
  - "Supported OS::Windows"
  "configuration": "README.md#Setup"
  "description": Bonsai Managed Elasticsearch
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Bonsai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Track request level metrics for your Bonsai clusters to:

- Visualize the performance of your clusters
- Correlate search performance with application performance
- Create alerts

![snapshot][1]

## セットアップ

Integrating your cluster with Datadog requires submitting your API key to the bonsai app.

### Acquire API key

In Datadog, navigate to [Integrations --> API][2] and copy your API Key.

![snapshot][3]

### Submit API key

Navigate to [Bonsai --> Clusters][4] and click the cluster you want to integrate. Navigate to the Manage tab and scroll to the bottom of the page.

Under the "Datadog Integration" section paste your API key and click "Activate Datadog".

![snapshot][5]

### Verify

If your key is valid, you should see the integration as active.

![snapshot][6]

Within a few minutes, request metrics are available in your Datadog dashboard.

## 収集データ

### メトリクス
{{< get-metrics-from-git "bonsai" >}}


Metrics are tagged for each cluster, so you can segment based on clusters. The tags look like:

```text
cluster:my-cluster-slug
```

### イベント

The Bonsai integration does not include any events.

### サービスチェック

The Bonsai integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog Support][8].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/snapshot.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/copy_key.png
[4]: https://app.bonsai.io/clusters
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/activate_datadog.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/datadog_activated.png
[7]: https://github.com/DataDog/integrations-extras/blob/master/bonsai/metadata.csv
[8]: https://docs.datadoghq.com/help/

