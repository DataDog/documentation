---
app_id: kube-controller-manager
app_uuid: 25d4ccd6-de50-4ef0-849f-b7ab1aea203e
assets:
  dashboards:
    kube_controller_manager: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_controller_manager.threads
      metadata_path: metadata.csv
      prefix: kube_controller_manager.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10055
    source_type_name: Kubernetes Controller Manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- kubernetes
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_controller_manager
integration_id: kube-controller-manager
integration_title: Kubernetes Controller Manager
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: kube_controller_manager
public_title: Kubernetes Controller Manager
short_description: Kubernetes Controller Manager の監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Kubernetes Controller Manager の監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes Controller Manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kube Controller Manager ダッシュボード][1]

## 概要

このチェックは、Kubernetes Control Plane の一部である [Kubernetes Controller Manager][2] を監視します。

**注**: サービスが公開されていないため、このチェックは Amazon EKS クラスターのデータを収集しません。

## 計画と使用

### インフラストラクチャーリスト

Kubernetes Controller Manager チェックは [Datadog Agent][3] パッケージに含まれているため、
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. kube_controller_manager のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `kube_controller_manager.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル kube_controller_manager.d/conf.yam][4] を参照してください。

2. [Agent を再起動します][5]。

このインテグレーションは、コントローラーマネージャーのメトリクスエンドポイントにアクセスする必要があります。メトリクスエンドポイントにアクセスできるようにするには、以下が必要です。

* controller-manager プロセスの IP/Port にアクセスできる
* `get` RBAC 権限で /metrics エンドポイントにアクセスできる (デフォルトの Datadog Helm チャートでは、すでに適切な RBAC ロールとバインディングが追加されています)

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `kube_controller_manager` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "kube_controller_manager" >}}


### ヘルプ

Kubernetes Controller Manager チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "kube_controller_manager" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_controller_manager/images/screenshot.png
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/