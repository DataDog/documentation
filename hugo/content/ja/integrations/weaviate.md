---
app_id: weaviate
app_uuid: 3bb2d803-0608-4da3-8987-e6f7feb4e481
assets:
  dashboards:
    Weaviate Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: weaviate.go.goroutines
      metadata_path: metadata.csv
      prefix: weaviate.
    process_signatures:
    - weaviate
    - /bin/weaviate
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10371
    source_type_name: Weaviate
  monitors:
    Weaviate Node in unhealthy state: assets/monitors/node_status.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ai/ml
- data stores
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/weaviate/README.md
display_on_public_website: true
draft: false
git_integration_title: weaviate
integration_id: weaviate
integration_title: Weaviate
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: weaviate
public_title: Weaviate
short_description: AI 駆動のアプリケーションを構築するためのオープン ソースのベクター データベース。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Data Stores
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: AI 駆動のアプリケーションを構築するためのオープン ソースのベクター データベース。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/ai-integrations/
  support: README.md#Support
  title: Weaviate
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Weaviate Overview ダッシュボード][1]

## 概要

Weaviate は、オープン ソースで AI ネイティブなベクター データベースであり、AI 駆動のアプリケーションの作成を支援します。Datadog の Weaviate インテグレーションにより、次のことが可能です:

- 挿入・削除・メンテナンスの各操作の所要時間などの使用状況の統計を監視し、潜在的なストレージの問題やボトルネックを特定し、データ変更がシステムの応答性に与える影響を評価します。
- クエリ レイテンシ、レート、同時の読み取り / 書き込みのリクエストを追跡し、ベクター データベースの全体的な応答性と負荷処理能力を把握します。
- "put" (書き込み) 操作に要する平均時間などのオブジェクトの統計情報を用いて、書き込みが多いワークロードを最適化します。
- データ ロード プロセスなどの操作に関する洞察を提供するインポート関連のメトリクスにより、データ取り込みを円滑かつ効率的に行います。 

このチェックは Datadog Agent を通じて [Weaviate][2] を監視します。詳細は [Weaviate の監視][3] を参照してください。Datadog の AI インテグレーション スイートの詳細については、こちらの [ブログ][4] を参照してください。

## セットアップ

ホスト上で実行されている Agent にこのチェックをインストールし構成するには、以下の手順に従ってください。コンテナ化された環境については、これらの手順の適用方法に関するガイダンスとして [Autodiscovery Integration Templates][5] を参照してください。

### インストール

Agent リリース 7.47.0 以降、Weaviate チェックは [Datadog Agent][3] パッケージに含まれています。

**注**: この機能を使用するには、Agent v7.47.0 以上が必要です。

### 構成

Weaviate は、Prometheus 形式のメトリクスを公開するように構成できます。Datadog Agent は、以下で説明するインテグレーションを使用して、これらのメトリクスを収集できます。Weaviate インスタンスのデータ収集を構成するには、手順に従ってください。Prometheus メトリクスを公開するために必要な構成については、Weaviate ドキュメントの [Monitoring ページ][6] を参照してください。

さらに、異なる [API エンドポイント][7] に通信することで、小規模なサブセットのメトリクスも収集できます。具体的には:
- `/v1/meta`: バージョン情報
- `/v1/nodes`: オブジェクトやシャードなどのノード固有のメトリクス
- `/v1/.well-known/live`: HTTP レスポンスタイムとサービスの有効性

**注**: このチェックはメトリクス収集に [OpenMetrics][8] を使用します。Python 3 が必要です。

#### コンテナ化
##### メトリクスの収集

Prometheus 形式のメトリクスが Weaviate クラスタで公開されていることを確認してください。これは、Weaviate ドキュメントの [Monitoring ページ][6] の手順に従って構成とカスタマイズができます。Agent がメトリクス収集を開始するには、Weaviate の Pod にアノテーションが必要です。アノテーションの詳細については、[Autodiscovery Integration Templates][5] を参照してください。追加の構成オプションは、[weaviate.d/conf.yaml のサンプル][9] を参照してください。

**注**: リストされたメトリクスは、利用可能な場合にのみ収集できます。一部のメトリクスは、特定のアクションが実行されたときにのみ生成されます。例えば、オブジェクト削除メトリクスは、オブジェクトが削除されたときにのみ公開されます。

Weaviate チェックの構成で最も重要なパラメーターは以下の 2 つです。
- `openmetrics_endpoint`: このパラメータは、Prometheus 形式のメトリクスが公開されている場所に設定してください。デフォルトのポートは `2112` ですが、`PROMETHEUS_MONITORING_PORT` [環境変数][6] を使用して設定できます。コンテナ化された環境では、[ホストの自動検出][5] のために `%%host%%` を使用する必要があります。
- `weaviate_api_endpoint`: このパラメータは任意です。デフォルトでは `<hostname>:8080` に設定され、[RESTful API][7] のエンドポイントを指定します。

RESTful API エンドポイントで認証が必要な場合は、[リクエスト ヘッダー][10] の一部として API キーを提供するようにチェックを構成できます。


```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/weaviate.checks: |
      {
        "weaviate": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:2112/metrics",
              "weaviate_api_endpoint": "http://%%host%%:8080",
              "headers": {'Authorization': 'Bearer if_needed_for_auth'}
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'weaviate'
# (...)
```

**注**: これらのアノテーションは、`annotations` キーを使って [Weaviate Helm chart][11] で直接設定できます。

### 検証

[Agent の status サブコマンドを実行][12] し、Checks セクションの `weaviate` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "weaviate" >}}


### イベント

Weaviate インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "weaviate" >}}


## トラブルシューティング

ご不明な点は [Datadog サポート][15]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [インテグレーション ラウンドアップ: AI スタックの監視][4]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/weaviate/images/weaviate_dashboard.png
[2]: https://weaviate.io/developers/weaviate
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.datadoghq.com/blog/ai-integrations/
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[6]: https://weaviate.io/developers/weaviate/configuration/monitoring
[7]: https://weaviate.io/developers/weaviate/api/rest
[8]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[9]: https://github.com/DataDog/integrations-core/blob/master/weaviate/datadog_checks/weaviate/data/conf.yaml.example
[10]: https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L544-L546
[11]: https://github.com/weaviate/weaviate-helm/blob/576f613bad3f8e25015c61a7143800123ab378d3/weaviate/values.yaml#L1196
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/weaviate/metadata.csv
[14]: https://github.com/DataDog/integrations-core/blob/master/weaviate/assets/service_checks.json
[15]: https://docs.datadoghq.com/ja/help/