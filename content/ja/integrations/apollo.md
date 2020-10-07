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

Apollo と Datadog のインテグレーションにより、Studio のパフォーマンスメトリクスを Datadog アカウントに転送できます。Datadog は高度な機能 API をサポートしているため、GraphQL メトリクスのグラフとアラートを作成することもできます。

![メトリクス][1]

Studio は次のメトリクスを Datadog に送信します。

- `apollo.engine.operations.count` - 実行された GraphQL 操作の数。これには、クエリ、ミューテーション、エラーになった操作が含まれます。
- `apollo.engine.operations.error_count` - エラーになった GraphQL 操作の数。これには、GraphQL 実行エラーのほか、Studio がサーバーへの接続に失敗した場合の HTTP エラーが含まれます。
- `apollo.engine.operations.cache_hit_count` - Apollo Server のクエリキャッシュ全体から結果が提供された GraphQL クエリの数。
- GraphQL 操作の応答時間のヒストグラム (ミリ秒単位)。Studio の集計方法 (対数ビニング) のため、以下の値の精度は 5% 以内です。

  - `apollo.engine.operations.latency.min`
  - `apollo.engine.operations.latency.median`
  - `apollo.engine.operations.latency.95percentile`
  - `apollo.engine.operations.latency.99percentile`
  - `apollo.engine.operations.latency.max`
  - `apollo.engine.operations.latency.avg`

これらのメトリクスは 60 秒間隔で集計され、GraphQL 操作名に `operation:<query-name>` というタグが付けられます。同じ操作名を持つ一意のクエリシグネチャはマージされ、操作名のないクエリは無視されます。

これらのメトリクスは関連する Studio のグラフ ID (`service:<graph-id>`) および関連するバリアント名 (`variant:<variant-name>`) の双方にタグ付けされるため、Studio の複数のグラフから同じ Datadog アカウントにデータを送信できます。バリアント名を設定していない場合、`current` が使用されます。

## セットアップ

### コンフィギュレーション

Apollo Datadog インテグレーションは、Studio に Datadog API キーとリージョンを提供するだけで簡単にセットアップできます。それ以上の構成は必要ありません。

1. [Datadog インテグレーションページ][2]に移動し、Apollo タイルをクリックします。その後、**Configuration** タブの一番下にある **Install Integration** をクリックします。

2. [Datadog API ページ][3]に移動して、API キーを作成します。

3. ブラウザのアドレスバーで Datadog の API リージョンを確認します。
- ドメイン名が `app.datadoghq.com` の場合、API リージョンは `US` となります。
- ドメイン名が `app.datadoghq.eu` の場合、API リージョンは `EU` となります。

4. [Studio][4] で、グラフのインテグレーションページを開きます。

   ![IntegrationsPage][5]

5. Datadog Forwarding セクションで **Configure** を開き、API キーとリージョンを入力して **Enable** をクリックします。転送されるすべてのメトリクスは対応するグラフ ID (`service:<graph-id>`) でタグ付けされるため、すべてのグラフに対して同じ API キーを使用できます。

   ![IntegrationsToggle][6]

6. Datadog メトリクスエクスプローラーに移動し、メトリクスが表示されることを確認します。メトリクスが表示されるまで、最大 5 分お待ちください。

### 使用方法

詳細な使用方法については、[Apollo インテグレーションのドキュメント][7]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "apollo" >}}


### イベント

現時点で、Apollo インテグレーションには、イベントは含まれません。

### サービスのチェック

現時点で、Apollo インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

インフラストラクチャーの監視の詳細および Datadog の全インテグレーションについては、[ブログ記事][10]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/metrics.png
[2]: https://app.datadoghq.com/account/settings
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://www.apollographql.com/docs/studio/org/graphs/#viewing-graph-information
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-link.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-toggle.png
[7]: https://www.apollographql.com/docs/studio/datadog-integration/
[8]: https://github.com/DataDog/integrations-extras/blob/master/apollo/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog