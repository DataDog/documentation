---
"categories":
- aws
- cloud
- configuration & deployment
- log collection
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Amazon Keyspaces metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_keyspaces/"
"draft": false
"git_integration_title": "amazon_keyspaces"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Keyspaces (for Apache Cassandra)"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_keyspaces"
"public_title": "Datadog-Amazon Keyspaces (for Apache Cassandra) Integration"
"short_description": "Track key Amazon Keyspaces metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Keyspaces (for Apache Cassandra) is a scalable, highly available, and managed Apache Cassandra–compatible database service. With Amazon Keyspaces, you can run your Cassandra workloads on AWS using the same Cassandra application code and developer tools that you use today.

Enable this integration to see all your Keyspaces metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `Cassandra` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Keyspaces (for Apache Cassandra) integration][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_keyspaces" >}}


### イベント

The Amazon Keyspaces integration does not include any events.

### サービスチェック

The Amazon Keyspaces integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-keyspaces
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_keyspaces/amazon_certificate_manager_metadata.csv
[5]: https://docs.datadoghq.com/help/

