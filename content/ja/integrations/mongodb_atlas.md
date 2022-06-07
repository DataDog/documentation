---
categories:
  - data store
  - cloud
ddtype: crawler
dependencies: []
description: MongoDB Atlas は、算出メトリクスを Datadog にプッシュして、アラートパフォーマンスを視覚化できます。
doc_link: https://docs.datadoghq.com/integrations/mongodb_atlas/
draft: false
further_reading:
  - link: https://www.datadoghq.com/blog/monitor-mongodb-atlas-for-government-datadog/
    tag: ブログ
    text: Datadog で MongoDB Atlas for Government を監視する
git_integration_title: mongodb_atlas
has_logo: true
integration_id: mongodb-atlas
integration_title: MongoDB Atlas
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
monitors:
  '[MongoDB Atlas] CPU usage is higher than average on host: {{host.name}} ': assets/monitors/high_cpu.json
  '[MongoDB Atlas] Efficiency of queries are degrading': assets/monitors/query_efficiency.json
  '[MongoDB Atlas] Memory usage is higher than average on host: {{host.name}}': assets/monitors/memory.json
  '[MongoDB Atlas] Read Latency is higher than average for host: {{host.name}}': assets/monitors/read_latency.json
  '[MongoDB Atlas] Write Latency is higher than average for host: {{host.name}}': assets/monitors/write_latency.json
name: mongodb_atlas
public_title: Datadog-MongoDB Atlas インテグレーション
short_description: MongoDB Atlas は、算出メトリクスを Datadog にプッシュできます
team: web-integrations
version: '1.0'
---
## 概要

{{< site-region region="us3" >}}
**このインテグレーションは、このサイトではサポートされていません。**
{{< /site-region >}}

MongoDB Atlas は、算出メトリクスを Datadog にプッシュして、以下のことができます。

- MongoDB Atlas のキーメトリクスを視覚化できます。
- MongoDB Atlas のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

**注: このインテグレーションは、M10+ クラスターでの未利用可能です。**

## セットアップ

### インストール

MongoDB Atlas インテグレーションは、Atlas ポータルにログインすることによってインストールできます。

### コンフィギュレーション

1. Datadog [API キー][1]を取得または作成します。
2. [Atlas ポータル][2]の **Integrations** -> **Datadog Settings** で、Datadog API キーを入力します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mongodb_atlas" >}}


### イベント

MongoDB Atlas は、Datadog に[アラート][4]をイベントとしてプッシュできます。

### サービスのチェック

MongoDB Atlas インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.atlas.mongodb.com/tutorial/monitoring-integrations/#procedure
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/mongodb_atlas/mongodb_atlas_metadata.csv
[4]: https://www.mongodb.com/blog/post/push-your-mongodb-atlas-alerts-to-datadog
[5]: https://docs.datadoghq.com/ja/help/