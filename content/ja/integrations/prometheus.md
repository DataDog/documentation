---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/prometheus/README.md'
display_name: Prometheus
git_integration_title: prometheus
guid: 58e75868-0933-407b-aaa5-469c252bdb2b
integration_id: prometheus
integration_title: Prometheus
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: prometheus
public_title: Datadog-Prometheus インテグレーション
short_description: Prometheus は時系列メトリクスに使用されるオープンソースの監視システム data
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

任意の Prometheus エンドポイントからカスタムメトリクスを抽出します。**注**: Prometheus テキスト形式を効率よくフルにサポートできるため、[OpenMetrics check][10] の使用をお勧めします。メトリクスエンドポイントがテキスト形式をサポートしない場合のみ、Prometheus チェックを使用してください。

<div class="alert alert-warning">
このインテグレーションによって取得されたメトリクスはすべて、<a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">カスタムメトリクス</a>と見なされます。
</div>

**Prometheus チェックを構成する方法については、[Prometheus メトリクスの収集のガイド][8]を参照してください。**

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][9]のガイドを参照してこの手順を行ってください。

### インストール

Prometheus チェックは、Agent のバージョン 6.1.0 以降にパッケージ化されています。

### コンフィグレーション

`prometheus.d/conf.yaml` ファイルを編集して、OpenMetrics/Prometheus エンドポイントを公開するアプリケーションからメトリクスを取得します。

各インスタンスは、少なくとも以下で構成されます。

| 設定          | 説明                                                                                                      |
|------------------|------------------------------------------------------------------------------------------------------------------|
| `prometheus_url` | メトリクスルートをポイントする URL (**注**: 一意である必要があります)                                                 |
| `namespace`      | このネームスペースがすべてのメトリクスの前に付加されます (メトリクス名の競合を避けるため)                                     |
| `metrics`        | カスタムメトリクスとして取得するメトリクスのリスト。`- <METRIC_NAME>` または `- <METRIC_NAME>: <RENAME_METRIC>` の形式 |

メトリクスをリストする際は、`- <METRIC_NAME>*` のようにワイルドカード `*` を使用して、一致するすべてのメトリクスを取得できます。**注:** 大量のカスタムメトリクスが送信される可能性があるため、ワイルドカードの使用には注意が必要です。

より高度な設定 (ssl、labels joining、custom tags など) が[サンプル prometheus.d/conf.yaml][2] に記載されています

このインテグレーションは性格上、極めて多くのカスタムメトリクスが Datadog に送信される可能性があります。構成の誤りや入力の変化があった場合に送信されるメトリクスの最大数をユーザーが制御できるように、このチェックには 2000 メトリクスというデフォルトの制限があります。必要な場合は、`prometheus.d/conf.yaml` ファイルで `max_returned_metrics` オプションを設定することで、この制限を増やすことができます。

`send_monotonic_counter: True` の場合、Agent は、それらの値の差分を送信し、アプリ内タイプはカウントに設定されます (これはデフォルトの動作です)。`send_monotonic_counter: False` の場合、Agent は、単調増加する値をそのまま送信し、アプリ内タイプはゲージに設定されます。

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `prometheus` を探します。

## 収集データ
### メトリクス

Prometheus チェックによって収集されたメトリクスはすべて、カスタムメトリクスとして Datadog に転送されます。

注: 指定された `<HISTOGRAM_METRIC_NAME>` Prometheus ヒストグラムのバケットデータは、バケットの名前を含む `upper_bound` タグを付けて Datadog 内の `<HISTOGRAM_METRIC_NAME>.count` メトリクスに格納されます。`+Inf` バケットにアクセスするには、`upper_bound:none` を使用します。

### イベント
Prometheus チェックには、イベントは含まれません。

### サービスのチェック

Prometheus チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

* [Datadog Agent 6 用の Prometheus サポートの導入][5]
* [Prometheus チェックの構成][6]
* [カスタム Prometheus チェックの書き方][7]

[2]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help
[5]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[6]: https://docs.datadoghq.com/ja/agent/prometheus
[7]: https://docs.datadoghq.com/ja/developers/prometheus
[8]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/
[9]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[10]: https://docs.datadoghq.com/ja/integrations/openmetrics


{{< get-dependencies >}}