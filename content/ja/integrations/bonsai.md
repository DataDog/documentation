---
app_id: bonsai
app_uuid: ec3141f4-b722-4eaa-be49-47c6eec76da9
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: bonsai.req.total
      metadata_path: metadata.csv
      prefix: bonsai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10053
    source_type_name: Bonsai
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Bonsai
  sales_email: dev@onemorecloud.com
  support_email: dev@onemorecloud.com
categories:
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bonsai/README.md
display_on_public_website: true
draft: false
git_integration_title: bonsai
integration_id: bonsai
integration_title: Bonsai
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: bonsai
public_title: Bonsai
short_description: 'Bonsai: マネージド型 Elasticsearch'
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Metrics
  - Supported OS::Windows
  configuration: README.md#Setup
  description: 'Bonsai: マネージド型 Elasticsearch'
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Bonsai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Bonsai クラスターのリクエストレベルのメトリクスを追跡すると、以下のことができます。

- クラスターのパフォーマンスを視覚化できます。
- 検索のパフォーマンスをアプリケーションのパフォーマンスと関連付けることができます。
- アラートを生成できます。

![スナップショット][1]

## 計画と使用

クラスターを Datadog と統合するには、API キーを bonsai アプリに送信する必要があります。

### API キーを取得する

Datadog で、[Integrations --> API][2] に移動して、API キーをコピーします。

![スナップショット][3]

### API キーを送信する

[Bonsai --> Clusters][4] に移動し、統合するクラスターをクリックします。Manage タブに移動し、ページ最下部までスクロールします。

"Datadog Integration" セクションで API キーを貼り付け、"Activate Datadog" をクリックします。

![スナップショット][5]

### 検証する

キーが有効であれば、インテグレーションが Active として表示されます。

![スナップショット][6]

数分以内に、Datadog のダッシュボードでリクエストメトリクスを使用できるようになります。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "bonsai" >}}


メトリクスはクラスターごとにタグ付けされるため、クラスターに基づいて分割できます。タグは次のようになります。

```text
cluster:my-cluster-slug
```

### ヘルプ

Bonsai インテグレーションには、イベントは含まれません。

### ヘルプ

Bonsai インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/snapshot.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/copy_key.png
[4]: https://app.bonsai.io/clusters
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/activate_datadog.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/datadog_activated.png
[7]: https://github.com/DataDog/integrations-extras/blob/master/bonsai/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/