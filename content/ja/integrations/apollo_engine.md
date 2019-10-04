---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - api
  - モニター
  - キャッシュ
creates_events: false
ddtype: クローラー
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/apollo_engine/README.md'
display_name: Apollo Engine
git_integration_title: apollo_engine
guid: a0b142ff-0637-4c2f-814c-0f1a012bc65c
integration_id: apollo
integration_title: Apollo Engine
is_public: true
kind: integration
maintainer: martijnwalraven@apollographql.com
manifest_version: 1.0.0
metric_prefix: apollo.engine.
metric_to_check: apollo.engine.operations.count
name: apollo_engine
public_title: Datadog-Apollo Engine インテグレーション
short_description: GraphQL インフラストラクチャーのパフォーマンスを監視
support: contrib
supported_os:
  - linux
---
## 概要

Apollo Engine は、GraphQL インフラストラクチャーのパフォーマンスを監視します。Datadog で他の部分の監視が既にセットアップされている場合は、このインテグレーションを使用して、Apollo Engine によって収集されたメトリクスを簡単に転送できます。

![メトリクス][1]

以下の Datadog メトリクスが提供されます。

* `apollo.engine.operations.count` - 実行された GraphQL 操作の数。これには、クエリ、ミューテーション、エラーになった操作が含まれます。
* `apollo.engine.operations.error_count` - エラーになった GraphQL 操作の数。これには、GraphQL 実行エラーのほか、Engine がサーバーへの接続に失敗した場合の HTTP エラーが含まれます。
* `apollo.engine.operations.cache_hit_count` - Apollo Engine のクエリキャッシュ全体から結果が提供された GraphQL クエリの数。
* GraphQL 操作の応答時間のヒストグラム (ミリ秒単位)。Engine の集計方法 (対数ビニング) のため、以下の値の精度は 5% 以内です。
  * `apollo.engine.operations.latency.min`
  * `apollo.engine.operations.latency.median`
  * `apollo.engine.operations.latency.95percentile`
  * `apollo.engine.operations.latency.99percentile`
  * `apollo.engine.operations.latency.max`
  * `apollo.engine.operations.latency.avg`

Engine のすべての Datadog メトリクスには、`operation:<query-name>` のように、GraphQL 操作名がタグ付けられます。同じ操作名を持つ一意のクエリシグニチャはマージされ、操作名を持たないクエリは無視されます。すべてのメトリクスには、Engine サービス ID `service:<service-id>` もタグ付けされるため、複数の Apollo Engine サービスが同じ Datadog アカウントにデータを送信できます。

Engine は、Datadog にメトリクスを 60 秒間隔で送信します。一時的にネットワーク障害が発生した場合でも、Engine のプロキシからレポートを収集できるように、データは 60 秒遅れて転送されます。
Datadog メトリクスは、プロキシの複数のインスタンスから取得した統計をマージするため、ホストごとのメトリクスは取得できません。Apollo Engine と同様に、クエリバッチ内の各操作が個別にカウントされます。

## セットアップ

### コンフィグレーション

Engine の Datadog インテグレーションは、Engine に Datadog API キーを提供するだけで簡単にセットアップできます。それ以上の構成は必要ありません。

1. Datadog API キーをコピーします。

    <span class="hidden-api-key">${api_key}</span>

2. Datadog メトリクスを有効にする [Apollo Engine サービス][2]に移動します。そのサービスの設定ページに移動します。

    ![設定][3]

    ![設定リンク][4]

3. ページの下部に Integrations セクションがあります。Datadog インテグレーションをオンに切り替えます。

    ![設定][5]

4. API キーを貼り付け、**Done** を押します。すべてのメトリクスにはサービス ID (`service:<service-id>`) がタグ付けされるため、すべての Apollo Engine サービスで同じ API キーを使用できます。

5. Datadog メトリクスエクスプローラーに移動し、メトリクスが表示されることを確認します。メトリクスが表示されるまで、最大 5 分お待ちください。

### 使用方法

詳細な使用方法については、[Apollo Engine のドキュメント][6]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "apollo_engine" >}}


### イベント

現時点で、Apollo Engine インテグレーションには、イベントは含まれません。

### サービスのチェック

現時点で、Apollo Engine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

インフラストラクチャーの監視の詳細および Datadog の全インテグレーションについては、[ブログ記事][9]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo_engine/images/metrics.png
[2]: https://engine.apollographql.com
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo_engine/images/settings-toggle.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo_engine/images/settings-link.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo_engine/images/settings-toggle.png
[6]: https://www.apollographql.com/docs/engine/datadog.html
[7]: https://github.com/DataDog/integrations-extras/blob/master/apollo_engine/metadata.csv
[8]: https://docs.datadoghq.com/ja/help
[9]: https://www.datadoghq.com/blog


{{< get-dependencies >}}