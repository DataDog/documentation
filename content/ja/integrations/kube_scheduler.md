---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    kube_scheduler: assets/dashboards/overview.json
  logs:
    source: kube_scheduler
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- オーケストレーション
- コンテナ
- ログの収集
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/README.md
display_name: Kube_scheduler
draft: false
git_integration_title: kube_scheduler
guid: ec7c029f-86c2-4202-9368-1904998a646c
integration_id: kube-scheduler
integration_title: Kubernetes Scheduler
integration_version: 4.3.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_scheduler.
metric_to_check: kube_scheduler.threads
name: kube_scheduler
public_title: Kubernetes Scheduler インテグレーション
short_description: Kubernetes Scheduler の監視
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Kubernetes Control Plane の一部である [Kubernetes Scheduler][1] を監視します。

**注**: サービスが公開されていないため、このチェックは Amazon EKS クラスターのデータを収集しません。

## セットアップ

### インストール

Kubernetes Scheduler チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照して、次のパラメーターを適用してください。

#### メトリクスの収集

1. kube_scheduler のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `kube_scheduler.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル kube_scheduler.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

#### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][6]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "kube_scheduler", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `kube_scheduler` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_scheduler" >}}


### イベント

Kube Scheduler には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "kube_scheduler" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/