---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/bonsai/README.md'
display_name: Bonsai
draft: false
git_integration_title: bonsai
guid: 3c3a1e28-7fd3-443e-a3e1-0c223326a572
integration_id: bonsai
integration_title: Bonsai
is_public: true
kind: インテグレーション
maintainer: dev@onemorecloud.com
manifest_version: 1.0.0
metric_prefix: bonsai.
metric_to_check: bonsai.req.total
name: bonsai
public_title: Datadog-Bonsai インテグレーション
short_description: 'Bonsai: マネージド型 Elasticsearch'
support: contrib
supported_os:
  - linux
  - windows
---
## 概要

Bonsai クラスターのリクエストレベルのメトリクスを追跡すると、以下のことができます。

- クラスターのパフォーマンスを視覚化できます。
- 検索のパフォーマンスをアプリケーションのパフォーマンスと関連付けることができます。
- アラートを生成できます。

![スナップショット][1]

## セットアップ

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "bonsai" >}}


メトリクスはクラスターごとにタグ付けされるため、クラスターに基づいて分割できます。タグは次のようになります。

```text
cluster:my-cluster-slug
```

### イベント

Bonsai インテグレーションには、イベントは含まれません。

### サービスのチェック

Bonsai インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

インフラストラクチャーの監視の詳細および Datadog の全インテグレーションについては、[ブログ記事][9]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/snapshot.png
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/copy_key.png
[4]: https://app.bonsai.io/clusters
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/activate_datadog.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/datadog_activated.png
[7]: https://github.com/DataDog/integrations-extras/blob/master/bonsai/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog