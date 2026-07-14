---
categories:
- cloud
- containers
- google cloud
- log collection
custom_kind: integration
dependencies: []
description: GCE コンテナのリソースの使用状況を監視。
doc_link: https://docs.datadoghq.com/integrations/google_container_engine/
draft: false
git_integration_title: google_container_engine
has_logo: true
integration_id: google-container-engine
integration_title: Google Container Engine
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_container_engine
public_title: Datadog-Google Container Engine インテグレーション
short_description: GCE コンテナのリソースの使用状況を監視。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

<div class="alert alert-danger">
このインテグレーションは非推奨です。代わりに、<a href="https://docs.datadoghq.com/integrations/google_kubernetes_engine">Google Kubernetes Engine インテグレーション</a>のドキュメントをご覧ください。非推奨のメトリクスについては、<a href="https://cloud.google.com/monitoring/api/metrics_gcp#gcp-container">Google Cloud のメトリクス</a>のドキュメントを参照してください。
</div>

## 収集データ

### メトリクス
{{< get-metrics-from-git "google-container-engine" >}}


### イベント

Google Container Engine インテグレーションには、イベントは含まれません。

### サービスチェック

Google Container Engine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://github.com/DataDog/dogweb/blob/prod/integration/google_container_engine/google_container_engine_metadata.csv
[2]: https://docs.datadoghq.com/ja/help/
