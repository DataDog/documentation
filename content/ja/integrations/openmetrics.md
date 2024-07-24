---
app_id: openmetrics
app_uuid: 302b841e-8270-4ecd-948e-f16317a316bc
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10045
    source_type_name: OpenMetrics
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openmetrics/README.md
display_on_public_website: true
draft: false
git_integration_title: openmetrics
integration_id: openmetrics
integration_title: OpenMetrics
integration_version: 4.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: openmetrics
public_title: OpenMetrics
short_description: OpenMetrics はメトリクスデータを公開するためのオープンな標準
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Supported OS::macOS
  configuration: README.md#Setup
  description: OpenMetrics はメトリクスデータを公開するためのオープンな標準
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenMetrics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

任意の OpenMetrics または Prometheus エンドポイントからカスタムメトリクスを抽出します。

<div class="alert alert-warning">All the metrics retrieved by this integration are considered <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">custom metrics</a>.</div>

このインテグレーションは、[Prometheus エクスポジション形式][1]と [OpenMetrics 仕様標準][2]の両方に対応しています。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

このインテグレーションには、最新モード (ターゲットエンドポイントを指すように `openmetrics_endpoint` を設定することで有効) とレガシーモード (代わりに `prometheus_url` を設定することで有効) があります。すべての最新機能を利用するために、Datadog は最新モードを有効にすることを推奨します。詳しくは、[OpenMetrics ベースのインテグレーションにおける最新バージョニングとレガシーバージョニング][4]を参照してください。

### インフラストラクチャーリスト

OpenMetrics チェックは、[Datadog Agent v6.6.0 以降][5]にパッケージ化されています。

### ブラウザトラブルシューティング

[Agent の構成ディレクトリ][6]の root にある `conf.d/openmetrics.d/conf.yaml` ファイルを編集します。利用可能なすべての構成オプションについては、[サンプル openmetrics.d/conf.yaml][7] を参照してください。これは、Datadog Agent バージョン 7.32.0 の時点での最新の OpenMetrics チェックの例です。以前にこのインテグレーションを実装していた場合は、[レガシー例][8]を参照してください。

それぞれのインスタンスには、以下のパラメーターが必要です。

| パラメーター        | 説明                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `openmetrics_endpoint` | Prometheus または OpenMetrics の形式でアプリケーションメトリクスが公開される URL (一意でなければなりません)。                                                                                                                         |
| `namespace`      | すべてのメトリクスの先頭に追加するネームスペース。                                                                                                                                                                                                                                 |
| `metrics`        | カスタムメトリクスとして取得するメトリクスのリスト。各メトリクスを `metric_name` または `metric_name: renamed` としてリストに追加して、名前を変更します。メトリクスは正規表現として解釈されます。一致するすべてのメトリクスを取得するには、ワイルドカードとして `".*"` (`metric.*`) を使用します。**注**: 正規表現は、多くのカスタムメトリクスを送信する可能性があります。 |

Datadog Agent v7.32.0 以降では、[OpenMetrics 仕様標準][2]に従って、`_total` で終わるカウンター名からは `_total` サフィックスを省略して指定する必要があります。例えば、`promhttp_metric_handler_requests_total` を収集するには、メトリクス名 `promhttp_metric_handler_requests` を指定します。これにより、メトリクス名に `.count` を付加した `promhttp_metric_handler_requests.count` が Datadog に送信されます。

このチェックは、1 インスタンスあたり 2000 メトリクスの制限があります。返されたメトリクスの数は、Datadog Agent の [status コマンド][9]を実行した際に表示されます。構成を編集することで、関心のあるメトリクスを指定することができます。収集するメトリクスのカスタマイズ方法については、[Prometheus および OpenMetrics メトリクスの収集][10]をご覧ください。

制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][11]までお問い合わせください。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `openmetrics` を探します。

## リアルユーザーモニタリング

### データセキュリティ

OpenMetrics チェックによって収集されたメトリクスはすべて、カスタムメトリクスとして Datadog に転送されます。

### ヘルプ

OpenMetrics チェックには、イベントは含まれません。

### ヘルプ

OpenMetrics チェックには、サービスのチェック機能は含まれません。

## ヘルプ

### 高いカスタムメトリクスの課金

OpenMetrics の構成において、`metrics` オプションに一般的なワイルドカード値を使用すると、カスタムメトリクスの課金に大きな影響を及ぼします。

Datadog では、より正確な収集のために、特定のメトリクス名またはメトリクス名の部分一致を使用することを推奨しています。

### 型のないメトリクスの欠落

デフォルトでは、インテグレーションは、Prometheus エクスポジション上で型のないメトリクスをスキップします。型のないメトリクスを収集したい場合は、例えば `metrics` マッピングで明示的に型を指定する必要があります。例:

```yaml
  metrics:
    - "<NAME_OF_METRIC_WITHOUT_TYPE>":
        "type": "gauge"
```

メトリクス名は正規表現として指定できるため、すべてのメトリクスを個別に列挙することなく、一連のメトリクスのタイプを指定することができます。

### Agent 7.46 での OpenMetrics ペイロードのパースエラー

Agent のバージョン 7.46 で出荷されたこのインテグレーションのバージョンでは、メトリクスエンドポイントからメトリクスをリクエストする際、デフォルトで OpenMetrics 形式が優先されます。これは、`Accept` ヘッダを `application/openmetrics-text;version=1.0.0,application/openmetrics-text;version=0.0.1;q=0.75,text/plain;version=0.0.4;q=0.5,*/*;q=0.1` に設定することで行います。これは、サーバーから受け取った `Content-Type` に基づいて、どのスクレーパーを使用するかを動的に決定することと組み合わせて、手動で設定する必要性を減らすために行われました。

以前のバージョンのデフォルトは `text/plain` で、通常、サーバーは Prometheus エクスポジション形式でメトリクスを返します。つまり、このバージョンのインテグレーションに更新すると、Prometheus 形式から OpenMetrics 形式に切り替わる可能性があります。

ほとんどの場合動作に変わりはありませんが、一部のアプリケーションでは `Content-Type` を設定して OpenMetrics 標準形式を使用することを示しているにも関わらず、完全には OpenMetrics に準拠していない形式のメトリクスを返すことがあります。このため、メトリクスのペイロードをパースする際に、インテグレーションがエラーを報告することがあります。

この新しいバージョンで OpenMetrics エンドポイントをスクレイピングしたときにパースエラーが表示される場合は、[コンフィギュレーションファイル][12]の `headers` オプションを使用して、インテグレーションが送信する `Accept` ヘッダーを手動で `text/plain` に設定することで、より厳密でない Prometheus 形式を強制的に使用することができます。例:

```yaml
## ここで定義されたすべてのオプションは、すべてのインスタンスで利用可能です。
#
init_config:
  ...
instances:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
    ...
    headers:
      Accept: text/plain
```

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

- [OpenMetrics チェックの構成][13]
- [カスタム OpenMetrics チェックの書き方][14]

[1]: https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#suffixes
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ja/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/?tab=docker#configuration
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://github.com/DataDog/integrations-core/blob/7.30.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L537-L546
[13]: https://docs.datadoghq.com/ja/agent/openmetrics/
[14]: https://docs.datadoghq.com/ja/developers/openmetrics/