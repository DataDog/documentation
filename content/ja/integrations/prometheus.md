---
app_id: prometheus
app_uuid: b978d452-7008-49d0-bb87-62d8639b2205
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Prometheus
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/prometheus/README.md
display_on_public_website: true
draft: false
git_integration_title: prometheus
integration_id: prometheus
integration_title: Prometheus (レガシー)
integration_version: 3.5.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: prometheus
public_title: Prometheus (レガシー)
short_description: Prometheus は時系列メトリクスデータ向けのオープンソース監視システムです
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
  description: Prometheus は時系列メトリクスデータ向けのオープンソース監視システムです
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Prometheus (レガシー)
---



## 概要

Prometheus に接続して:
- Prometheus エンドポイントからカスタムメトリクスを抽出します
- Datadog イベントストリームで Prometheus Alertmanager アラートを確認します

**注**: [OpenMetrics チェック][1]の方が効率性が高く Prometheus のテキスト形式を完全にサポートしているので、OpenMetrics チェックの使用をお勧めします。Prometheus チェックは、メトリクスのエンドポイントがテキスト形式をサポートしていない場合にのみ使用してください。

<div class="alert alert-warning">
このインテグレーションによって取得されたメトリクスはすべて、<a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">カスタムメトリクス</a>と見なされます。
</div>

**Prometheus チェックを構成する方法については、[Prometheus メトリクスの収集のガイド][2]を参照してください。**

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

Prometheus チェックは、[Datadog Agent][4] のバージョン 6.1.0 以降にパッケージ化されています。

### コンフィギュレーション

`prometheus.d/conf.yaml` ファイルを編集して、OpenMetrics/Prometheus エンドポイントを公開するアプリケーションからメトリクスを取得します。

各インスタンスは、少なくとも以下で構成されます。

| 設定          | 説明                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `prometheus_url` | メトリクスルートをポイントする URL (**注**: 一意である必要があります)                                                    |
| `namespace`      | このネームスペースがすべてのメトリクスの前に付加されます (メトリクス名の競合を避けるため)                                        |
| `metrics`        | カスタムメトリクスとして取得するメトリクスのリスト。`- <METRIC_NAME>` または `- <METRIC_NAME>: <RENAME_METRIC>` の形式 |

メトリクスをリストする際は、`- <METRIC_NAME>*` のようにワイルドカード `*` を使用して、一致するすべてのメトリクスを取得できます。**注:** 大量のカスタムメトリクスが送信される可能性があるため、ワイルドカードの使用には注意が必要です。

より高度な設定 (ssl、labels joining、custom tags など) が[サンプル prometheus.d/conf.yaml][5] に記載されています

このインテグレーションは性格上、極めて多くのカスタムメトリクスが Datadog に送信される可能性があります。ユーザーは、構成の誤りや入力の変化があった場合に送信されるメトリクスの最大数を制御できます。このチェックには 2000 メトリクスというデフォルトの制限があります。必要な場合は、`prometheus.d/conf.yaml` ファイルで `max_returned_metrics` オプションを設定することで、この制限を増やすことができます。

`send_monotonic_counter: True` の場合、Agent は、それらの値の差分を送信し、アプリ内タイプはカウントに設定されます (これはデフォルトの動作です)。`send_monotonic_counter: False` の場合、Agent は、単調増加する値をそのまま送信し、アプリ内タイプはゲージに設定されます。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `prometheus` を探します。

## 収集データ

### メトリクス

Prometheus チェックによって収集されたメトリクスはすべて、カスタムメトリクスとして Datadog に転送されます。

注: 指定された `<HISTOGRAM_METRIC_NAME>` Prometheus ヒストグラムのバケットデータは、バケットの名前を含む `upper_bound` タグを付けて Datadog 内の `<HISTOGRAM_METRIC_NAME>.count` メトリクスに格納されます。`+Inf` バケットにアクセスするには、`upper_bound:none` を使用します。

### イベント

Prometheus Alertmanager アラートは、Webhook コンフィギュレーションに従って、Datadog イベントストリームに自動的に送信されます。

### サービスのチェック

Prometheus チェックには、サービスのチェック機能は含まれません。

## Prometheus Alertmanager
Prometheus Alertmanager のアラートをイベントストリームで送信します。ネイティブでは、Alertmanager は構成された Webhook にすべてのアラートを同時に送信します。Datadog でアラートを見るには、Alertmanager のインスタンスがアラートを 1 つずつ送信するように構成する必要があります。`route` の下に group-by パラメーターを追加して、アラートルールの実際の名前でアラートをグループ化させることができます。

### セットアップ
1. Alertmanager コンフィギュレーションファイル `alertmanager.yml` を編集して、以下を含めます。
```
receivers:
- name: datadog
  webhook_configs: 
  - send_resolved: true
    url: https://app.datadoghq.com/intake/webhook/prometheus?api_key=<DATADOG_API_KEY>
route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 5m
  receiver: datadog
  repeat_interval: 3h
```

**注**: このエンドポイントは、一度にペイロード内の 1 つのイベントのみを受け入れます。

2. Prometheus および Alertmanager サービスを再起動します。
```
sudo systemctl restart prometheus.service alertmanager.service
```

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

- [Datadog Agent 6 用の Prometheus サポートの導入][8]
- [Prometheus チェックの構成][9]
- [カスタム Prometheus チェックの書き方][10]

[1]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[2]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus?tab=docker#configuration
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[9]: https://docs.datadoghq.com/ja/agent/prometheus/
[10]: https://docs.datadoghq.com/ja/developers/prometheus/