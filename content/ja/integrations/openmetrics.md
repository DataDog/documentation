---
app_id: openmetrics
app_uuid: 302b841e-8270-4ecd-948e-f16317a316bc
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
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
integration_version: 4.0.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: openmetrics
oauth: {}
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



## 概要

任意の OpenMetrics または Prometheus エンドポイントからカスタムメトリクスを抽出します。

<div class="alert alert-warning">All the metrics retrieved by this integration are considered <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">custom metrics</a>.</div>

このインテグレーションは、[Prometheus エクスポジション形式][1]と [OpenMetrics 仕様標準][2]の両方に対応しています。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

OpenMetrics チェックは、[Datadog Agent のバージョン 6.6.0 以降][4]にパッケージ化されています。

### コンフィギュレーション

[Agent の構成ディレクトリ][5]のルートにある `openmetrics.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル openmetrics.d/conf.yaml][6] を参照してください。

それぞれのインスタンスには、以下のパラメーターが必要です。

| パラメーター        | 説明                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `openmetrics_endpoint` | Prometheus または OpenMetrics の形式でアプリケーションメトリクスが公開される URL (一意でなければなりません)。                                                                                                                         |
| `namespace`      | すべてのメトリクスの先頭に追加するネームスペース。                                                                                                                                                                                                                                 |
| `metrics`        | カスタムメトリクスとして取得するメトリクスのリスト。各メトリクスを `metric_name` または `metric_name: renamed` としてリストに追加して、名前を変更します。メトリクスは正規表現として解釈されます。一致するすべてのメトリクスを取得するには、ワイルドカードとして `".*"` (`metric.*`) を使用します。**注**: 正規表現は、多くのカスタムメトリクスを送信する可能性があります。 |

**注**: これは Datadog Agent バージョン 7.32.0 時点の新しいデフォルトの OpenMetrics チェックの例です。以前にこのインテグレーションを実装したことがある場合は、[レガシーの例][7]を参照してください。

**注**: Datadog Agent v7.32.0 から、[OpenMetrics 仕様標準][2]に準拠し、`_total` で終わるカウンター名は、サフィックス `_total` を除いて指定する必要があります。例えば、`promhttp_metric_handler_requests_total` を収集するには、メトリクス名 `promhttp_metric_handler_requests` を指定します。これにより、メトリクス名に `.count` を付加した `promhttp_metric_handler_requests.count` が Datadog に送信されます。

**注**: このチェックは、1 インスタンスあたり 2000 メトリクスの制限があります。返されたメトリクスの数は、Datadog Agent の [status コマンド][8]を実行した際に表示されます。構成を編集することで、関心のあるメトリクスを指定することができます。収集するメトリクスのカスタマイズ方法については、[Prometheus および OpenMetrics メトリクスの収集][9]で詳しく説明しています。より多くのメトリクスを監視する必要がある場合は、[Datadog サポート][10]にお問い合わせください。

その他のコンフィギュレーションについては、[Prometheus および OpenMetrics メトリクスの収集][9]を参照してください。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `openmetrics` を探します。

## 収集データ

### メトリクス

OpenMetrics チェックによって収集されたメトリクスはすべて、カスタムメトリクスとして Datadog に転送されます。

### イベント

OpenMetrics チェックには、イベントは含まれません。

### サービスのチェック

OpenMetrics チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

### 高いカスタムメトリクスの課金

OpenMetrics の構成において、`metrics` オプションに一般的なワイルドカード値を使用すると、カスタムメトリクスの課金に大きな影響を及ぼします。

Datadog では、より正確な収集のために、特定のメトリクス名またはメトリクス名の部分一致を使用することを推奨しています。

### Agent 7.46 以上での OpenMetrics ペイロードのパースエラー

Agent 7.46 以上にデフォルトで同梱されているこのインテグレーションのバージョン 3.0.0 から、デフォルトで `Accept` ヘッダーを `application/openmetrics-text;version=1.0.0,application/openmetrics-text;version=0.0.1;q=0.75,text/plain;version=0.0.4;q=0.5,*/*;q=0.1` に設定して送信します。以前のバージョンでは `Accept` ヘッダーを `text/plain` に設定していました。インテグレーションは、サーバーから受け取った `Content-type` に基づいて、使用するスクレーパーを動的に決定します。

この新しいバージョンで OpenMetrics のエンドポイントをスクレイピングしたときに、スクレイパーが以前より厳しくなってエラーが発生する場合は、[コンフィギュレーションファイル][11]の `headers` オプションを使って、インテグレーションが送信する `Accept` ヘッダーを手動で `text/plain` に設定してください。例:

```yaml
## ここで定義されたすべてのオプションは、すべてのインスタンスで利用可能です。
#
init_config:
  ...
instances:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
  ...
    headers:
      - Accept: text/plain
```

この構成では、エンドポイントは `Content-type` を `text/plain` に設定して返し、インテグレーションは以前のスクレーパーを使用します。

OpenMetrics インテグレーションは、監視しているシステムが `Content-type` ヘッダーにマッチしないデータを送信すると、ペイロードのパースでエラーを報告します。インテグレーションが `text/plain` コンテンツを受け付けるように設定することで、短期的にはこの問題に対処できます。

問題の根本原因を解決するには、アップストリームシステムの保守者に連絡してください。バグレポートを送信し、ペイロードとヘッダーに設定された Content-type が一致するようにシステムを修正するよう依頼してください。

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

- [OpenMetrics チェックの構成][12]
- [カスタム OpenMetrics チェックの書き方][13]

[1]: https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#suffixes
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/?tab=docker#configuration
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[7]: https://github.com/DataDog/integrations-core/blob/7.30.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L537-L546
[12]: https://docs.datadoghq.com/ja/agent/openmetrics/
[13]: https://docs.datadoghq.com/ja/developers/openmetrics/