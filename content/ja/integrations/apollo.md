---
app_id: apollo
app_uuid: b39f1239-b97f-4b3b-ab5a-7a888915eedd
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - apollo.operations.count
      - apollo.engine.operations.count
      metadata_path: metadata.csv
      prefix: apollo.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10014
    source_type_name: Apollo Engine
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Apollo
  sales_email: sachin@apollographql.com
  support_email: sachin@apollographql.com
categories:
- キャッシュ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apollo/README.md
display_on_public_website: true
draft: false
git_integration_title: apollo
integration_id: apollo
integration_title: Apollo
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: apollo
public_title: Apollo
short_description: GraphQL インフラストラクチャーのパフォーマンスを監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: GraphQL インフラストラクチャーのパフォーマンスを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Apollo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Apollo と Datadog のインテグレーションにより、Studio のパフォーマンスメトリクスを Datadog アカウントに転送できます。Datadog は高度な機能 API をサポートしているため、GraphQL メトリクスのグラフとアラートを作成することもできます。

![メトリクス][1]

Studio は次のメトリクスを Datadog に送信します。

- `apollo.operations.count` - 実行された GraphQL 操作の数。これには、クエリ、ミューテーション、エラーになった操作が含まれます。
- `apollo.operations.error_count` - エラーになった GraphQL 操作の数。これには、GraphQL 実行エラーのほか、Studio がサーバーへの接続に失敗した場合の HTTP エラーが含まれます。
- `apollo.operations.cache_hit_count` - Apollo Server のクエリキャッシュ全体から結果が提供された GraphQL クエリの数。
- GraphQL 操作の応答時間のヒストグラム (ミリ秒単位)。Studio の集計方法 (対数ビニング) のため、以下の値の精度は 5% 以内です。

  - `apollo.operations.latency.min`
  - `apollo.operations.latency.median`
  - `apollo.operations.latency.95percentile`
  - `apollo.operations.latency.99percentile`
  - `apollo.operations.latency.max`
  - `apollo.operations.latency.avg`

これらのメトリクスは 60 秒間隔で集計され、GraphQL 操作名に `operation:<query-name>` というタグが付けられます。同じ操作名を持つ一意のクエリシグネチャはマージされ、操作名のないクエリは無視されます。

これらのメトリクスは関連する Studio のグラフ ID (`graph:<graph-id>`) および関連するバリアント名 (`variant:<variant-name>`) の双方にタグ付けされるため、Studio の複数のグラフから同じ Datadog アカウントにデータを送信できます。バリアント名を設定していない場合、`current` が使用されます。

(2020 年 10 月より前に設定されたインテグレーションでは、メトリクス名が `apollo.operations` ではなく `apollo.engine.operations` で始まり、`graph` ではなく `service` タグが使用されます。Apollo Studio のグラフのインテグレーションページで新しいメトリクス名に移行できます。)

## 計画と使用

### ブラウザトラブルシューティング

Apollo Datadog インテグレーションは、Studio に Datadog API キーとリージョンを提供するだけで簡単にセットアップできます。それ以上の構成は必要ありません。

1. [Datadog インテグレーションページ][2]に移動し、Apollo タイルをクリックします。その後、**Configuration** タブの一番下にある **Install Integration** をクリックします。

2. [Datadog API ページ][3]に移動して、API キーを作成します。

3. ブラウザのアドレスバーで Datadog の API リージョンを確認します。
- ドメイン名が `app.datadoghq.com` の場合、API リージョンは `US` となります。
- ドメイン名が `app.datadoghq.eu` の場合、API リージョンは `EU` となります。

4. [Studio][4] で、グラフのインテグレーションページを開きます。

   ![IntegrationsPage][5]

5. Datadog Forwarding セクションで **Configure** を開き、API キーとリージョンを入力して **Enable** をクリックします。転送されるすべてのメトリクスは対応するグラフ ID (`graph:<graph-id>`) でタグ付けされるため、すべてのグラフに対して同じ API キーを使用できます。

   ![IntegrationsToggle][6]

6. Datadog  メトリクスエクスプローラーにアクセスし、メトリクスを確認します。メトリクスは、表示されるまでに最大 5 分かかる場合があります。

### API

詳細な使用方法については、[Apollo インテグレーションのドキュメント][7]を参照してください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "apollo" >}}


### ヘルプ

現時点で、Apollo インテグレーションには、イベントは含まれません。

### ヘルプ

現時点で、Apollo インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/metrics.png
[2]: https://app.datadoghq.com/account/settings#integrations
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://www.apollographql.com/docs/studio/org/graphs/#viewing-graph-information
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-link.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-toggle.png
[7]: https://www.apollographql.com/docs/studio/datadog-integration/
[8]: https://github.com/DataDog/integrations-extras/blob/master/apollo/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/