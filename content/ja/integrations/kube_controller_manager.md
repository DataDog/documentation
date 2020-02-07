---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - オーケストレーション
  - コンテナ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/README.md'
display_name: Kubernetes Controller Manager
git_integration_title: kube_controller_manager
guid: 34156dda-9288-4968-962b-6b29e1753d33
integration_id: kube-controller-manager
integration_title: Kubernetes Controller Manager
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_controller_manager.
metric_to_check: kube_controller_manager.threads
name: kube_controller_manager
public_title: Datadog-Kubernetes Controller Manager インテグレーション
short_description: Kubernetes Controller Manager の監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Kubernetes Control Plane の一部である [Kubernetes Controller Manager][1] を監視します。

## セットアップ

### インストール

Kube_controller_manager チェックは [Datadog Agent][2] パッケージに含まれているため、
サーバーに追加でインストールする必要はありません。

### コンフィグレーション

このインテグレーションは、コントローラーマネージャーのメトリクスエンドポイントにアクセスする必要があります。通常、これは 
Container-as-a-Service クラスターでは公開されません。

1. kube_controller_manager パフォーマンスデータの収集を開始するには、Agent の構成ディレクトリの
   ルートにある `conf.d/` フォルダーの `kube_controller_manager.d/conf.yaml` ファイルを編集します。
   使用可能なすべての構成オプションの詳細については、[サンプル kube_controller_manager.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `kube_controller_manager` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_controller_manager" >}}


### サービスのチェック

`kube_controller_manager.prometheus.health`:

Agent がメトリクスのエンドポイントに到達できない場合は、CRITICAL を返します。


### イベント

Kube_controller_manager には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager
[2]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/metadata.csv
[6]: https://docs.datadoghq.com/ja/help