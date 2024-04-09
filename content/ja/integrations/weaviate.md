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
    node_status: assets/monitors/node_status.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ai/ml
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/weaviate/README.md
display_on_public_website: true
draft: false
git_integration_title: weaviate
integration_id: weaviate
integration_title: Weaviate
integration_version: 2.3.1
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: weaviate
public_title: Weaviate
short_description: Weaviate
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Weaviate
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Weaviate
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックでは、Datadog Agent を通じて [Weaviate][1] を監視します。詳細については、[Weaviate モニタリング][2]を参照してください。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

Agent リリース 7.47.0 から、Weaviate チェックは [Datadog Agent][4] パッケージに含まれています。

**注**: この機能を使用するには、Agent v7.47.0 以上が必要です。

### ブラウザトラブルシューティング

Weaviate は、Prometheus 形式のメトリクスを公開するように構成できます。Datadog Agent は、以下に説明するインテグレーションを使用して、これらのメトリクスを収集することができます。指示に従って、Weaviate インスタンスのデータ収集を構成してください。Prometheus メトリクスを公開するために必要な構成については、Weaviate ドキュメントの [Monitoring][2] ページを参照してください。

さらに、各種 [API エンドポイント][5]と通信することで、メトリクスの小さなサブセットを収集できます。具体的には
- `/v1/meta`: バージョン情報
- `/v1/nodes`: オブジェクトやシャードなどのノード固有のメトリクス
- `/v1/.well-known/live`: HTTP レスポンスタイムとサービスの有効性

**注**: このチェックでは、メトリクスの収集に [OpenMetrics][6] を使用しており、Python 3 が必要です。

#### コンテナ化
##### メトリクスの収集

Weaviate クラスターで Prometheus 形式のメトリクスが公開されていることを確認してください。Weaviate ドキュメントの [Monitoring][2] ページの指示に従って構成およびカスタマイズできます。Agent がメトリクスの収集を開始するには、Weaviate ポッドにアノテーションを付ける必要があります。アノテーションの詳細については、[オートディスカバリーインテグレーションテンプレート][3]を参照してください。その他の構成オプションについては、[サンプル weaviate.d/conf.yaml][7] を参照してください。

**注**: リストされたメトリクスは、利用可能な場合にのみ収集できます。一部のメトリクスは、特定のアクションが実行されたときにのみ生成されます。例えば、オブジェクト削除メトリクスは、オブジェクトが削除されたときにのみ公開されます。

Weaviate チェックの構成で最も重要なパラメーターは以下の 2 つです。
- `openmetrics_endpoint`: このパラメーターは、Prometheus 形式のメトリクスが公開される場所に設定する必要があります。デフォルトのポートは `2112` ですが、`PROMETHEUS_MONITORING_PORT` [環境変数][2]を使用して構成することができます。コンテナ環境では、`%%host%%` を[ホストの自動検出][3]に使用します。
- `weaviate_api_endpoint`: このパラメーターはオプションです。デフォルトでは、このパラメーターは `<hostname>:8080` に設定され、[RESTful API][5] の構成を指定します。

RESTful API エンドポイントに認証が必要な場合、[リクエストヘッダー][8]の一部として API キーを提供するようにチェックを構成できます。


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

**注**: アノテーションは `annotations` キーを使用して、[Weaviate Helm チャート][9]に直接設定することができます。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `weaviate` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "weaviate" >}}


### ヘルプ

Weaviate インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "weaviate" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[1]: https://weaviate.io/developers/weaviate
[2]: https://weaviate.io/developers/weaviate/configuration/monitoring
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://weaviate.io/developers/weaviate/api/rest
[6]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[7]: https://github.com/DataDog/integrations-core/blob/master/weaviate/datadog_checks/weaviate/data/conf.yaml.example
[8]: https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L544-L546
[9]: https://github.com/weaviate/weaviate-helm/blob/576f613bad3f8e25015c61a7143800123ab378d3/weaviate/values.yaml#L1196
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/weaviate/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/weaviate/assets/service_checks.json
[13]: https://docs.datadoghq.com/ja/help/