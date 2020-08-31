---
aliases:
  - /ja/integrations/apollo_engine
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - モニター
  - キャッシュ
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/apollo/README.md'
display_name: Apollo
git_integration_title: apollo
guid: a0b142ff-0637-4c2f-814c-0f1a012bc65c
integration_id: apollo
integration_title: Apollo
is_public: true
kind: インテグレーション
maintainer: sachin@apollographql.com
manifest_version: 1.1.0
metric_prefix: apollo.engine.
metric_to_check: apollo.engine.operations.count
name: apollo
public_title: Datadog-Apollo インテグレーション
short_description: GraphQL インフラストラクチャーのパフォーマンスを監視
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Apollo Datadog インテグレーションにより、Graph Manager で利用可能なパフォーマンスメトリクスを Datadog に転送できます。Datadog はさらに高度な機能 API をサポートしているため、チームは GraphQL メトリクスのグラフとアラートを作成できます。

![メトリクス][1]

Graph Manager によって転送される Datadog メトリクスは次のとおりです。

- `apollo.engine.operations.count` - 実行された GraphQL 操作の数。これには、クエリ、ミューテーション、エラーになった操作が含まれます。
- `apollo.engine.operations.error_count` - エラーになった GraphQL 操作の数。これには、GraphQL 実行エラーのほか、Graph Manager がサーバーへの接続に失敗した場合の HTTP エラーが含まれます。
- `apollo.engine.operations.cache_hit_count` - Apollo Server のクエリキャッシュ全体から結果が提供された GraphQL クエリの数。
- GraphQL 操作の応答時間のヒストグラム (ミリ秒単位)。Graph Manager の集計方法 (対数ビニング) のため、以下の値の精度は 5% 以内です。

  - `apollo.engine.operations.latency.min`
  - `apollo.engine.operations.latency.median`
  - `apollo.engine.operations.latency.95percentile`
  - `apollo.engine.operations.latency.99percentile`
  - `apollo.engine.operations.latency.max`
  - `apollo.engine.operations.latency.avg`

Datadog に転送されるすべてのメトリクスは 60 秒間隔で集計され、GraphQL 操作名に `operation:<クエリ名>` というタグが付けられます。同じ操作名を持つ一意のクエリシグネチャはマージされ、操作名のないクエリは無視されます。

すべてのメトリクスには、Graph Manager のグラフ ID に `service:<グラフ_ID>`、バリアント名に `variant:<バリアント名>` のタグが付けられるため、Graph Manager の複数のグラフが同じ Datadog アカウントにデータを送信できます。バリアント名を設定していない場合、"current" が使用されます。

Engine プロキシを介してメトリクスを Graph Manager にレポートする場合、Datadog はプロキシの複数のインスタンスにわたって統計をマージします（ホストごとのメトリクスは使用できません）。Graph Manager UI と同様に、クエリバッチ内の各操作は個別にカウントされます。

## セットアップ

### コンフィギュレーション

Apollo Datadog インテグレーションは、Graph Manager に Datadog API キーを提供するだけで簡単にセットアップできます。それ以上の構成は必要ありません。

1. [Datadog インテグレーションページ][2]に移動し、Apollo タイルをクリックします。**Configuration** タブに移動し、一番下までスクロールして、**Install Integration** を押します。

2. [Datadog API ページ][3]に移動して、API キーを作成します。

3. [Graph Manager][4] で、グラフのインテグレーションページに移動します。

   ![IntegrationsPage][5]

4. Datadog インテグレーションを切り替えてオンにします。API キーを貼り付けて、**Save** を押します。すべてのメトリクスにグラフ ID (`service:<グラフ_ID>`) のタグが付けられているため、すべてのグラフに同じ API キーを使用できます。

   ![IntegrationsToggle][6]

5. Datadog メトリクスエクスプローラーに移動し、メトリクスが表示されることを確認します。メトリクスが表示されるまで、最大 5 分お待ちください。

### 使用方法

詳細な使用方法については、[Apollo インテグレーションのドキュメント][7]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "apollo" >}}


### イベント

現時点で、Apollo インテグレーションには、イベントは含まれません。

### サービスチェック

現時点で、Apollo インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

インフラストラクチャーの監視の詳細および Datadog の全インテグレーションについては、[ブログ記事][10]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/metrics.png
[2]: https://app.datadoghq.com/account/settings
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://www.apollographql.com/docs/graph-manager/#viewing-graph-information
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-link.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-toggle.png
[7]: https://www.apollographql.com/docs/graph-manager/datadog-integration/
[8]: https://github.com/DataDog/integrations-extras/blob/master/apollo/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog