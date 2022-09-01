---
app_id: kube-controller-manager
app_uuid: 25d4ccd6-de50-4ef0-849f-b7ab1aea203e
assets:
  dashboards:
    kube_controller_manager: assets/dashboards/overview.json
  integration:
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
    source_type_name: Kubernetes Controller Manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- オーケストレーション
- コンテナ
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_controller_manager
integration_id: kube-controller-manager
integration_title: Kubernetes Controller Manager
integration_version: 4.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: kube_controller_manager
oauth: {}
public_title: Kubernetes Controller Manager
short_description: Kubernetes Controller Manager の監視
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
  configuration: README.md#Setup
  description: Kubernetes Controller Manager の監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes Controller Manager
---



## 概要

このチェックは、Kubernetes Control Plane の一部である [Kubernetes Controller Manager][1] を監視します。

**注**: サービスが公開されていないため、このチェックは Amazon EKS クラスターのデータを収集しません。

## セットアップ

### インストール

Kubernetes Controller Manager チェックは [Datadog Agent][2] パッケージに含まれているため、
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

このインテグレーションは、コントローラーマネージャーのメトリクスエンドポイントにアクセスする必要があります。通常、これは 
サービスとしてのコンテナ クラスターでは公開されません。

1. kube_controller_manager のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `kube_controller_manager.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル kube_controller_manager.d/conf.yam][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `kube_controller_manager` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_controller_manager" >}}


### イベント

Kubernetes Controller Manager チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "kube_controller_manager" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/