---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    kube_controller_manager: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- オーケストレーション
- コンテナ
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/README.md
display_name: Kubernetes Controller Manager
draft: false
git_integration_title: kube_controller_manager
guid: 34156dda-9288-4968-962b-6b29e1753d33
integration_id: kube-controller-manager
integration_title: Kubernetes Controller Manager
integration_version: 4.2.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_controller_manager.
metric_to_check: kube_controller_manager.threads
name: kube_controller_manager
public_title: Kubernetes Controller Manager インテグレーション
short_description: Kubernetes Controller Manager の監視
support: コア
supported_os:
- linux
- mac_os
- windows
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