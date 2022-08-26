---
app_id: kube-scheduler
app_uuid: 1cf58691-ac6b-4f1d-b410-0132a4590378
assets:
  dashboards:
    kube_scheduler: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_scheduler.threads
      metadata_path: metadata.csv
      prefix: kube_scheduler.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Kube_scheduler
  logs:
    source: kube_scheduler
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- オーケストレーション
- コンテナ
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_scheduler
integration_id: kube-scheduler
integration_title: Kubernetes Scheduler
integration_version: 4.4.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: kube_scheduler
oauth: {}
public_title: Kubernetes Scheduler
short_description: Kubernetes Scheduler の監視
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Orchestration
  - Category::Containers
  - Category::Log Collection
  configuration: README.md#Setup
  description: Kubernetes Scheduler の監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes Scheduler
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