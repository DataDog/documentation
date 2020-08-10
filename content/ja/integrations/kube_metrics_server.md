---
assets:
  dashboards:
    Kubernetes Metrics Server - Overview: assets/dashboards/overview.json
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - コンテナ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/README.md'
display_name: Kube メトリクスサーバー
git_integration_title: kube_metrics_server
guid: 7a477937-4db8-4277-bd58-9e56ac064185
integration_id: kube-metrics-server
integration_title: Kubernetes Metrics Server
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_metrics_server.
metric_to_check: kube_metrics_server.process.open_fds
name: kube_metrics_server
public_title: Datadog-Kubernetes Metrics Server インテグレーション
short_description: Kubernetes Metrics Server の監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Kubernetes Control Plane によって使用されるコンポーネントである [Kube_metrics_server][1] v0.3.0+ を監視します。

## セットアップ

### インストール

Kube_metrics_server チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

1. kube_metrics_server のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `kube_metrics_server.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル kube_metrics_server.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

#### コンテナ化

コンテナ環境の場合は、[Kubernetes におけるオートディスカバリーのインテグレーションテンプレート][4]ガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                |
| -------------------- | ---------------------------------------------------- |
| `<インテグレーション名>` | `kube_metrics_server `                                         |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                        |
| `<インスタンスコンフィギュレーション>`  | `{"prometheus_url": "https://%%host%%:443/metrics"}` |

#### SSL

エンドポイントが保護されている場合、追加の構成が必要です。

1. メトリクスエンドポイントの保護に使用される証明書を特定します。

2. 関連する証明書ファイルを Agent ポッドにマウントします。

3. SSL 構成を適用します。詳細については、[デフォルトの構成ファイル][5]を参照してください。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `kube_metrics_server` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_metrics_server" >}}


### サービスのチェック

`kube_metrics_server.prometheus.health`:

Agent がメトリクスのエンドポイントに到達できない場合は、CRITICAL を返します。

### イベント

kube_metrics_server には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://github.com/kubernetes-incubator/metrics-server
[2]: https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/datadog_checks/kube_metrics_server/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[5]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/